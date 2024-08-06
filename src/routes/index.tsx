import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/profilePage";
import { ToastContainer } from "react-toastify";
import PageNotFound from "../pages/pageNotFound";
import ErrorPage from "../pages/errorPage";
import SidebarPage from "../pages/sidebarPage";

const Index = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={<ProfilePage />} />
          <Route path={"/error-page"} element={<ErrorPage />} />
          <Route path={"/sidebar"} element={<SidebarPage />} />
        </Routes>
      </Router>
      <ToastContainer limit={3} />
    </>
  );
};

export default Index;
