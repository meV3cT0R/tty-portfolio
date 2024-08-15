export function currLocation(data:any,location:string[]) : any[] {
    let curr: any[] = data.subdir;
    for (let loc of location) {
        let med = curr.find(dat => dat.name.toLowerCase() == loc.toLowerCase());
        if (med == null || med.type != "dir") {
            throw new Error("Something went Wrong")
        }
        curr = med.subdir;
    }
    return curr
}