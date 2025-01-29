
import { useState } from "react"




function App(){
    const [input,setInput]=useState('');
    const [result,setResult]=useState('');
    const [showResult,setShow]=useState(false);
    const [isGroup,setIsGroup]=useState(false);
    
    const handelClick=(value)=>{
      if (showResult){
        setInput(result+value);
        setShow(false);
      }else{
        setInput((prev)=>prev+value);
      }
    };
    
    const clearAll=()=>{
      setInput('');
      setResult('');
      setShow(false);
    }

    const clearLast=()=>{
      const lastinput=input.slice(0,-1);
      setInput(lastinput);
    }

    const handelPower=()=>{
        setIsGroup(true);
        const newResult=handelResult();
        const powerResult=Math.pow(newResult,2);
        setResult(powerResult);
        setShow(true);
          
    }
  
  const divideOne=()=>{
    setIsGroup(true)
    const newDivide=handelResult();
    const divide=(1/newDivide);
    setResult(divide);
    setShow(true);
  }
  
  const handelAbsolute=() =>{ 
        
    }
  const sqrtFunction=()=>{
    setIsGroup(true)
     const newInput=handelResult();
     const sqrtResult=Math.sqrt(newInput);
     setResult(sqrtResult);
    setShow(true)
  }
    const handelResult=() =>{
        const inputString= input.match(/(\d+(\.\d+)?|\*|\+|\-|\+|\/)/g).map(item => item.trim());
        const finalResult=evaluateExpression(inputString);
        setResult(finalResult);
        setShow(true);
        return finalResult;
        
      }
    const evaluateExpression=(array) =>{

      const len=array.length;
      if(len===1){
        return array[0]
      }
      while(len > 1 ){
          const indexMultiply=array.indexOf('*');
          const indexDivide=array.indexOf('/');
          if(indexMultiply !== -1 &&(indexDivide === -1|| indexMultiply<indexDivide)){
              const leftOperand = Number(array[indexMultiply- 1]);
              const rightOperand = Number(array[indexMultiply + 1]);
              const result= leftOperand * rightOperand;
              
              array.splice(indexMultiply-1,3,result)
              continue;
          }
          if (indexDivide !== -1){
              const leftOperand = Number(array[indexDivide- 1]);
              const rightOperand = Number(array[indexDivide + 1]);
              const result=leftOperand/rightOperand;
              array.splice(indexDivide-1,3,result);
              
              continue;
          }
  
          const indexAdd=array.indexOf('+');
          const indexSub=array.indexOf('-');
  
          if((indexAdd<indexSub ||indexSub===-1 ) && indexAdd !== -1 ){
              
              const leftOperand = Number(array[indexAdd- 1]);
              const rightOperand = Number(array[indexAdd + 1]);
              const result = leftOperand + rightOperand;
              
              array.splice(indexAdd-1,3,result);
              
              continue;
          }
          
          if(indexSub !== -1 ){
              const leftOperand = Number(array[indexSub- 1]);
              const rightOperand = Number(array[indexSub + 1]);
              const result=leftOperand-rightOperand;
              array.splice(indexSub-1,3,result);
              
              continue;
          }
          return array[0];
        }
        
  }
    
    return(
      
      <div className="flex flex-col gap-12 h-full w-full items-center  p-4">
        <div className="text-center">AJ CalculatorReact js</div>
        <div className="bg-black h-[350px] w-4/12 flex  flex-col p-6  rounded-lg gap-6 items-center "> 
          <div  className="bg-gray h-12 w-11/12 rounded-md  p-2"> {isGroup ? `(${input})` : input } {showResult &&`= ${result}`}
          </div>
          
          <div className="grid grid-cols-4 w-10/12 gap-3">
            <button  className="bg-purple rounded  text-white" ></button>
            <button className="bg-purple rounded  text-white" ></button>
            <button onClick={clearAll} className="bg-purple rounded  text-white" >AC</button>
            <button onClick={clearLast} className="bg-purple rounded  text-white" >C</button>
            <button className="bg-green rounded text-white">mc</button>
            <button className="bg-green rounded  text-white">m+</button>
            <button className="bg-green rounded  text-white">m-</button>
            <button className="bg-green rounded  text-white">mr</button>
          </div>
          <div className=" grid  grid-cols-5  w-10/12 gap-2">
            
            {
              ['7','8','9'].map((item) =>(
                <button key={item} onClick={()=> handelClick(item)} className=" bg-blue text-center text-white rounded   hover:shadow-shadowe2  focus:bg-indigo-600" >{item}</button>
              ))
            }
            
            {
              ["/","√"].map((item)=>(
              <button key={item} onClick={ item==="√" ? sqrtFunction  :() => handelClick(item)} className="bg-darkgray text-center text-white rounded  ">{item}</button>
              ))
            }
            {
              ['4','5','6'].map((item) =>(
                <button  key={item} onClick={()=>handelClick(item)} className="bg-blue text-center text-white rounded hover:bg-blue-600">{item} </button>

              ))
            }
            {
              ["*","^2"].map((item)=>(
                <button key={item} onClick={ item === '^2' ? handelPower :() => handelClick(item)} className=" bg-darkgray text-center text-white rounded  ">{item}</button>
                ))
            }
           
            {
              ['1','2','3'].map((item)=>(
                <button key={item} onClick={() => handelClick(item)}className=" bg-blue text-center text-white rounded hover:bg-blue-600" >{item}</button>
                ))
            }
            {
              ['-','1/x'].map((item)=>(
                <button key={item} onClick={ item ==='1/x' ? divideOne :() => handelClick(item)} className="bg-darkgray text-center text-white rounded ">{item}</button>
                ))
            }
            {
              [0].map((item)=>(
                <button key={item} onClick={() => handelClick(item)}className=" bg-blue  text-center text-white rounded hover:bg-blue-600" >{item}</button>
                ))
            }
            {
              ['.','±','+'].map((item)=>(
                <button key={item} onClick={item ==='±' ? handelAbsolute :() => handelClick(item)} className="bg-darkgray text-center text-white rounded  ">{item}</button>
                ))
            }
            <button onClick={handelResult} className="bg-red  rounded text-white">=</button>
            
          </div>
        </div>
        <div className="text-right text-darkgray">2024 ArezooAmiriAyoubloo</div>
      </div>
  
    
    )
  }



export default App