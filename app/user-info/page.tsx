"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  resume: z.instanceof(File).refine((file) => file.size <= 5000000, {
    message: "File size should be less than 5MB.",
  }),
});

const UserInfo = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("resume", values);
    try {
      const formData = new FormData();
      formData.append("file", values.resume);

      const response = await fetch(
        "https://65.1.106.246:8443/api/users/me/resume",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);
        // Update UI or perform additional actions as needed
      } else {
        throw new Error("File upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">User Information</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormDescription>
                  Upload your resume (PDF, DOC, or DOCX format)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Upload</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInfo;
