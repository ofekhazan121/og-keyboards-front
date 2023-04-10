import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults";

const Keycaps = () => {
  const [results, setResults] = useState();

  useEffect(() => {
    setResults(<SearchResults val={"keycaps"} />);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: "3rem" }}>Keycaps</h1>
      {results}
    </div>
  );
};

export default Keycaps;
