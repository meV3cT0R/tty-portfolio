import useApp from "../context/useApp";
import { data } from "../data/data";
import { FakeHTML } from "../models/FakeHTML";
import { Structure } from "../models/Structure";
import { currLocation } from "./utils/currLocation";

const useLs = () => {
    const { location } = useApp();
    const func = (l = []): FakeHTML => {
        if (l[0] == "--help" || l[0] == "-h") {
            return {
                tag: "div",
                childrens: [

                    {
                        tag: "p",
                        content: "Usage : ls path/to/dir",
                    },
                    {
                        tag: "p",
                        content: "Examples : ",
                    },
                    {
                        tag: "p",
                        content: "ls",
                    },
                    {
                        tag: "p",
                        content: "ls skills/frontend/",
                    },
                ]
            }
        }

        try {

            const curr: Structure[] = currLocation(data, [...location, ...l]);

            return {
                tag: "div",
                className: "flex flex-wrap",
                childrens: curr.map((c) => {
                    return {
                        tag: "span",
                        className: `mr-6 ${c.type == "dir" ? "text-blue-900" : "text-white"} ${c.type == "url" && "underline"}`,
                        content: c.name
                    }
                })
            }
        } catch (err) {
            if (err instanceof Error) {

                return {
                    tag: "div",
                    content: `ls : ${err.message} `
                }
            }
            return {
                tag: "div",
                content: "ls : Something Went Wrong "
            }
        }


    }

    return func;
}

export default useLs;
