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
import YourListPage from "./pages/library-page/YourListPage";
import SavedListsPage from "./pages/library-page/SavedListsPage";
import HistoryPage from "./pages/library-page/HistoryPage";
import PublishedPage from "./pages/stories-page/PublishedPage";
import DraftsPage from "./pages/stories-page/DraftsPage";
import ResponsePage from "./pages/stories-page/ResponsePage";
import ListCreateAndUpdatePage from "./pages/list-create-and-update-page";

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
            <Route path="list-create" element={<ListCreateAndUpdatePage />} />
            <Route
              path="list-update-id/:id"
              element={<ListCreateAndUpdatePage />}
            />
            <Route path="library/*" element={<LibraryPage />}>
              <Route index element={<YourListPage />} />
              <Route path="saved-list" element={<SavedListsPage />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>
            <Route path="stories/*" element={<StoriesPage />}>
              <Route index element={<PublishedPage />} />
              <Route path="drafts" element={<DraftsPage />} />
              <Route path="responses" element={<ResponsePage />} />
            </Route>
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
