import { useState } from "react";

export const UseToggle = (initialValue = false) => {
  const [isTrue, setValue] = useState(initialValue);
  const toggle = () => {
    setValue((preval) => !preval);
  };
  return [isTrue, toggle];
};


