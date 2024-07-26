import { Route, Routes } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import BrandPage from "./BrandPage";
import ProductIdPage from "../product-id";
import OrderPage from "./OrderPage";
import AdminSidebar from "@/layouts/sidebars/AdminSidebar";
import CategoryPage from "./CategoryPage";
import BrandCreateAndUpdatePage from "./BrandCreateAndUpdatePage";
import CategoryCreateAndUpdatePage from "./CategoryCreateAndUpdatePage";

const AdminPage = () => {
  return (
    <div className="">
      <AdminSidebar />
      <div className="ml-[300px]">
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="brands" element={<BrandPage />} />
          <Route path="brands/create" element={<BrandCreateAndUpdatePage />} />
          <Route
            path="brands/update/:id"
            element={<BrandCreateAndUpdatePage />}
          />
          <Route path="categories/" element={<CategoryPage />} />
          <Route
            path="categories/create"
            element={<CategoryCreateAndUpdatePage />}
          />
          <Route
            path="categories/update/:id"
            element={<CategoryCreateAndUpdatePage />}
          />
          <Route path="products" element={<ProductIdPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminPage;
