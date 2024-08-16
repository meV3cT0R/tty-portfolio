import useApp from "../context/useApp";
import { data } from "../data/data";
import { currLocation } from "./utils/currLocation";

const useTree = () => {
    const { location } = useApp();
    const func = () => {
        const genOutput = (loc: string[], pad: number = 0): React.ReactNode => {
            let curr: any[] = currLocation(data, loc);
            // const style = {
            //     marginLeft : `${pad * 30}px`
            // }
            const style = {}
            return <div>{
                curr.map(dat => {
                    if ("subdir" in dat && dat["subdir"].length != 0) {
                        return <div>
                            {[...Array(pad*5).keys()].map(_=><span>-</span>)}<span className="text-blue-900" style={style}> {dat.name} </span>
                            {genOutput([...loc, dat.name], pad + 1)}
                        </div>
                    }
                    return <p>{[...Array(pad*5).keys()].map(_=><span>-</span>)}<span className={`${dat.type=="url" && "underline"}`} style={style}> {dat.name} </span></p>
                })}
            </div>
        }
        return genOutput(location)
    }

    return func;
}

export default useTree;