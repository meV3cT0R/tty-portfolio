import { useEffect, useRef, useState } from 'react';
import './App.css'
import useApp from './context/useApp';
import HistoryType from './types/HistoryType';
import History from './components/History';
import useLs from './commands/useLs';
import useCd from './commands/useCd';
import { cmdSplit } from './utils/cmdSplit';
import useCat from './commands/useCat';
import useOpen from './commands/useOpen';
import useTree from './commands/useTree';
import God from './svg/God';


function App() {
  const { location } = useApp();
  const [prompt,setPrompt] = useState<string>("");
  const promptRef = useRef<HTMLInputElement>(null);
  const [history,setHistory]= useState<HistoryType[]>([]);
  const ls = useLs();
  const cd = useCd();
  const cat = useCat();
  const open = useOpen();
  const tree = useTree();
  
  const foc = ()=> promptRef.current?.focus();
  useEffect(()=> {
      foc()
  },[])

  useEffect(()=> {
    window.scrollTo({
      top : promptRef.current?.offsetTop,
    })
  },[history])
  return (
    <>
      <div 
        className='bg-black text-white min-h-[100vh] w-full md:text-xl px-2 md:px-5 font-mono'
        onClick={_=>foc()}
      >
        <God />
        <History history={history}/>
        <form 
          onSubmit={(e:React.FormEvent<HTMLFormElement>)=> {
              e.preventDefault();
              if(prompt.trim()=="") {
                setHistory([...history,{
                  loc : location,
                  cmd: prompt,
                  output: ""
                }])

                return;
              }
              const promptLower = prompt.toLowerCase()
              setPrompt("")
              const promptArr = cmdSplit(promptLower);
              const newHistory :HistoryType= {
                loc : location,
                cmd : prompt,
                output: prompt,
              }
              if(promptArr[0]=="help") {
                newHistory.output = <div>
                    <p><strong>ls</strong> - list all directories</p>
                    <p><strong>clear</strong> - clears the terminal</p>
                    <p><strong>cat</strong> - copy the content of file into terminal</p>
                    <p><strong>cd</strong> - change directory</p>
                    <p><strong>tree</strong> - view subdirectories in tree like structure</p>
                    <p><strong>open</strong> - open the link</p>
                </div>
              }else if(promptArr[0]=="ls")
                newHistory.output = ls();
              else if(promptArr[0]=="clear")
                return setHistory([]);
              else if(promptArr[0]=="cat")
                newHistory.output=cat(promptArr[1])
              else if(promptArr[0]=="cd"){
                newHistory.output = cd(promptArr[1].split("/"))
              }
              else if(promptArr[0]=="open"){
                newHistory.output = open(promptArr[1])
              }
              else if(promptArr[0]=="tree"){
                newHistory.output = tree();
              }
              else
                newHistory.output = `vsh : command not found : ${promptArr[0]}`
              setHistory([...history,newHistory])
          }}
        >
          <div className='space-x-2 flex md:space-x-5 '>
            <span className='flex'>~/{location.join("/")} </span>
            <input
              ref={promptRef}
              className=' text-white bg-black outline-none flex-grow'
              value={prompt}
              spellCheck="false"
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPrompt(e.target.value)}
            />
          </div>
        </form>
        
      </div>

    </>
  )
}

export default App
