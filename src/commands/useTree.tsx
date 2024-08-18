import useApp from "../context/useApp";
import { data } from "../data/data";
import { currLocation } from "./utils/currLocation";

const useTree = () => {
    const { location } = useApp();
    const func = (l: string[] = []) => {
        if (l[0] == "--help" || l[0] == "-h") {
            return <div>
                <p> Usage : tree {"[path/to/dir]"}</p>
                <p> examples : </p>
                <p> tree </p>
                <p> tree {"skills/frontend/"}</p>
            </div>
        }


        const genOutput = (loc: string[], pad: number = 0): React.ReactNode => {
            let curr: any[] = currLocation(data, loc);
            // const style = {
            //     marginLeft : `${pad * 30}px`
            // }
            const style = {}
            return <div>{
                curr.map((dat, index) => {
                    if ("subdir" in dat && dat["subdir"].length != 0) {
                        return <div key={((index * 12367) + 12341) / 2}>
                            {[...Array(pad * 5).keys()].map((_, i) => <span key={((i * 6549) + 98711) / 4}>-</span>)}<span className="text-blue-900" style={style}> {dat.name} </span>
                            {genOutput([...loc, dat.name], pad + 1)}
                        </div>
                    }
                    return <p key={(((index * 134) + 12341) / 14) * 15}>{[...Array(pad * 5).keys()].map((_, i) => <span key={((i * 54569) + 35441) / 1}>-</span>)}<span className={`${dat.type == "dir" && "text-blue-900"} ${dat.type == "url" && "underline"}`} style={style}> {dat.name} </span></p>
                })}
            </div>
        }
        try {
            return genOutput([...location, ...l])
        } catch (err: any) {
            return err.message;
        }
    }

    return func;
}

export default useTree;