import { useState } from "react"




function App(){
    const [input,setInput]=useState('');
    const [result,setResult]=useState('');
  

    const handelClick=(value)=>{
      setInput((prev)=>prev+value);
    };
    
    const clearAll=()=>{
      setInput('');
      setResult('');
    }

    const clearLast=()=>{
      const lastinput=input.slice(0,-1);
      setInput(lastinput);
    }

    const handelPower=()=>{
      const number = parseFloat(input);
      if (!isNaN(number)) {
          const poweredResult = Math.pow(number, 2); 
          setResult(poweredResult);
          setInput(poweredResult);
          
      } else {
          setResult('Error'); 
      }
  }

  
  const handelAbsolute=() =>{ 
      const absolute=parseFloat(input);
      if(!isNaN(absolute)){
        const absoluteResult = Math.abs(number);
        setResult(absoluteResult);
        setInput(absoluteResult);
      }
      else{
        setResult('Error'); 
      }
  }
    const handelResult=() =>{
        const inputString= input.match(/(\d+(\.\d+)?|\*|\+|\-|\+|\/)/g).map(item => item.trim());
        if (!inputString) return setResult('Error');
        const finalResult=evaluateExpression(inputString);
        setResult(finalResult);
        setInput(finalResult);
      }
    const evaluateExpression=(array) =>{

      const len=array.length;
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
              console.log('s');
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
        <div className="bg-black h-max min-w-min w-6/12 flex  flex-col p-6  gap-3 items-center "> 
          <div   className= "bg-gray flex  h-20 w-full justify-center" >
            <input  type="text" value={input} className="bg-gray  w-11/12"/>
            <span className="text-green text-center ">{result}</span>
          </div>
          <div className="grid grid-cols-4 w-full gap-3">
            <button  className="bg-purple rounded  text-white" ></button>
            <button className="bg-purple rounded  text-white" ></button>
            <button onClick={clearAll} className="bg-purple rounded  text-white" >AC</button>
            <button onClick={clearLast} className="bg-purple rounded  text-white" >C</button>
            <button className="bg-green rounded text-white">mc</button>
            <button className="bg-green rounded  text-white">m+</button>
            <button className="bg-green rounded  text-white">m-</button>
            <button className="bg-green rounded  text-white">mr</button>
          </div>
          <div className=" grid  grid-cols-5 h-5/6 w-full gap-2">
            
            {
              ['7','8','9'].map((item) =>(
                <button key={item} onClick={()=> handelClick(item)} className=" bg-blue text-center text-white rounded hover:bg-blue-600" >{item}</button>
              ))
            }
            
            {
              ["/","√"].map((item)=>(
              <button key={item} onClick={() => handelClick(item)} className="bg-darkgray text-center text-white rounded  ">{item}</button>
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
                <button key={item} onClick={() => handelClick(item)} className="bg-darkgray text-center text-white rounded ">{item}</button>
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
      </div>
    
    )
  }



export default App