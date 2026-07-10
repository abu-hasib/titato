import { act, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "starting":
      return {
        ...state,
        status: "starting",
        data: action.data ?? null,
        error: null,
      };

    case "waiting":
      return {
        ...state,
        status: "waiting",
        data: {...state.data, ...action.data},
        error: null,
      };
    case "playing":
      return {
        ...state,
        status: "playing",
        error: action.error,
      };
    default:
      return state;
  }
};

export default function useSimpleReducer(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, {
    status: "starting",
    data: {mode: "explosive"},
    loading: null,
    error: null,
    ...initialState,
  });

  return { ...state, dispatch };
}
