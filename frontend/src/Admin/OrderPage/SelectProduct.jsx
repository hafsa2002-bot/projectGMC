import React, {useEffect, useMemo, useState} from 'react'
import {uuid} from './uuid'
function SelectProduct({options, value, onChange}) {
    const [search, setSearch] = useState("")
    const [open, setOpen] = useState(false);

    const [id] = useState(uuid())
    useEffect(() => {
        function handleOutsideClick(e){
            if(
                !e.target.closest(`#Toggle-${id}`) &&
                !e.target.closest(`#Select-${id}`)
            )
            setOpen(false)
        }
        document.addEventListener("mousedown", handleOutsideClick)
        return () => document.removeEventListener("mousedown", handleOutsideClick)
    }, [])
  return (
    <div
        id={``}
    >
        
    </div>
  )
}

export default SelectProduct
