"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        toast.loading("Logging out...", { id: "logout" });

        await signOut({
          redirect: false,
        });

        toast.success("Successfully logged out!", { id: "logout" });

        setTimeout(() => {
          router.push("/recipes");
        }, 1500);
      } catch (error) {
        console.error("Logout failed:", error);
        toast.error("Logout failed. Please try again.", { id: "logout" });
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="flex justify-center items-center">
      <div className="min-w-md max-w-md mx-auto mt-12 p-6 border rounded-lg">
        <h1 className='text-8xl text-center font-bold bagel-fat-one-regular text-secondary mb-6'>Logging Out</h1>
        <p className="text-center">
          Thank you for your visit. You will now be logged out. We look forward to
          seeing you again soon.
        </p>
      </div>
    </div>
  );
}
