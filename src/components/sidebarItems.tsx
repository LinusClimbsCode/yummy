import Link from 'next/link';

export default function SidebarItems() {
    return (
      <>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/recipes">Recipes</Link></li>
        <li><Link href="/dashboard/my-recipes">My Recipes</Link></li>
        <li><Link href="/dashboard/cookbook">Cookbook</Link></li>
        <li style={{ flex: '1', visibility: 'hidden', height: '0' }}></li>
        <li><Link href="/log-in">Log In</Link></li>
        <li><Link href="#">Log Out</Link></li>
        <li style={{ marginTop: '10px' }}></li>
        <li><Link href="/about-us">About Us</Link></li>
        <li><Link href="/settings">Settings</Link></li>
        
      </>
    )
}