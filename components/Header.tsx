"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import WalletConnect from "@/components/WalletConnect";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Award, Home, PenSquare, Vote } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold mr-8">
            ContributionHub
          </Link>
          
          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/submit" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <PenSquare className="h-4 w-4 mr-2" />
                    Submit
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/vote" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <Vote className="h-4 w-4 mr-2" />
                    Vote
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>More</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/profile"
                          className="flex items-center p-2 hover:bg-accent rounded-md"
                        >
                          <Award className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Profile</div>
                            <p className="text-sm text-muted-foreground">
                              View your reputation
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/leaderboard"
                          className="flex items-center p-2 hover:bg-accent rounded-md"
                        >
                          <Award className="h-4 w-4 mr-2" />
                          <div>
                            <div className="font-medium">Leaderboard</div>
                            <p className="text-sm text-muted-foreground">
                              Top contributors
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <WalletConnect />
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                <Link 
                  href="/" 
                  className="flex items-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Link>
                <Link 
                  href="/submit" 
                  className="flex items-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <PenSquare className="h-4 w-4 mr-2" />
                  Submit
                </Link>
                <Link 
                  href="/vote" 
                  className="flex items-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Vote className="h-4 w-4 mr-2" />
                  Vote
                </Link>
                <Link 
                  href="/profile" 
                  className="flex items-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Profile
                </Link>
                <Link 
                  href="/leaderboard" 
                  className="flex items-center py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Award className="h-4 w-4 mr-2" />
                  Leaderboard
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}