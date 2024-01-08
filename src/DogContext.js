import React from "react";
import { dogsData } from "./dogsData";

// set the defaults
const DogContext = React.createContext({
  dogs: dogsData,
  setDogs: () => {},
});

export default DogContext;
