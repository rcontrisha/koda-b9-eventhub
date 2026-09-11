import { useContext } from "react";

import themeContext from "../contexts/theme/themeContext";

export const useTheme = () => {
  const context = useContext(themeContext)

  return context
}