import NavbarUserInfo from "@/components/user-info/Navbar";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarUserInfo />
      <div className="w-full h-full flex flex-col ">{children}</div>
    </div>
  );
};

export default AuthLayout;
