"use client";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  AuthErrorCodes,
} from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { auth } from "@/app/_lib/firebase";
import { LoadingBar } from "@/app/_components/Loading";

function SignInFormInner() {
  const [error, setError] = useState("");
  const params = useSearchParams();
  const router = useRouter();

  const returnUrl = params.get("returnUrl") ?? "/";
  const clearError = () => setError("");

  const onSubmit = (e) => {
    e.preventDefault();
    clearError();

    const email = e.target["email"].value;
    const password = e.target["password"].value;

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
      })
      .then(() => {
        router.push(returnUrl);
      })
      .catch((error) => {
        console.error(error.code, error.message);
        if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
          setError("Invalid email or password");
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <div className="flex items-center justify-center bg-base-200">
      <div className="card card-xl bg-base-100 shadow-xl border border-base-300 md:w-md">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form className="flex flex-col gap-1 form-control" onSubmit={onSubmit}>
            <label className="input validator w-full">
              <input
                name="email"
                type="email"
                placeholder="mail@site.com"
                required
                onChange={clearError}
              />
            </label>
            <label className="input validator w-full">
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                minLength="6"
                onChange={clearError}
              />
            </label>
            <button className="btn btn-primary w-full mt-2">Login</button>
            {error && (
              <div className="alert alert-error shadow-sm">
                <span>{error}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default function SignInForm() {
  return (
    <Suspense fallback={<LoadingBar />}>
      <SignInFormInner />
    </Suspense>
  );
}
