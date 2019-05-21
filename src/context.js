import React from "react";

function noop() {};

const HornContext = React.createContext({
  emit: noop,
  addEventListener: noop,
  removeEventListener: noop
});

export default HornContext;
