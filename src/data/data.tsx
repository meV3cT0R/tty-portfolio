enum SkillType {
    FRONTEND,BACKEND,SPECIALIZED_SKILLS
}

const skills = {
    "frontend": [
        {
            "name": "html",
            "desc" : "Hacked NASA using html"
        },
        {
            "name": "css",
        },
        {
            "name": "javascript",
            "tools": [
                {
                    "name": "react.js",
                    "tools": [
                        {
                            "name": "redux"
                        }
                    ]
                },
                {
                    "name": "angular",
                },
            ]
        }
    ],
    "backend": [
        {
            "name": "javascript",
            "tools": [
                {
                    "name": "Node.js",
                    "tools": [
                        {
                            "name": "Express.js"
                        }
                    ]
                }
            ]
        }, {
            "name" : "java",
            "tools" : [
                {
                    "name" : "Spring Framework"
                }
            ]
        },{
            "name" : "python",
            "tools" : [
                {
                    "name" : "Django"
                }
            ] 
        }
    ],
    "specialized_skills" : [
        {
            "name" : "Web_Scraping",
            "tools" : [
                {
                    "name" : "BeautifulSoup",
                },
                {
                    "name" : "Scrapy",
                },
                {
                    "name" : "Selenium",
                }
            ]
        }
    ]
}

const genSkillObj = (skills: any[]) => {
    return skills.map((skill): any => {
        let obj :any = {
            "type": "dir",
            "name": skill.name,
            "subdir": []
        }
        if ("tools" in skill) 
            obj["subdir"] =genSkillObj(skill.tools)

        if("desc" in skill)
            obj["subdir"].push({
                "type" : "txt",
                "name" : "readme",
                "content" : skill.desc
            })
        return obj;
    })
}
export const data = {
    "type": "dir",
    "name": "~",
    "subdir": [
        {
            "type": "txt",
            "name": "about",
            "content": <div>
                <p> Hello I am Sumit Shrestha </p>
                <strong> God </strong>
            </div>
        },
        {
            "type": "dir",
            "name": "projects",
            "subdir": [
                {
                    "type": "dir",
                    "name": "auto parts e-commerce",
                    "subdir": [
                        {
                            "type": "txt",
                            "name": "about",
                            "content": "Some Random Shit, that prolly, no one's gonna read"
                        },
                        {
                            "type" : "url",
                            "name" : "link"
                        }
                    ]
                }
            ]
        },
        {
            "type": "dir",
            "name": "skills",
            "subdir": Object.keys(skills).map(key=> {
                    
                    return {
                        "type": "dir",
                        "name": key,
                        "subdir": genSkillObj(skills[key as keyof typeof skills])
                    }
            })
        },
        {
            "type": "dir",
            "name": "socials",
            "subdir": [
                {
                    "type": "url",
                    "name": "chess",
                    "url": "https://www.chess.com/member/meV3cT0R"
                },
                {
                    "type": "url",
                    "name": "twitter",
                    "url": "https://www.twitter.com/meV3cT0R"
                },
                {
                    "type": "url",
                    "name": "github",
                    "url": "https://www.github.com/meV3cT0R"
                },
                {
                    "type": "txt",
                    "name": "readme",
                    "content": <div>
                        <p><strong>open </strong> command can be used to open the link </p>
                        <p>Example Usage : <em>open filename</em> </p>
                    </div>
                }
            ]
        }
    ]
}
