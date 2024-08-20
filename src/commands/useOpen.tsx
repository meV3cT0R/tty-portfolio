import useApp from "../context/useApp";
import {data} from "../data/data";
import { Structure } from "../models/Structure";
import { currLocation } from "./utils/currLocation";

const useOpen  = ()=> {
    const { location } = useApp();
    const func = (l:string[]=[])=> {
        if (l[0] == "--help" || l[0] =="-h") {
            return <div>
                <p> URLs are displayed as underlined text</p>
                <p> Usage : open {"<path/to/url>"} </p>
                <p>Examples:</p>
                <p> open about </p>
                <p> open {"skills/frontend/html/readme"}</p>
            </div>
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
            return file.content;
        if(file.type=="url"){
            window.open(file.url,"_blank")
            return ""
        }
        return `cat : is a directory : ${fileName}`;
    }

    return func;
}

export default useOpen;