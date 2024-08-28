"use client";

import { removeToken } from "@/app/actions/handle-token";

interface LogoutButtonProps {
  children: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = async () => {
    console.log("logout triggered");

    await removeToken();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
