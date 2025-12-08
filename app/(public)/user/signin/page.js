"use client";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  AuthErrorCodes,
} from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "@/app/_lib/firebase";


export default function SignInForm() {
  const [error, setError] = useState("");
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl") ?? "/";
  var clearError = () => {
    setError("");
  }
  const onSubmit = (e) => {
    clearError();
    e.preventDefault();
    const email = e.target["email"].value;
    const password = e.target["password"].value;
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            router.push(returnUrl);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
            if (error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS){
              setError("Invalid email or password")
            }else{
              setError(errorMessage)
            }
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <>
      <div className="flex items-center justify-center bg-base-200 ">
        <div className="card card-xl bg-base-100 shadow-xl border border-base-300 md:w-md">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            <form className="flex flex-col gap-1 form-control" onSubmit={onSubmit}>
              <label className="input validator w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input name="email" type="email" placeholder="mail@site.com" required onChange={clearError}/>
              </label>
              <div className="validator-hint hidden">Enter valid email address</div>

              <label className="input validator w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  minLength="6"
                  onChange={clearError}
                />
              </label>
              <p className="validator-hint hidden">
                Must be more than 5 characters
              </p>

              <button className="btn btn-primary w-full mt-2">Login</button>
              {error && <div className="alert alert-error shadow-sm">
                <span>{error}</span>
              </div>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
