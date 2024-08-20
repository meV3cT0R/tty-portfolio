import useApp from "../context/useApp";
import { data } from "../data/data";
import { Structure } from "../models/Structure";
import { currLocation } from "./utils/currLocation";

const useLs = () => {
    const { location } = useApp();
    const func = (l: string[]) => {
        if (l[0] == "--help" || l[0] =="-h") {
            return <div>
                <p> Usage : ls {"[path/to/dir]"}</p>
                <p>Examples:</p>
                <p> ls </p>
                <p> ls {"skills/frontend/"}</p>
            </div>
        }
        const curr: Structure[] = currLocation(data, [...location, ...l]);

        return <div className="flex flex-wrap ">
            {curr.map((c, index) => {
                return <span key={((index + 123 * 10) / 2) * 100 + 1233} className={`mr-6 ${c.type == "dir" ? "text-blue-900" : "text-white"} ${c.type == "url" && "underline"}`}>{c.name}</span>
            })}
        </div>
    }

    return func;
}

export default useLs;