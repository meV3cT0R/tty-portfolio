import useApp from "../context/useApp";
import { data } from "../data/data";
import { currLocation } from "./utils/currLocation";

const useCat = () => {
    const { location } = useApp();
    const func = (l: string[]) => {
        if (l[0] == "--help" || l[0] =="-h") {
            return <div>
                <p> files are displayed in white. urls are also displayed in white but they are underlined </p>
                <p> Usage : open {"<path/to/file>"} </p>
                <p>Examples:</p>
                <p> cat about </p>
                <p> cat {"skills/frontend/html/readme"}</p>
            </div>
        }
        try {
            const fileName = l.pop();
            let curr: any[] = currLocation(data, [...location, ...l]);
            const file = curr.find(dat => dat.name.toLowerCase() == fileName?.toLowerCase());
            if (file == null) {
                return `cat : no such file or directory : ${fileName}`;
            }
            if (file.type != "txt")
                return `cat : is not a file : ${fileName}`;

            return file.content;
        } catch (err) {
            return err;
        }
    }

    return func;
}

export default useCat;