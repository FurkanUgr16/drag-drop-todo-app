"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleRoute = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <section className="container mx-auto py-[20%] flex flex-col items-center text-center space-y-8">
      <h1 className="text-center text-4xl font-bold">
        Manage Your Tasks <br /> With
        <span className="text-blue-600"> Simple Drag&Drop</span>
      </h1>

      <div>
        <Button
          onClick={handleRoute}
          variant={"secondary"}
          className="h-12 px-8 text-lg"
        >
          Let&apos;s Get Started
          <ArrowRight />
        </Button>
      </div>
    </section>
  );
};

export default Header;
