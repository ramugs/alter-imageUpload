import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/profilePage";
import { ToastContainer } from "react-toastify";
import PageNotFound from "../pages/pageNotFound";
import ErrorPage from "../pages/errorPage";

const Index = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<ProfilePage />} />
          <Route path={"/error-page"} element={<ErrorPage />} />
        </Routes>
      </Router>
      <ToastContainer limit={3} />
    </>
  );
};

export default Index;
