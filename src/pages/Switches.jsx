import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults";

const Switches = () => {
  const [results, setResults] = useState();

  useEffect(() => {
    setResults(<SearchResults val={"switch"} />);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Switches</h1>
      {results}
    </div>
  );
};

export default Switches;
