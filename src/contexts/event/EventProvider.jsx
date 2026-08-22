import { useReducer } from "react";

import EventContext from "./eventContext";
import { Outlet } from "react-router";

const initState = {
  currentStep: 1,
  formData: {
    image_url: "",
    title: "",
    desc: "",
    tags: [],
    date: "",
    start_time: "",
    end_time: "",
    location: "",
    capacity: 0,
  speakers: [],
  },
};

export default function EventProvider() {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case "UPDATE_FIELDS":
        return {
          ...prevState,
          formData: {
            ...prevState.formData,
            ...action.payload,
          },
        };
      case "NEXT_STEP":
        return {
          ...prevState,
          currentStep: Math.min(3, prevState.currentStep + 1),
        };
      case "PREV_STEP":
        return {
          ...prevState,
          currentStep: Math.max(1, prevState.currentStep - 1),
        };
      case "SUBMIT":
        return {
          ...prevState,
        };
      default:
        return prevState;
    }
  }, initState);

  const updateFields = (fields) => dispatch({type: 'UPDATE_FIELDS', payload: fields})
  const nextStep = () => dispatch({type: 'NEXT_STEP'})
  const prevStep = () => dispatch({type: 'PREV_STEP'})
  const submit = () => dispatch({type: 'SUBMIT'})

  return (
    <EventContext.Provider value={{ ...state, updateFields, nextStep, prevStep, submit }}>
      <Outlet />
    </EventContext.Provider>
  );
}