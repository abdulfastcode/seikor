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
import { NewPasswordSchema } from "@/schema";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [transition, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean | undefined>();
  const [showReEnterPassword, setShowReEnterPassword] = useState<
    boolean | undefined
  >();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      reEnterPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewPasswordSchema>) => {
    setSuccess("");
    setError("");

    if (!token) {
      setError("Token is missing");
      return;
    }

   

      // handle the OTP and redirect to the login page

      const validateFields = NewPasswordSchema.safeParse(data);

      if (!validateFields.success) {
        return setError("Invalid fields");
      }

      // extracting fields from data
      const { reEnterPassword } = validateFields.data;

      try {
        const response = await fetch(
          "http://65.1.106.246:8000/api/reset-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              new_password: reEnterPassword,
            }),
          }
        );

        if (response.ok) {
          const resp = await response.json();
          console.log("success response", resp);
          setSuccess("Password reset Successful!");

          // route to login
          // route.push("/");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Password Reset Failed!");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
    }
  ;

  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      //   showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
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
                        type={showPassword ? "text" : "password"}
                        disabled={transition}
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
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="reEnterPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reenter Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="******"
                        type={showReEnterPassword ? "text" : "password"}
                        disabled={transition}
                        className="pr-[30px]"
                      />

                      <IoMdEye
                        onClick={() => {
                          setShowReEnterPassword(true);
                        }}
                        className="cursor-pointer absolute top-[10px] right-[13px]"
                      />

                      {showReEnterPassword && (
                        <IoMdEyeOff
                          onClick={() => {
                            setShowReEnterPassword(false);
                          }}
                          className="cursor-pointer absolute top-[10px] right-[13px]"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full" variant="default">
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
