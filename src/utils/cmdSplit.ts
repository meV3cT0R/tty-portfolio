export function cmdSplit(text:string) : string[] {
    let single : string = "";

    
    let arr : string[] = [];
    let temp:string = "";
    for(let i=0;i<text.length;i++) {
        if(single =="" && (text[i]=="\"" ||text[i]=="'")) {
            single=text[i];
            continue;
        } 
        if(single!="" && text[i]==single) {
            arr.push(temp);
            single="";
            temp="";
            continue;
        }
        if(text[i]==" " && temp!="" && single==""){
            arr.push(temp);
            temp="";
            continue;
        }

        if(text[i]==" "&&temp=="") continue;
        temp +=text[i];
    }

    if(temp!="") arr.push(temp);
    return arr;
}