import useApp from "../context/useApp";
import { data } from "../data/data";
import { FakeHTML } from "../models/FakeHTML";
import { Structure } from "../models/Structure";
import { currLocation } from "./utils/currLocation";

const useCat = () => {
    const { location } = useApp();
    const func :(l:string[])=>FakeHTML = (l: string[]) : FakeHTML => {
        if (l[0] == "--help" || l[0] == "-h") {
            const fakeHtml: FakeHTML = {
                tag: "div",
                childrens: [
                    {
                        tag : "p",
                        content: "files are displayed in white. urls are also displayed in white but they are underlined",
                    },
                    {
                        tag : "p",
                        content: "Usage : cat path/to/file",
                    },
                    {
                        tag : "p",
                        content: "Examples",
                    },
                    {
                        tag : "p",
                        content: "cat about",
                    },
                    {
                        tag : "p",
                        content: "cat skills/frontend/html/readme",
                    },
                ]
            }
            return fakeHtml


        }
        try {
            const fileName = l.pop();
            const curr: Structure[] = currLocation(data, [...location, ...l]);
            const file = curr.find(dat => dat.name.toLowerCase() == fileName?.toLowerCase());
            if (file == null) {
                return `cat : no such file or directory : ${fileName}`;
            }
            if (file.type != "txt")
                return `cat : is not a file : ${fileName}`;

            return file.content ?? "";
        } catch (err) {
            if(err instanceof Error)
                return err.message;
            return "Something Horribly Went Wrong -.-"
        }
    }

    return func;
}

export default useCat;