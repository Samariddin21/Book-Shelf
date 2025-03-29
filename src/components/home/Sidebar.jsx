"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Book, PlusCircle } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white fixed left-0 top-0 h-screen flex flex-col justify-between p-8 shadow-lg border-r border-gray-200">
      <div className="flex flex-col flex-grow">
        {/* Логотип */}
        <div className="mb-8">
          <Image src="/logo.png" width={120} height={40} alt="Logo" />
        </div>

        {/* Навигация */}
        <nav className="flex flex-col gap-4 text-lg mt-10">
          <SidebarLink href="/home" icon={Home} label="Home" currentPath={pathname} />
          <SidebarLink href="/search" icon={Search} label="Search" currentPath={pathname} />
          <SidebarLink href="/myshelf" icon={Book} label="My Shelf" currentPath={pathname} />
          <SidebarLink href="/contribute" icon={PlusCircle} label="Contribute" currentPath={pathname} />
        </nav>
      </div>

      {/* Нижние ссылки – теперь они всегда видны */}
      <div className="text-gray-500 text-sm space-y-2">
        <p className="hover:text-black cursor-pointer">About</p>
        <p className="hover:text-black cursor-pointer">Support</p>
        <p className="hover:text-black cursor-pointer">Terms & Condition</p>
      </div>
    </aside>
  );
}

function SidebarLink({ href, icon: Icon, label, currentPath }) {
  const isActive = currentPath === href;
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 transition ${
        isActive ? "text-black-900 font-bold" : "text-gray-700 hover:text-orange-500"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
}
