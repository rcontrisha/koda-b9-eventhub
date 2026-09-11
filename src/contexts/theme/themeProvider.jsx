import { useReducer, useEffect } from "react";
import { Outlet } from "react-router";
import themeContext from "./themeContext";

const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

const initState = {
  dark: getInitialTheme(),
};

function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE":
      return {
        ...state,
        dark: !state.dark,
      };
    default:
      return state;
  }
}

export default function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initState);

  useEffect(() => {
    const root = document.documentElement;
    if (state.dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [state.dark]);

  const toggleDark = () => dispatch({ type: "TOGGLE" });

  return (
    <themeContext.Provider value={{ dark: state.dark, toggleDark }}>
      {children ? children : <Outlet />}
    </themeContext.Provider>
  );
}