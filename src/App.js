import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllDogScreen from "./views/AllDogScreen";
import OneDogScreen from "./views/OneDogScreen";
import NewDogScreen from "./views/NewDogScreen";
import NotFoundScreen from "./views/NotFoundScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<AllDogScreen />} />
        <Route path="/dog/:id" element={<OneDogScreen />} />
        <Route path="/dog/new" element={<NewDogScreen />} />
        <Route path="*" exact element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
