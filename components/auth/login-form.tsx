"use client";
import { CardWrapper } from "./card-wrapper";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useState, useTransition } from "react";
import Link from "next/link";

export const LoginForm = () => {
  const [transition, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean | undefined>();
 

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");

    startTransition(() => {
      console.log("userData", data);
      setSuccess("Authentication Successfully");
      // axios.post("/...,values")
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {" "}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="seikor@mail.com"
                      type="email"
                      disabled={transition}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="******"
                        disabled={transition}
                        type={showPassword ? "text" : "password"}
                         className="pr-[30px]"
                      />
                      <IoMdEye
                        onClick={() => {
                          setShowPassword(true);
                        }}
                        className="cursor-pointer absolute top-[10px] right-[13px]"
                      />

                      {showPassword && (
                        <IoMdEyeOff
                          onClick={() => {
                            setShowPassword(false);
                          }}
                          className="cursor-pointer absolute top-[10px] right-[13px]"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href="/auth/reset">Forget Password?</Link>
                  </Button>
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full" variant="default">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
