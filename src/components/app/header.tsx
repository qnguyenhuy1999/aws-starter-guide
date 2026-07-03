"use client";

import Link from "next/link";
import { Menu, Search, Cloud } from "lucide-react";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { Button } from "@/components/ui/button";
import { SearchDialog } from "@/components/app/search-dialog";
import { useState } from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 h-16 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))]/95 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background))]/60">
        <div className="flex h-full items-center gap-4 px-4 sm:px-6">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Cloud className="h-6 w-6 text-[hsl(var(--primary))]" />
            <span className="hidden sm:inline">AWS Starter Guide</span>
          </Link>

          <div className="flex-1" />

          {/* Search button */}
          <Button
            variant="outline"
            className="hidden sm:flex items-center gap-2 text-[hsl(var(--muted-foreground))] w-48 justify-start"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4" />
            <span className="text-sm">Tìm kiếm...</span>
            <kbd className="ml-auto text-xs bg-[hsl(var(--muted))] px-1.5 py-0.5 rounded">⌘K</kbd>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>

          <ThemeToggle />
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
