import LoginButton from "@/components/auth/login-button";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="w-full h-full flex flex-col items-center justify-center bg-[#1a357d]">
        <div className="space-y-6 text-center">
          {/* <h1 className="text-6xl font-semibold drop-shadow-md text-white">
            Auth
          </h1> */}
          <Image src="/skr-bgw.svg" width="200" height="200" alt="logo"/>
          <div>
            <LoginButton  asChild>
              <Button variant="secondary" size="lg">
                Sign in
              </Button>
            </LoginButton>
          </div>
        </div>
      </main>
    </>
  );
}
