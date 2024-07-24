import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import ProductIdPage from "./pages/product-id";

function App() {
  return (
    <>
      <div className="wrapper min-h-screen">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product-id" element={<ProductIdPage />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
