import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FoodId from "./pages/FoodId";

function App() {
  return (
    <div>
      <div className="min-h-screen">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/:id" element={<FoodId />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
