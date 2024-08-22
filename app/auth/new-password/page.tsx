import { NewPasswordForm } from "@/components/auth/new-password-form";
import React from "react";
import { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <div>
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </div>
  );
};

export default NewPasswordPage;
