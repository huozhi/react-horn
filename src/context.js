import { createContext } from "react";

function noop() {}

const ActionHubContext = createContext({
  dispatch: noop,
  addInstance: noop,
  removeInstance: noop
});

export default ActionHubContext;
