"use client";
//IMPORTS
import Link from "next/link";
import { useSession } from "next-auth/react";

// LOGIC
export default function SidebarItems() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && session?.user;

  return (
    <>
      {/* Always visible */}
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link href="/recipes">Recipes</Link>
      </li>

      {/* Only show when authenticated */}
      {isAuthenticated && (
        <>
      <li>
        <Link href="/dashboard/my-recipes">My Recipes</Link>
      </li>
      <li>
        <Link href="/dashboard/cookbook">Cookbook</Link>
      </li>
      </>
      )}

      {/* Spacer */}
      <li style={{ flex: "1", visibility: "hidden", height: "0" }}></li>
      {!isAuthenticated ? (
      <li>
        <Link href="/log-in">Log In</Link>
      </li>
      ) : (
      <li>
        <Link href="/log-out">Log Out</Link>
      </li>
      )}
      
      <li style={{ marginTop: "10px" }}></li>

      {/* Always visible footer items */}
      <li>
        <Link href="/about-us">About Us</Link>
      </li>
      <li>
        <Link href="/settings">Settings</Link>
      </li>
    </>
  );
}
