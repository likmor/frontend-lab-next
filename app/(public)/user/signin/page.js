"use client";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";


export default function SignInForm() {
  const auth = getAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl");

  const onSubmit = (e) => {
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
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="min-h-[85vh] flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

            <form className="form-control gap-4" onSubmit={onSubmit}>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                />
              </label>

              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                />
              </label>

              <button className="btn btn-primary w-full mt-2">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
