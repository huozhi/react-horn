import { useContext } from "react";
import HornContext from "./context";

function useHorn() {
  return useContext(HornContext).emit;
}

export { useHorn };
