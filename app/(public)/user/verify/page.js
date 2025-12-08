"use client";
import {
  getAuth,
  signOut,
} from "firebase/auth";
import { useAuth } from "@/app/_lib/AuthContext";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (user?.email) setEmail(user.email);
    signOut(getAuth());
  }, [user]);

  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold">Email not verified</h1>
          <p className="py-6">
            Verify clicking on link in email send to your address {email}
          </p>
          <button className="btn btn-primary" onClick={() => redirect("/")}>
            Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
