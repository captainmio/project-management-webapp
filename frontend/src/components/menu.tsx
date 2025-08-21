import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { BookOpen, CircleHelpIcon, Rss } from "lucide-react";

const MainMenu = () => {
  const navigationMenuItems = [
    { title: "Home", href: "/", icon: CircleHelpIcon, isActive: true }, // Changed href to "/" for home
    { title: "Blog", href: "/blog", icon: Rss }, // Using proper Next.js href format
    { title: "Docs", href: "/docs", icon: BookOpen },
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-8">
        {navigationMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className={cn(
                "relative group inline-flex h-9 w-max items-center justify-center px-0.5 py-2 text-sm font-medium",
                "before:absolute before:bottom-0 before:inset-x-0 before:h-[2px] before:bg-primary before:scale-x-0 before:transition-transform",
                "hover:before:scale-x-100 hover:text-accent-foreground",
                "focus:before:scale-x-100 focus:text-accent-foreground focus:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
                "data-[active]:before:scale-x-100 data-[state=open]:before:scale-x-100"
              )}
              asChild
              active={item.isActive}
            >
              {/* This is the correct way to use next/link with shadcn components */}
              {/* <Link href={item.href}> */}
                <div>
                <CircleHelpIcon className="h-5 w-5 mr-2" />
                {item.title}
                </div>
              {/* </Link> */}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainMenu;