import useApp from "../context/useApp";
import {data} from "../data/data";

const useLs  = ()=> {
    const { location } = useApp();
    const func = (l:string="")=> {
        let curr: any[] = data.subdir;
        for (let loc of location) {
            let med = curr.find(dat => dat.name.toLowerCase() == loc.toLowerCase());
            if (med == null || med.type != "dir") {
                return "useLs : something went wrong"
            }
            curr = med.subdir;
        }
        if(l=="")
            return <div className="flex space-x-7">
                {curr.map((c,index)=>{
                    return <span key={((index+123*10)/2)*100+1233} className={`${c.type=="dir"?"text-blue-900":"text-white"}`}>{c.name}</span>
                })}
            </div>
    }

    return func;
}

export default useLs;