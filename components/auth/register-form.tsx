"use client";
import { CardWrapper } from "./card-wrapper";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import bcrypt from "bcryptjs";

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
import { RegisterSchema } from "@/schema";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useState, useTransition } from "react";

export const RegisterForm = () => {
  const [transition, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState<boolean | undefined>();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      console.log("userData", data);
      const validateFields = RegisterSchema.safeParse(data);

      if (!validateFields.success) {
        return setError("Invalid fields");
      }

      // extracting fields from data
      const { email, password, name } = validateFields.data;

      try {
        // Encrypt password
        // const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashedPassword);

        // Send data to the API using fetch
        const response = await fetch("http://65.1.106.246:8000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_type: "admin",
            email: email,
            full_name: name,
            // password: hashedPassword,
            password: password,
            phone: "string",
            address: "string",
          }),
        });

        if (response.ok) {
          const resp = await response.json();
          console.log("success response", resp);
          setSuccess("Account crated Successful!");
        } else {
          const errorData = await response.json();
          setError(
            errorData.message ||
              "Failed to create an account. Please try again."
          );
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            {" "}
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="seikor"
                      disabled={transition}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
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
          </div>
          {success && <FormSuccess message={success} />}
          {error && <FormError message={error} />}

          <Button type="submit" className="w-full" variant="default">
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
