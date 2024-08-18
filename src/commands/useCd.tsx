import useApp from "../context/useApp";
import {data} from "../data/data";
import { currLocation } from "./utils/currLocation";

const useCd = () => {
    const { location, setLocation } = useApp();
    const func = (fut : string[]) => {
        if(fut[0]=="--help" || fut[0] =="-h") {
            return <div>
                <p> Usage : cd {"<path/to/dir>"} </p>
                <p> Examples:</p>
                <p> cd projects </p>
                <p> cd {"skills/frontend/"}</p>
            </div>
        }
        let curr: any[];
        if(fut[0].trim()=="~") {
            if (setLocation)
            setLocation([])
            return "";
        }
        let locs = [...location];

        curr = currLocation(data, location);
        for (let f of fut) {
            if(f=="..") {
                locs.pop();
                curr = currLocation(data, locs);

                continue;
            }
            let med = curr.find(dat => dat.name.toLowerCase() == f.toLowerCase());
            if (med == null) {
                return `cd : no such file or directory : ${f}`
            }
            if (med.type != "dir") {
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