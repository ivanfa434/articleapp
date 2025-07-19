"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, LogOut, Search, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface JumbotronProps {
  searchQuery: string;
  selectedCategoryId: string;
  categoriesData: any;
  isLoadingCategories: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCategoryChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const Jumbotron: React.FC<JumbotronProps> = ({
  searchQuery,
  selectedCategoryId,
  categoriesData,
  isLoadingCategories,
  onSearchChange,
  onCategoryChange,
  onClearFilters,
  hasActiveFilters,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logout = () => {
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section
        className="relative bg-blue-600 text-white py-20 bg-cover bg-center"
        style={{ backgroundImage: 'url("/background.jpg")' }}
      >
        <div className="absolute inset-0 bg-blue-900 opacity-60 z-0"></div>

        <div className="absolute top-6 left-6 flex items-center z-10">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </div>

        <div className="absolute top-6 right-6 z-20" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDropdownOpen(!isDropdownOpen);
            }}
            type="button"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
              {session?.user?.username?.charAt(0).toUpperCase() || "J"}
            </div>
            <span className="underline">
              {session?.user?.username || "James Dean"}
            </span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-900 z-30 border">
              {session?.user?.role && (
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-200 mb-2">
                  Role:{" "}
                  <span className="font-semibold">{session.user.role}</span>
                </div>
              )}
              <button
                onClick={() => logout()}
                className="px-4 py-2 w-full text-sm text-left hover:bg-gray-100 flex items-center gap-2"
                type="button"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="relative z-10 text-center container mx-auto px-4">
          <h4 className="text-lg mb-4 font-semibold">Blog genzet</h4>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
            The Journal : Design Resources,
            <br /> Interviews, and Industry News
          </h1>
          <p className="text-lg mb-8">Your daily dose of design insights!</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="flex flex-col md:flex-row justify-center gap-4 max-w-4xl mx-auto">
            <div className="rounded-lg relative z-50">
              <Select
                value={selectedCategoryId || "all"}
                onValueChange={onCategoryChange}
                disabled={isLoadingCategories}
              >
                <SelectTrigger className="w-full md:w-48 bg-white text-gray-900 border border-gray-300 shadow-sm relative z-50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="z-[9999] bg-white border border-gray-300 shadow-lg">
                  <SelectItem
                    value="all"
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    All Categories
                  </SelectItem>
                  {categoriesData?.data
                    ?.filter((cat: { id: string }) => cat.id !== "")
                    .map((cat: { id: string; name: string }) => (
                      <SelectItem
                        key={cat.id}
                        value={cat.id}
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {cat.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full md:w-80 rounded-lg z-40">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={onSearchChange}
                className="pl-10 bg-white text-gray-900 border border-gray-300 shadow-sm"
              />
            </div>

            {hasActiveFilters && (
              <Button
                onClick={onClearFilters}
                variant="outline"
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 shadow-sm z-40"
              >
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jumbotron;
