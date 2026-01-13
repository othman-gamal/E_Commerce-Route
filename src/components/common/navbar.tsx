import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ShoppingCart, UserRound } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <nav className="bg-[#F5F5F5E5] p-5">
        <div className="container mx-auto flex items-center justify-between ">
          <Link href="/" className="nav-logo flex items-center gap-3">
            <Avatar className="rounded-lg bg-black text-white text-xl ">
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span className="font-bold text-xl">
              ShopMart
            </span>
          </Link>
          <div className="nav-link flex gap-3">
            <NavigationMenu>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-lg">
                  <Link href="/products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-lg">
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="text-lg">
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
          <div className="nav-actions flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserRound />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/login">
                  <DropdownMenuItem>Login</DropdownMenuItem>
                </Link>
                <Link href="/register">
                  <DropdownMenuItem>Register</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/cart" className="relative">
              <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute bottom-full start-full -translate-x-1/2 translate-y-1/2">
                8
              </Badge>
              <ShoppingCart />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
