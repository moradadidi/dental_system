import React, { useState } from "react";
import { Menu, X, User, ChevronDown } from "lucide-react";
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth } = usePage<SharedData>().props;
  const isLoggedIn = !!auth.user;

  const navItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Dentists", href: "#dentists" },
    { name: "Appointments", href: "#appointments" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed w-full bg-white shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DentCare
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User size={20} />
                <span>Profile</span>
                <ChevronDown size={16} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 w-48 mt-2 bg-blue-500 rounded-lg shadow-lg">
                  <Link href="/dashboard" className="block px-4 rounded-lg py-2 hover:bg-blue-400">
                    Dashboard
                  </Link>
                  <Link href="/appointments" className="block px-4 rounded-lg py-2 hover:bg-blue-400">
                    My Appointments
                  </Link>
                  <Link href="/logout" className="block px-4 rounded-lg py-2 hover:bg-blue-400">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="block py-2 text-gray-600 hover:text-blue-600"
              >
                Dashboard
              </Link>
              <Link
                href="/appointments"
                className="block py-2 text-gray-600 hover:text-blue-600"
              >
                My Appointments
              </Link>
              <Link
                href="/logout"
                className="block py-2 text-gray-600 hover:text-blue-600"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="block text-center bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}