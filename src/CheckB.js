import React from 'react'
import { useState } from 'react'
const CheckB = () => {
    const [TnC,setTnC] = useState("")
    return (
        <div>
             <input type="checkbox" value={TnC} onChange={(e)=>setTnC(e.target.checked)}/>
        </div>
    )
}

export default CheckB
