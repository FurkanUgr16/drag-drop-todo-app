"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const router = useRouter();
  return (
    <header className="flex justify-around items-center m-4 ">
      <Link href={"/"}>
        <h1 className="text-xl font-bold">To-Do App</h1>
      </Link>

      <nav className="flex justify-center items-center gap-2">
        <ModeToggle />
        <SignedOut>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant={"secondary"}
              onClick={() => router.push("/sign-in")}
            >
              Giriş Yap
            </Button>
            <Button onClick={() => router.push("/sign-up")}>Kayıt Ol</Button>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="flex items-center justify-center gap-2">
            <Button variant={"link"} onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
            <UserButton />
          </div>
        </SignedIn>
      </nav>
    </header>
  );
};

export default Navbar;
