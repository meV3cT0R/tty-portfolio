import { cmdSplit } from '../utils/cmdSplit';
import useLs from '../commands/useLs';
import useCd from '../commands/useCd';
import useCat from '../commands/useCat';
import useOpen from '../commands/useOpen';
import useTree from '../commands/useTree';
import useApp from '../context/useApp';
import HistoryType from '../types/HistoryType';

export const useCmd = () => {
    const { location, setHistory, history } = useApp();

    const ls = useLs();
    const cd = useCd();
    const cat = useCat();
    const open = useOpen();
    const tree = useTree();

    const func = (prompt: string) => {
        if (prompt.trim() == "") {
            if (setHistory) {
                setHistory([...history, {
                    loc: location,
                    cmd: prompt,
                    output: ""
                }])
            }
            return;
        }
        const promptLower = prompt.toLowerCase()
        const promptArr = cmdSplit(promptLower);
        const newHistory: HistoryType = {
            loc: location,
            cmd: prompt,
            output: prompt,
        }
        if (promptArr[0] == "help") {
            newHistory.output = <div>
                <p><strong>ls</strong> - list all directories</p>
                <p><strong>clear</strong> - clears the terminal</p>
                <p><strong>cat</strong> - copy the content of file into terminal</p>
                <p><strong>cd</strong> - change directory</p>
                <p><strong>tree</strong> - view subdirectories in tree like structure</p>
                <p><strong>open</strong> - open the link</p>
                <p> For additional help, please use the --help option with any command.</p>
                <p> example : ls --help </p>
            </div>
        } else if (promptArr[0] == "ls")
            newHistory.output = ls(promptArr[1]?.split("/") || []);
        else if (promptArr[0] == "clear")
            return setHistory && setHistory([]);
        else if (promptArr[0] == "cat") {
            let output;
            if (promptArr.length == 1 || promptArr.length > 2) {
                output = <div>
                    <p>Usage: cat {"<path/to/file>"}</p>
                    <p> Type "cat --help" for more info</p>
                </div>
            } else {
                output = cat(promptArr[1].split("/"))
            }
            newHistory.output = output
        }
        else if (promptArr[0] == "cd") {
            let output;
            if (promptArr.length == 1 || promptArr.length > 2) {
                output = <div>
                    <p>Usage: cd {"<path/to/dir>"}</p>
                    <p> Type "cd --help" for more info</p>
                </div>
            } else {
                output = cd(promptArr[1].split("/"))
            }
            newHistory.output = output
        }
        else if (promptArr[0] == "open") {
            let output;
            if (promptArr.length == 1 || promptArr.length > 2) {
                output = <div>
                    <p>Usage: open {"<path/to/url>"}</p>
                    <p> Type "open --help" for more info</p>
                </div>
            } else {
                output = open(promptArr[1]?.split("/"))
            }
            newHistory.output = output
        }
        else if (promptArr[0] == "tree") {
            newHistory.output = tree(promptArr[1]?.split("/") || []);
        }
        else {
            newHistory.output = `vsh : command not found : ${promptArr[0]}`
        }
        if (setHistory)
            setHistory([...history, newHistory])
    }

    return func;
}
