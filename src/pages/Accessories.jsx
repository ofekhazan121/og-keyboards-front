import React, { useState, useEffect } from "react";
import SearchResults from '../components/SearchResults'

const Accessories = () => {
    const [results,setResults] = useState()

    useEffect(() => {
        setResults(<SearchResults val={"accessories"} />)
      
    }, [])
    

  return (
    <div>
        <h1 style={{textAlign: "center", fontSize: "3rem"}}>Accessories</h1>
        {results}
    </div>
  )
}

export default Accessories