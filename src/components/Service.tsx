import React, { useState } from 'react'

const Service = () => {
    const [count , setCount] = useState(0);
    const increase= () =>{
        setCount(count +1);
    }
    const fiveIncrease = () =>{
         setCount(count+5);
    }
  return (
    <div>
        <div>hello this is add service</div>
        <div>hello this is add service</div>

        <div>hello this is add service</div>

        <div> <button onClick={increase}>Add 1</button></div>
        <div> <button onClick={fiveIncrease}>Add 5</button></div>

        Count : <input type="number" value={count} />
    </div>
  )
}

export default Service