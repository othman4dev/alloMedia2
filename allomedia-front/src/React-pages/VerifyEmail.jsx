import React from "react";
import "tailwindcss/tailwind.css";
import { Alert } from "flowbite-react";

const VerifyEmail = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <Alert color="success" withBorderAccent>
          <span className="font-medium">User registered successfully!</span>{" "}
          Please check your email to verify your account.
        </Alert>
      </div>
    </div>
  );
};

export default VerifyEmail;
