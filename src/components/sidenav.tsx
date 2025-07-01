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
        <div>
            LOGO
        </div>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col">
    <SidebarItems />
    </ul>
  </div>
</div>
  );
}
