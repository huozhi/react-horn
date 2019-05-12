import { createContext } from "react";

function noop() {}

const HornContext = createContext({
  dispatch: noop,
  addInstance: noop,
  removeInstance: noop
});

export default HornContext;
