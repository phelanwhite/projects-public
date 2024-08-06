import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import PostIdPage from "./pages/post-id-page";
import AuthorIdPage from "./pages/author-id-page/page";
import PostCreateAndUpdatePage from "./pages/post-create-and-update-page";
import Header from "./components/layout/Header";
import SigninAndSignupPage from "./pages/signin-signup-page";
import UpdateMePage from "./pages/update-me";
import AuthProvider from "./components/provider/AuthProvider";
import LibraryPage from "./pages/library-page";
import StoriesPage from "./pages/stories-page";

const App = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[1232px] w-full px-4 mx-auto mt-8">
        <Routes>
          {/* auth */}
          <Route path="signin" element={<SigninAndSignupPage />} />
          <Route path="signup" element={<SigninAndSignupPage />} />
          <Route path="update-me" element={<UpdateMePage />} />
          {/* authenticated */}
          <Route path="/" element={<AuthProvider />}>
            <Route path="post-create" element={<PostCreateAndUpdatePage />} />
            <Route
              path="post-update-id/:id"
              element={<PostCreateAndUpdatePage />}
            />
            <Route path="library" element={<LibraryPage />} />
            <Route path="stories" element={<StoriesPage />} />
          </Route>
          {/* public */}
          <Route index element={<HomePage />} />
          <Route path="post/:id" element={<PostIdPage />} />
          <Route path="author/:id" element={<AuthorIdPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
