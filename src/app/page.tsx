'use client';
import Link from 'next/link';
import CurvedLoop from '@/components/reactBits/CurvedLoop';

export default function Page() {
  return (
    <>
      <div className="hero bg-base-200 h-full">
        <div className="hero-content flex-col text-center">
          <img src="/yummy__nav_logo.svg" alt="Yummy Logo" className="h-32" />
          <h1 className="text-9xl font-bold mt-6 text-white-content bagel-fat-one-regular">Welcome to<br />Yummy</h1>
          <CurvedLoop
            marqueeText=" Delicious Recipes Await You  *  "
            curveAmount={250}
            speed={1}
          />
          <p className="text-3xl py-4 max-w-xl text-base-content">
            Discover, save, and enjoy delicious recipes tailored to your taste. Switch themes to match your vibe — dark or light, it’s all about making your cooking experience Yummy!
          </p>
          <Link href="/recipes">
            <button className="btn btn-primary mt-4">Start Cooking</button>
          </Link>
        </div>
      </div>
    </>
  );
}
