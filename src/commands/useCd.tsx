import { AppContextType } from "../context/AppContext";
import useApp from "../context/useApp";
import {data} from "../data/data";
import { FakeHTML } from "../models/FakeHTML";
import { Structure } from "../models/Structure";
import { currLocation } from "./utils/currLocation";

const useCd = ()=> {
    const { location, setLocation } : AppContextType  = useApp();
    const func = (fut : string[]) : FakeHTML=> {
        if(fut[0]=="--help" || fut[0] =="-h") {
            return {
                tag: "div",
                childrens: [
                    {
                        tag : "p",
                        content: "Usage : cd path/to/dir",
                    },
                    {
                        tag : "p",
                        content: "Examples",
                    },
                    {
                        tag : "p",
                        content: "cd projects",
                    },
                    {
                        tag : "p",
                        content: "cd skills/frontend/",
                    },
                ]
            }
        }
        let curr: Structure[];
        if(fut[0].trim()=="~") {
            if (setLocation)
                setLocation([])
            return "";
        }
        const locs = [...location];

        curr = currLocation(data, location);
        for (const f of fut) {
            if(f=="..") {
                locs.pop();
                curr = currLocation(data, locs);

                continue;
            }
            const med = curr.find(dat => dat.name.toLowerCase() == f.toLowerCase());
            if (!med) {
                return `cd : no such file or directory : ${f}`
            }
            if (med.type != "dir" || !med.subdir) {
                return `cd : not a directory : ${f}`
            }
            locs.push(f);
            curr = med.subdir;
        }
        if (setLocation)
            setLocation([...locs]);
        else
            return `useCd : setLocation is not defined`;
        return ""
    }
    return func;
}

export default useCd;