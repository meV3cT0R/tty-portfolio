import { Skill, Skills } from "../models/Skills"
import { Structure } from "../models/Structure"

const skills: Skills = {
    "frontend": [
        {
            "name": "html",
            "desc": "Hacked NASA using html"
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
                    ],

                }
            ], "projects": [
                {
                    "name": "blog",
                    "url": "https://github.com/meV3cT0R/blog"
                }
            ]
        }, {
            "name": "java",
            "tools": [
                {
                    "name": "Spring Framework"
                }
            ],
            "projects": [
                {
                    "name": "AMS",
                    "url": "https://github.com/meV3cT0R/ApS-backend"
                }
            ]
        }, {
            "name": "python",
            "tools": [
                {
                    "name": "Django"
                }
            ]
        }
    ],
    "specialized_skills": [
        {
            "name": "Web_Scraping",
            "tools": [
                {
                    "name": "BeautifulSoup",
                },
                {
                    "name": "Scrapy",
                },
                {
                    "name": "Selenium",
                }
            ],
            "projects": [
                {
                    "name": "job_lising",
                    "url": "https://github.com/meV3cT0R/job_listing"
                }
            ]
        }
    ]
}

const genSkillObj = (skills: Skill[]) => {
    return skills.map(skill => {
        const obj: Structure = {
            "type": "dir",
            "name": skill.name
        }

        obj.subdir = []
        if (skill.tools)
            obj.subdir = genSkillObj(skill.tools)

        if (skill.desc)
            obj.subdir.push({
                "type": "txt",
                "name": "readme",
                "content": skill.desc
            })
        if (skill.projects) {
            const project: Structure = {
                "type": "dir",
                "name": "projects"
            }
            project.subdir = []

            for (let i = 0; i < skill.projects.length; i++) {
                project.subdir.push({
                    "type": "url",
                    "name": skill.projects[i].name ?? `project ${i}`,
                    "url": skill.projects[i].url
                })
            }
            obj.subdir.push(project)
        }
        return obj;
    })
}
export const data: Structure = {
    "type": "dir",
    "name": "~",
    "subdir": [
        {
            "type": "txt",
            "name": "about",
            "content": {
                "tag": "div",
                "childrens": [
                    {
                        "tag": "p",
                        "content": "Hello I am Sumit Shrestha"
                    },
                    {
                        "tag": "strong",
                        "content": "God"
                    }
                ]
            }
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
                            "type": "url",
                            "name": "link"
                        }
                    ]
                }
            ]
        },
        {
            "type": "dir",
            "name": "skills",
            "subdir": Object.keys(skills).map(key => {
                return {
                    "type": "dir",
                    "name": key,
                    "subdir": genSkillObj(skills[key])
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
                    "content": {
                        "tag": "div",
                        "childrens": [
                            {
                                "tag": "p",
                                "childrens": [
                                    {
                                        "tag": "strong",
                                        "content": "open"
                                    },
                                    {
                                        "tag": "span",
                                        "content": "command can be used to open the link"
                                    },
                                ]
                            },
                            {
                                "tag": "p",
                                "content": "Example Usage : ",
                                "childrens": [
                                    {
                                        "tag": "em",
                                        "content": "open filename"
                                    }
                                ]
                            },
                        ]
                    }
                }
            ]
        }
    ]
}
