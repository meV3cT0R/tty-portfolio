import { createElement } from "react";
import { FakeHTML } from "../models/FakeHTML";
import {v4 } from "uuid";

export const fakeToJ = (obj : FakeHTML) : React.ReactElement=> {
    if(typeof obj == "string") return createElement("span",null,obj);
    return createElement(obj.tag, 
        {
            className:obj.className,
            key :v4()
        },
        obj.content,
        (obj.childrens ?? []).map((child : FakeHTML)=>fakeToJ(child))
    )
}