import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults";

const Keyboards = () => {
  const [results, setResults] = useState();

  useEffect(() => {
    setResults(<SearchResults val={"keyboard"} />);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Keyboards</h1>
      {results}
    </div>
  );
};

export default Keyboards;
