import { Structure } from "../../models/Structure";

export function currLocation(data:Structure,location:string[]) : Structure[] {
    if(!data.subdir) throw new Error(`Bruh what?`);
    let curr: Structure[] = data.subdir;
    for (const loc of location) {
        const med = curr.find(dat => dat.name.toLowerCase() == loc.toLowerCase());

        if (!med) {
            throw new Error(`Directory ${loc} does not exist`)
        }
        if(med.type != "dir" || !med.subdir) {
            throw new Error(`${med.name} is not a directory`)
        }
        curr = med.subdir;
    }
    return curr
}