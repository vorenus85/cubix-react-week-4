import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllDogScreen from "./views/AllDogScreen";
import NewDogScreen from "./views/NewDogScreen";
import NotFoundScreen from "./views/NotFoundScreen";
import { useState } from "react";
import DogContext from "./DogContext";
import { dogsData } from "./dogsData";

function App() {
  const [dogs, setDogs] = useState(dogsData);
  const value = { dogs, setDogs };

  return (
    <DogContext.Provider value={value}>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<AllDogScreen />} />
          <Route path="/dog/new" element={<NewDogScreen />} />
          <Route path="*" exact element={<NotFoundScreen />} />
        </Routes>
      </BrowserRouter>
    </DogContext.Provider>
  );
}

export default App;
