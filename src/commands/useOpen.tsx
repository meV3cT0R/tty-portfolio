import useApp from "../context/useApp";
import {data} from "../data/data";

const useOpen  = ()=> {
    const { location } = useApp();
    const func = (l:string="")=> {
        let curr: any[] = data.subdir;
        for (let loc of location) {
            let med = curr.find(dat => dat.name.toLowerCase() == loc.toLowerCase());
            if (med == null || med.type != "dir") {
                return "useOpen : something went wrong"
            }
            curr = med.subdir;
        }

        const file = curr.find(dat=>dat.name.toLowerCase()==l.toLowerCase());
        if(file==null) {
            return `cat : no such file or directory : ${l}`;
        }
        if(file.type=="txt")
            return file.content;
        if(file.type=="url"){
            window.open(file.url,"_blank")
            return ""
        }
        return `cat : is a directory : ${l}`;
    }

    return func;
}

export default useOpen;