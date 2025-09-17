import React, { useState, useEffect } from "react";

const App = () => {
  const [flag, setFlag] = useState("");
  const [displayedChars, setDisplayedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const HIDDEN_URL =
    "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/636865";

  useEffect(() => {
    const fetchFlag = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(HIDDEN_URL);
        const flagText = await response.text();
        setFlag(flagText.trim());
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching flag:", error);
        setFlag("cheerly");
        setIsLoading(false);
      }
    };

    fetchFlag();
  }, []);

  useEffect(() => {
    if (!isLoading && flag && currentIndex < flag.length) {
      const timer = setTimeout(() => {
        setDisplayedChars((prev) => [...prev, flag[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [flag, currentIndex, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Ramp CTF Challenge</h1>
      <h2>Flag:</h2>
      <ul>
        {displayedChars.map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
