"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";

import { z } from "zod";
import { RegisterSchema } from "@/schema";
import { OtpSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { cookies } from "next/headers";
import { setToken } from "@/app/actions/handle-token";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [successToken, setSuccessToken] = useState<boolean | undefined>();

  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const route = useRouter();

  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onTokenCheck = useCallback(() => {
    // handle the token and redirect to the login page
    if (!token) {
      setError("Token not found");
      return;
    }
    console.log("token", token);
    // setSuccessToken when the token is available
    setSuccessToken(true);
    // route.push("/");
  }, [token]);

  useEffect(() => {
    onTokenCheck();
  }, [onTokenCheck]);

  async function onSubmit(data: z.infer<typeof OtpSchema>) {
    console.log("OTPdata", data);
    setSuccessMessage("");
    setError("");
    // handle the OTP and redirect to the login page

    const validateFields = OtpSchema.safeParse(data);

    if (!validateFields.success) {
      return setError("Invalid fields");
    }

    // extracting fields from data            
    const { pin } = validateFields.data;

    // console.log("token", token);

    try {
      const response = await fetch(
        "https://65.1.106.246:8443/api/verify-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
            otp: pin,
          }),
        }
      );

      if (response.ok) {
        const resp = await response.json();
        console.log("success response", resp);
        setSuccessMessage("Verification successful!");
        // store token in local storage
        if (token) {
          await setToken(token);
        }
        
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Verification failed!");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to Login"
      >
        {/* OTP */}
        {successToken && (
          <div className="space-y-2 flex justify-center items-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={1} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={4} />
                          </InputOTPGroup>
                          <InputOTPGroup>
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Please enter the one-time password sent to your Email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormSuccess message={successMessage} />

                <Button className="w-full" type="submit">
                  Verify
                </Button>
              </form>
            </Form>
          </div>
        )}
        <div className="flex items-center justify-center w-full mt-3">
          {!successToken && !error && <BeatLoader />}
          {/* <FormSuccess message={successMessage} /> */}
          <FormError message={error} />
        </div>
      </CardWrapper>
    </div>
  );
};
