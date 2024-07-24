import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "../pages/profilePage";

const Index = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProfilePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default Index;
