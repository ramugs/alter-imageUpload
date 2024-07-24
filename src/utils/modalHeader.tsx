type ModalHeaderProps = {
    children: React.ReactNode;
  };
  
  const ModalHeader = ({ children }: ModalHeaderProps) => {
    return (
      <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-900 bg-opacity-25">
        <div className="relative w-auto my-6 mx-10 max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-screen">
            <div className="p-6 overflow-y-auto max-h-full">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ModalHeader;