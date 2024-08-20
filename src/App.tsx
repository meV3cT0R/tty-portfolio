import { useEffect, useRef, useState } from 'react';
import './App.css'
import useApp from './context/useApp';
import History from './components/History';

import {useCmd} from './commands/useCmd';


function App() {
  const { location,history } = useApp();
  const [prompt,setPrompt] = useState<string>("");
  const promptRef = useRef<HTMLInputElement>(null);
  
  const cmd = useCmd();
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
        tabIndex={0}
        onClick={()=>foc()}
        onKeyDown={()=>foc()}
      >
        <History history={history}/>
        <form 
          onSubmit={(e:React.FormEvent<HTMLFormElement>)=> {
              e.preventDefault();
              cmd(prompt);
              setPrompt("");
          }}
        >
          <div className='space-x-2 flex md:space-x-5 '>
            <span className='flex'>~/{location.join("/")} </span>
            <input
              ref={promptRef}
              className=' text-white bg-black outline-none flex-grow'
              value={prompt}
              spellCheck="false"
              onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setPrompt(e.target.value)}}
            />
          </div>
        </form>
        
      </div>

    </>
  )
}

export default App
