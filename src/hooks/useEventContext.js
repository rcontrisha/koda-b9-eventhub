import { useContext } from "react";

import eventContext from "../contexts/event/eventContext";

export const useEventContext = () => {
  const context = useContext(eventContext);

  // const { state, dispatch } = context;
  return context;
};
