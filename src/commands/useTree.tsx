import useApp from "../context/useApp";
import { data } from "../data/data";
import { FakeHTML } from "../models/FakeHTML";
import { Structure } from "../models/Structure";
import { currLocation } from "./utils/currLocation";

const useTree = () => {
    const { location } = useApp();
    const func = (l: string[] = []) => {
        if (l[0] == "--help" || l[0] == "-h") {
            return {
                tag: 'div',
                childrens: [
                    {
                        tag: 'p',
                        content: 'Usage : tree {"[path|to|dir]"}',
                    },
                    {
                        tag: 'p',
                        content: 'examples :',
                    },
                    {
                        tag: 'p',
                        content: 'tree',
                    },
                    {
                        tag: 'p',
                        content: 'tree skills/frontend/',
                    },
                ],
            };
        }


        const genOutput = (loc: string[], pad= 0): FakeHTML => {
            const curr: Structure[] = currLocation(data, loc);
            // const style = {
            //     marginLeft : `${pad * 30}px`
            // }
            return {
                "tag" : "div",
                "childrens" : curr.map(dat=>{
                    let padding = "";

                    for(let i=0;i<pad*5;i++) padding+="-"
                    if (dat.subdir) {
                        return {
                            "tag" :"div",
                            "content" : "",
                            "childrens" : [
                                {
                                    "tag" : "span",
                                    "content" : padding,
                                },
                                {
                                    "tag" : "span",
                                    "className" : "text-blue-900",
                                    "content" : dat.name,
                                }
                                ,genOutput([...loc,dat.name],pad+1)
                            ]
                        }
                    }
                    return {
                        "tag" : "p",
                        "content" :padding,
                        "childrens" :[
                            {
                                "tag" : "span",
                                "className" : `${dat.type == "dir" && "text-blue-900"} ${dat.type == "url" && "underline"}`,
                                "content" : dat.name,

                            }
                        ]
                    }
                })
            }
        }
        try {
            return genOutput([...location, ...l])
        } catch (err: unknown) {
            return (err as {message:string}).message;
        }
    }

    return func;
}

export default useTree;