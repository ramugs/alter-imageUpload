import { IconButton, IconWithButton, PrimaryButton, SecondButton } from "./button/button";

const TestingComponent = () => {
  return (
    <div className="m-10">
      <PrimaryButton name="Testing" />
      <div className="my-5"></div>
      <SecondButton name="secondary" />
      <div className="my-5"></div>
      <IconWithButton name="Delete" />
      <div className="my-5"></div>
      <IconButton/>
    </div>
  );
};

export default TestingComponent;
