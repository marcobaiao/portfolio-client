import { useEffect, useState } from "react";

function Typewriter({ text, speed = 70 }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(
    function () {
      let i = 0;

      const interval = setInterval(function () {
        if (i < text.length) {
          setDisplayText((prevText) => prevText + text.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => {
        clearInterval(interval);
      };
    },
    [text, speed]
  );

  return displayText;
}

export default Typewriter;
