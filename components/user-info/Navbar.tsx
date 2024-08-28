import React from "react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";
import { IoMdExit } from "react-icons/io";
import LogoutButton from "@/components/auth/logout-button";

const NavbarUserInfo = () => {
  return (
    <>
      <div className="p-5 flex justify-between items-center">
        <Image
          className=""
          src="/skr.svg"
          alt="logo"
          width="200"
          height="200"
        />
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#0b44d8] text-white font-semibold">
                  CN
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <LogoutButton>
                <DropdownMenuItem className="flex justify-between items-center">
                  <span>Logout</span>
                  <IoMdExit className="h-4 w-4" />
                </DropdownMenuItem>
              </LogoutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default NavbarUserInfo;
