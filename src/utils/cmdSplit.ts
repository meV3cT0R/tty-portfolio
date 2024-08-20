export function cmdSplit(text:string) : string[] {
    let single : string = "";
    const arr : string[] = [];
    let temp:string = "";
    for(const i of text) {
        if(single =="" && (i=="\"" ||i=="'")) {
            single=i;
            continue;
        } 
        if(single!="" && i==single) {
            arr.push(temp);
            single="";
            temp="";
            continue;
        }
        if(i==" " && temp!="" && single==""){
            arr.push(temp);
            temp="";
            continue;
        }

        if(i==" "&&temp=="") continue;
        temp +=i;
    }

    if(temp!="") arr.push(temp);
    return arr;
}