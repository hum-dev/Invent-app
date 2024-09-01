'use client'

import { Archive, Clipboard, Gift, Icon, Layout, LucideIcon, Menu, SlidersHorizontal, Warehouse } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { usePathname } from "next/navigation";
import path from "path";
import Link from "next/link";

interface SidebarLinksProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLinks = ({
  href,
  icon: Icon,
  label,
  isCollapsed
}: SidebarLinksProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/dashboard");

  return (
      <Link href={href}>
        <div className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start py-4 px-8"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white" : ""}`}>
          <Icon className="w-6 h-6 !text-gray-700" />
          <span className={`${isCollapsed ? "hidden" : "block"} text-gray-700 font-medium`}>{label}</span>
        </div>
      </Link>
    );
  }
  
  const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  return (
      <div className={sidebarClassNames}>
          {/* Top Logo */}
      <div className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-7"}`}>
        <div>Logo</div>
        <h1 className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}>HUMSTO</h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
          </div>
          
          {/* Links */}
          <div className="flex-grow mt-8">
        {/* Links Here */}
        <SidebarLinks href="/dashboard" icon={Layout} label="Dashboard" isCollapsed={isSidebarCollapsed} />
        <SidebarLinks href="/inventory" icon={Archive} label="Inventory" isCollapsed={isSidebarCollapsed} />
        <SidebarLinks href="/items" icon={Clipboard} label="Items" isCollapsed={isSidebarCollapsed} />
        <SidebarLinks href="/categories" icon={Warehouse} label="Categories" isCollapsed={isSidebarCollapsed} />
        <SidebarLinks href="/swags" icon={Gift} label="Swags" isCollapsed={isSidebarCollapsed} />
        <SidebarLinks href="/settings" icon={SlidersHorizontal} label="Settings" isCollapsed={isSidebarCollapsed} />
      
          </div>

          {/* FOOTER */}
          <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
              {/* Footer Here */}
              <p className="text-center text-xs text-gray-500">&copy: 2024 HumSto</p>
          </div>
    </div>
  );
}

export default Sidebar