import React, {useState, useEffect, useMemo} from 'react'

function UseMemoTest() {
    const [count, setCount] = useState(0)
    const [x, setX] = useState(0)
    /*
    const expensiveCalculation = useMemo(() => {
        return count * 2
    },[count])
    */
   const fnct = () => {
    setX(count *2) 
   }
    useEffect(() => {
        fnct()
    }, [count])
   
  return (
    <div className=''>
        <p>Count: {count} </p>
        {/* <p>Calculated value: {expensiveCalculation} </p> */}
        <p>Calculated value: {x} </p>
        <button className='bg-blue-500 mt-10 ml-2 p-2 rounded-lg text-white' onClick={() => setCount(count + 1)} >
            Increment
        </button>
    </div>
  )
}

export default UseMemoTest
