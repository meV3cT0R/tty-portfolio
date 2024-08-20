interface FakeHTM {
    tag : string,
    content?:string,
    className ?: string,
    childrens ?:FakeHTML[]
}

export type FakeHTML = FakeHTM | string