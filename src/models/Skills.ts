export interface Tool {
    name : string;
    tools ?: Tool[];
}

export interface Project {
    name ?: string;
    url : string;
}

export interface Skill {
    name : string;
    desc ?: string;
    tools ?:Tool[];
    projects?: Project[];
}

export interface Skills {
    [key:string] : Skill[]
}