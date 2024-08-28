"use client";
import { CardWrapper } from "./card-wrapper";

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
import { ResetSchema } from "@/schema";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { useState, useTransition } from "react";

export const ResetForm = () => {
  const [transition, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ResetSchema>) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      console.log("userData", data);
      const validateFields = ResetSchema.safeParse(data);

      if (!validateFields.success) {
        return setError("Invalid fields");
      }

      // extracting fields from data
      const { email } = validateFields.data;

      try {
        // Send data to the API using fetch
        const response = await fetch(
          "https://65.1.106.246:8443/api/password-reset-request",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
            }),
          }
        );

        if (response.ok) {
          const resp = await response.json();
          console.log("success response", resp);
          setSuccess("Password reset email sent, Please check your mail.");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Fail to reset password request!");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      //   showSocial
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
          </div>
          <FormSuccess message={success} />
          <FormError message={error} />
          <Button type="submit" className="w-full" variant="default">
            Send Reset Email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
