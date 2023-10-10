import react,{useCallback, useState,useEffect ,useRef} from "react";
import './App.css';

function App() {
const [length,setLength]=useState(8);
const [password,setPassward]=useState("");
const [useChar,setChar]=useState(false);
const [useNum,setNum]=useState(false);
const passwardRef=useRef(null);
const passwardGenerator=useCallback(()=>{
  let paswrd=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(useNum) str+="0123456789";
  if(useChar) str+="!@#$&";
  for (let i=1;i<=length;i++){
    const char=Math.floor(Math.random()*str.length+1);
    paswrd+=str.charAt(char)
  }
  setPassward(paswrd);
},[length,setPassward,useChar,useNum])

const copyToClipboard=useCallback(()=>{
  passwardRef.current?.select();
  window.navigator.clipboard.writeText(password);
  setTimeout(()=>{
    alert("Password Copied!")
  },1000)
},[password])
useEffect(()=>{
  passwardGenerator();
},[length,useChar,useNum,passwardGenerator])
  return (
    <>
    <div className="w-screen h-screen bg-black flex flex-col items-center ">
    <div className="flex bg-gray-500 w-1/2 flex-col text-center items-center justify-center text-white p-10">
    <h1 className="text-white text-center font-bold text-4xl mb-4">password generated</h1>
    <div>
    <input type="text" 
    className="w-80 h-10 mb-10 text-black text-lg font-medium" 
    value={password} 
    placeholder="Passward"
    readOnly
    ref={passwardRef}
    />
    <button className=" bg-sky-500  h-10 text-lg" onClick={copyToClipboard}>COPY</button>
    </div>
    <div className="flex flex-wrap gap-3 text-xl">
    <input className="w-40" type="range" min={8} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
    <label >length :{length}</label>
    <input type="checkbox" defaultChecked={useChar} id="charCheck"onChange={()=>setChar((prev)=>!prev)}/>
    <label>Special Cherector</label>
    <input type="checkbox"defaultChecked={useNum} id="numCheck" onChange={()=>setNum((prev)=>!prev)}/>
    <label>Numbers</label>
    </div>
    </div>
    </div>

    </>
  );
}

export default App;
