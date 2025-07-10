
import SidebarItems from "@/components/sidebarItems"

interface SideNavProps {
  children?: React.ReactNode;
}


export default function SideNav({ children }: SideNavProps) {

  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    <div className="flex-1 p-4 w-full">
    {children}
    </div>
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content w-80 p-4 flex flex-col h-full">
      <li className="flex justify-center p-4 bg-base-200">
        <img src="/yummy__nav_logo.svg" alt="Yummy Logo" className="h-24 object-contain" />
      </li>
      <SidebarItems />
    </ul>
  </div>
</div>
  );
}
