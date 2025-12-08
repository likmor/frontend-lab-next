"use client";
import { useAuth } from "../_lib/AuthContext";
import Link from "next/link";

export default function Navbar() {
  const { user } = useAuth();
  return (
    <nav className="navbar w-full bg-base-300">
      <label
        htmlFor="my-drawer-4"
        aria-label="open sidebar"
        className="btn btn-square btn-ghost"
      >
        {/* Sidebar toggle icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2"
          fill="none"
          stroke="currentColor"
          className="my-1.5 inline-block size-4"
        >
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
          <path d="M9 4v16"></path>
          <path d="M14 10l2 2l-2 2"></path>
        </svg>
      </label>
      <div className="px-4 flex-1">Next-app lab</div>
      <div className="flex-none">
        {user == null ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/user/signin/">Login</Link>
            </li>
            <li>
              <Link href="/user/signup/">Register</Link>
            </li>
          </ul>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Profile img"
                  src={
                    user?.photoURL ??
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-xl border border-base-300"
            >
              <li className="w-full">
                <h1 className="menu-title text-xl pb-0 truncate w-full">
                  {user?.displayName}
                </h1>
                <ul>
                  <li>
                    <Link href="/user/profile/" className="text-lg">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/user/logout/" className="text-lg">
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
