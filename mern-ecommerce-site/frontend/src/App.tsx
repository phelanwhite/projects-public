import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/Home";
import ProductIdPage from "./pages/product-id";
import AdminPage from "./pages/admin";
import Header from "./layouts/headers/Header";
import MenuBottom from "./layouts/menus/MenuBottom";
import AccountPage from "./pages/account";
import AddressPage from "./pages/account/AddressPage";
import AddressCreateAndUpdatePage from "./pages/account/AddressCreateAndUpdatePage";
import InformationPage from "./pages/account/InformationPage";
import SigninAndSignupPage from "./pages/auth/SigninAndSignupPage";

function App() {
  return (
    <>
      <Header />
      <div className="wrapper pt-4 pb-20 min-h-screen">
        <Routes>
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/signup" element={<SigninAndSignupPage />} />
          <Route path="/Signin" element={<SigninAndSignupPage />} />
          <Route index element={<HomePage />} />
          <Route path="/product-id" element={<ProductIdPage />} />
          <Route path="/account/*" element={<AccountPage />}>
            <Route path="account-information" element={<InformationPage />} />
            <Route path="address" element={<AddressPage />} />
            <Route
              path="address/create"
              element={<AddressCreateAndUpdatePage />}
            />
            <Route
              path="address/update/:id"
              element={<AddressCreateAndUpdatePage />}
            />
          </Route>
          {/* <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
      <MenuBottom />
      <ToastContainer position="bottom-left" />
    </>
  );
}

export default App;
