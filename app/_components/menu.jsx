"use client";

import { MdInfoOutline } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoGameControllerOutline } from "react-icons/io5";
import Link from "next/link";

export default function Menu() {
  return (
    <div className="flex min-h-full flex-col items-start bg-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
      <ul className="menu w-full grow">
        <li>
          <Link
            href="/"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Homepage"
          >
            <IoHomeOutline className="my-1.5 inline-block size-5" />
            <span className="is-drawer-close:hidden">Homepage</span>
          </Link>
        </li>

        <li>
          <Link
            href="/user/games"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="Games"
          >
            <IoGameControllerOutline className="my-1.5 inline-block size-5 " />
            <span className="is-drawer-close:hidden">Games</span>
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
            data-tip="About"
          >
            <MdInfoOutline className="my-1.5 inline-block size-5" />
            <span className="is-drawer-close:hidden">About</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
