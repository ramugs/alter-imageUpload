import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../components/button/button";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <span className="text-neutral-900 text-24 font-semibold">
        Something went Wrong
      </span>
      <p className="text-neutral-600 text-24 font-semibold">
        Please try again some time
      </p>
      <div className="py-5">
        <PrimaryButton name="Home Page" onclick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default ErrorPage;
