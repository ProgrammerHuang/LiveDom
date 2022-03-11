import { TypeData } from "./LiveDom";


export interface PageOptions
{
    // container?: Element|string;
    data?: TypeData; //init data
    // directives?: MapObject<DirectiveOptions>;
    // debug?: boolean;
}

export class Page
{
    public updateData: (data: TypeData) => Promise<void>;
}

