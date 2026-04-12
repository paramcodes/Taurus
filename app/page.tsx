"use client"

import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from "react"
import SkeletonText from './components/skeleton';
import ChatMessage from './components/chatmessage';

export default function Home(){
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState<{user:any;ai:any}[]>([])
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    const localData = localStorage.getItem("chatHistory");
    if(localData)setMessages(JSON.parse(localData));
  },[])
  
  useEffect(()=>{
    if(messages.length > 0)localStorage.setItem("chatHistory",JSON.stringify(messages));
  },[messages])

  async function sendMessage(e:React.FormEvent){
    setLoading(true);
    e.preventDefault();
    if(!input.trim())return;
    try{
      const currInput = input;
      setInput("");
    const res = await fetch('/api/chat',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({message:currInput})
    })
    const data = await res.json();
    setMessages([...messages,{user:input,ai:data.reply}]);
  }catch(err){
    console.log("Failed to Fetch!!");
  }finally{
    setLoading(false)
  }
  }

  function clearHistory(){
    localStorage.removeItem("chatHistory");
    setMessages([]);
  }
  
  return (
    <div className="h-screen flex flex-col">
      <header className="flex justify-between p-4">
        <h1 className="text-xl">Taurus</h1>
        <button className='px-4 py-2 hover:text-gray-300 transition-colors bg-blue-950 rounded-4xl' onClick={clearHistory}>New Chat</button>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {messages.map((msg,i)=>(<div key={i} className="mx-4">
          <div className="flex justify-end"><div className="w-{msg.ai}fit bg-gray-900 m-4 p-4 rounded-2xl">{msg.user}</div></div>
          <ChatMessage content={msg.ai}/>
        </div>))}
        {loading?<SkeletonText/>:""}
      </main>
      <footer className='flex w-full justify-center'>
        <form onSubmit={sendMessage} className="p-4 flex item-center gap-4 w-3/4 bg-gray-900 rounded-2xl my-4">
        <input
          autoFocus
          value={input}
          placeholder="Ask Anything..."
          onChange={(e)=>setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 focus:ring-0"
        />
        <button type="submit" className="px-4 py-2 hover:text-gray-300 transition-colors bg-gray-700 rounded-lg">Send</button>
          </form>
      </footer>
    </div>
  )
}