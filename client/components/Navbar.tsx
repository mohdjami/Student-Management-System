"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { HandMetal, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import TokenContext from "@/lib/TokenContext";
import { handleStorageChange } from "@/lib/Storage";
import { AuthContext } from "@/lib/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    handleStorageChange(setIsLoggedIn);

    window.addEventListener("storage", () =>
      handleStorageChange(setIsLoggedIn)
    );

    return () => {
      window.removeEventListener("storage", () =>
        handleStorageChange(setIsLoggedIn)
      );
    };
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/log-in");
  };

  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Home />
        </Link>
        {isLoggedIn ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Link className={buttonVariants()} href="/log-in">
            Log in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
