import useApp from "../context/useApp";
import { data } from "../data/data";
import { currLocation } from "./utils/currLocation";

const useCat = () => {
    const { location } = useApp();
    const func = (l: string = "") => {
        try {
            let curr: any[] = currLocation(data, location);
            const file = curr.find(dat => dat.name.toLowerCase() == l.toLowerCase());
            if (file == null) {
                return `cat : no such file or directory : ${l}`;
            }
            if (file.type != "txt")
                return `cat : is not a file : ${l}`;

            return file.content;
        } catch (err) {
            return err;
        }
    }

    return func;
}

export default useCat;