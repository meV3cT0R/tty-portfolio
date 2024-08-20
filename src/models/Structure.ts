import React from "react";

export  interface Structure {
    type : "dir" | "url" | "txt";
    name : string;
    subdir?: Structure[];
    content ?: React.ReactNode;
    url ?:string;
}