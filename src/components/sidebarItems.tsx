"use client";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Link from 'next/link';

export default function SidebarItems() {
    useEffect(() => {
        themeChange(false); // initialize theme-change
    }, []);

    return (
      <>
        <li><Link href="/" className="text-lg font-semibold">Home</Link></li>
        <li><Link href="/dashboard" className="text-lg font-semibold">Dashboard</Link></li>
        <li><Link href="/recipes" className="text-lg font-semibold">Recipes</Link></li>
        <li><Link href="/dashboard/my-recipes" className="text-lg font-semibold">My Recipes</Link></li>
        <li><Link href="/dashboard/cookbook" className="text-lg font-semibold">Cookbook</Link></li>

        <div className="mt-auto">
          <li><Link href="/log-in" className="text-lg font-semibold">Log In</Link></li>
          <li><Link href="#" className="text-lg font-semibold">Log Out</Link></li>
          <li className="my-2"></li>
          <li className="ml-3 my-2 flex flex-row   items-center">
            <input
              type="checkbox"
              className="toggle toggle-md"
              data-toggle-theme="yummy_light,yummy_dark"
              data-act-class="toggle-primary"
            />
          </li>
          <li className="my-2"></li>
          <li><Link href="/about-us" className="text-lg font-semibold">About Us</Link></li>
          <li><Link href="/settings" className="text-lg font-semibold">Settings</Link></li>
        </div>
      </>
    )
}