import { useReducer } from "react";

import themeContext from "./themeContext";

const initState = { dark: false };

export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "TOGGLE":
        return {
          ...prevState,
          dark: !prevState.dark,
        };
      default:
        return prevState;
    }
  }, initState);

  const toggleDark = () => dispatch({ type: "TOGGLE" });

  return (
    <themeContext.Provider value={{ ...state, toggleDark }}>
      {children}
    </themeContext.Provider>
  );
}
