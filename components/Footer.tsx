import React from "react";
import { IoLogoVercel, IoLogoGithub } from "react-icons/io5";
import Link from "next/link";
import { BsGlobe } from "react-icons/bs";

function Footer() {
  return (
    <div className="w-full py-10 px-1 md:px-10 lg:px-40 mt-20 dark:bg-slate-800">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-2xl text-black dark:text-white font-semibold">
          Portfolio:
          <Link href="https://matejkotrba.vercel.app/">
            <a>
              <BsGlobe className="text-5xl duration-200 hover:scale-105" />
            </a>
          </Link>
        </p>
        <p className="flex items-center gap-2 text-2xl text-black dark:text-white font-semibold">
          Github:
          <Link href="https://github.com/mkit2009">
            <a>
              <IoLogoGithub className="text-5xl duration-200 hover:scale-105" />
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Footer;
