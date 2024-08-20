import useApp from "../context/useApp";
import {data} from "../data/data";
import { FakeHTML } from "../models/FakeHTML";
import { Structure } from "../models/Structure";
import { currLocation } from "./utils/currLocation";

const useOpen  = ()=> {
    const { location } = useApp();
    const func = (l:string[]=[]) : FakeHTML=> {
        if (l[0] == "--help" || l[0] =="-h") {
            return {
                tag: "div",
                childrens: [
                    {
                        tag : "p",
                        content: "URLs are displayed as underlined text",
                    },
                    {
                        tag : "p",
                        content: "Usage : open path/to/url",
                    },
                    {
                        tag : "p",
                        content: "Examples",
                    },
                    {
                        tag : "p",
                        content: "open about",
                    },
                    {
                        tag : "p",
                        content: "open skills/frontend/html/readme",
                    },
                ]
            }
        }
        if(l.length ==0){
            throw new Error("Something Horribly Went Wrong!!");
        }

        const fileName = l.pop();
        const curr: Structure[] = currLocation(data,[...location,...l]);
    
        const file = curr.find(dat=>dat.name.toLowerCase()==fileName?.toLowerCase());
        if(file==null) {
            return `cat : no such file or directory : ${fileName}`;
        }
        if(file.type=="txt")
            return file.content ?? "No Content in File";
        if(file.type=="url"){
            window.open(file.url,"_blank")
            return ""
        }
        return `cat : is a directory : ${fileName}`;
    }

    return func;
}

export default useOpen;