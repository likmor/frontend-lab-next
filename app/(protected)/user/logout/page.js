"use client";

import { signOut } from "firebase/auth";
import { redirect } from "next/navigation";
import { auth } from "@/app/_lib/firebase";

export default function LogoutForm() {
  function logout() {
    signOut(auth).then(() => redirect("/"));
  }
  return (
    <div className="flex items-center">
      <div className="card bg-base-100 card-md shadow-xl border border-base-300">
        <div className="card-body">
          <h2 className="card-title">Logout</h2>
          <p>Are you sure you want to logout?</p>
          <div className="justify-end card-actions">
            <button className="btn btn-warning" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
