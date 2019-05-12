import { useContext } from "react";
import ActionHubContext from "./context";

function useDispatch() {
  return useContext(ActionHubContext).dispatch;
}

export { useDispatch };
