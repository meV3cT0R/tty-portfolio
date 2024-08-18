export function currLocation(data:any,location:string[]) : any[] {
    let curr: any[] = data.subdir;
    for (let loc of location) {
        console.log(loc);
        let med = curr.find(dat => dat.name.toLowerCase() == loc.toLowerCase());
        console.log(med);

        if (med == null) {
            throw new Error(`Directory ${loc} does not exist`)
        }
        if(med.type != "dir") {
            throw new Error(`${med.name} is not a directory`)
        }
        curr = med.subdir;
    }
    return curr
}