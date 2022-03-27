import { DataPaths, TypeData } from "./DataManager";

export type TextFunction<R=any> = (data: TypeData) => R;

interface ParseTextResult
{
    // vars: string[];
    parts: (string|TextFunction)[];
    paths: DataPaths;
    exec(data: TypeData);
}

export class Parser
{
    public static parseText(text: string) : ParseTextResult
    {
        const expressionRegex = /\$\{\s*([a-zA-z_]\w*(\.\w+)*)\s*\}/g;
        // console.log("parseText:", text.length, text.match(expressionRegex));
        const parts: (string|TextFunction)[] = [];
        const paths: DataPaths = {};
        let match: RegExpExecArray = null;
        let lastIndex = 0;
        
        while(match = expressionRegex.exec(text))
        {
            if(lastIndex < match.index)
                parts.push(text.substring(lastIndex, match.index));
            
            // console.log("parseText result:", result, expressionRegex.lastIndex);
            const names = match[1].split(/\./g);
            paths[match[1]] = names;
            parts.push(buildTextFunction(names));
            
            lastIndex = expressionRegex.lastIndex;
        }
        
        if(lastIndex < text.length)
            parts.push(text.substring(lastIndex, text.length));
        // console.log("parseText lastIndex:", expressionRegex.lastIndex, parts);
        
        return {
            parts,
            paths,
            exec: buildParseResultRenderer(parts),
        }; 
    }

    public static hasTextExpress(result: ParseTextResult)
    {
        if(result.parts.length > 1)
            return true;
        
        return result.parts.length == 1 && typeof(result.parts[0]) != "string";
    }
}


// function getWatchVars(info: ParseTextExpressionInfo): string[]
// {
//     // return [info.var.replace(/\s*\.\s*/g, ".")];
//     return info.var.split(/\s*\.\s*/, 1).slice(0, 1);
// }

function buildTextFunction(names: string[]) : TextFunction
{
    let lastNamePath = "";
    let namesPath = names.map((name) =>
    {
        lastNamePath = lastNamePath + "." + name;
        return lastNamePath.substring(1);
    });
    
    // let body = "return data" + names.map(name => '["'+name+'"]').join("") + ";";
    let body = `var ${names[0]}=data.${names[0]}; `
            + `return (${namesPath.map(p => `${p}!==null&&${p}!==void 0`).join(" && ")}) ? ${names.join(".")} : null;`;
    
    // console.log("buildTextRenderer:", names, namesPath, body);
    return new Function("data", body) as TextFunction;
}

function buildParseResultRenderer(parts: (string|TextFunction)[])
{
    if(parts.length == 1 && typeof(parts[0]) == "function")
    {
        return parts[0];
    }
    
    if(parts.length == 1 && typeof(parts[0]) == "string")
    {
        const text = parts[0];
        return function() { return text; };
    }
    
    return function(data: TypeData)
    {
        const results: string[] = [];
        for(const p of parts)
        {
            if(typeof(p) == "string")
                results.push(p);
            else
                results.push(p(data));
        }
        
        // console.log("textNodeRenderer results:", results, data);
        return results.join("");
    };
}



