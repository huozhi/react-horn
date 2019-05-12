import React from "react";

function noop() {};

const HornContext = React.createContext({
  dispatch: noop,
  addInstance: noop,
  removeInstance: noop
});

export default HornContext;
