import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/button/button";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <span className="text-24 font-medium text-neutral-900">404 page not found</span>
      <span className="text-16 text-neutral-600">
        We are sorry but the page you are looking for does not exist or
        Something Went wrong
      </span>
      <div className="py-5">
        <PrimaryButton name="Home Page" onclick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default PageNotFound;
