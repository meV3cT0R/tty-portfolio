import { FakeHTML } from "./FakeHTML";

export  interface Structure {
    type : "dir" | "url" | "txt";
    name : string;
    subdir?: Structure[];
    content ?: FakeHTML;
    url ?:string;
}