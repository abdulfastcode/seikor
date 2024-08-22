"use client";

import Image from "next/image";

interface HeaderProps{
    label: string;
}

export const Header = ({label}:HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
        {/* <h1 className="text-3xl font-semibold">Seikor Auth</h1> */}
        <Image src="/skr.svg" width="200" height="200" alt="logo"/>
        <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
