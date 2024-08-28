"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// set the token in the cookies and redirect to the home page
export async function setToken(token: string) {
  cookies().set("token", token);
  redirect("/user-info");
}

// remove the token from the cookies and redirect to the home page
export async function removeToken() {
  cookies().delete("token");
  redirect("/auth/login");
}
