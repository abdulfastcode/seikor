import React from "react";

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#1a357d]">
      {children}
    </div>
  );
};

export default AuthLayout;
