import React, { useState } from "react";
import {
  Menu,
  X,
  User,
  ChevronDown,
  Calendar,
  Phone,
  Info,
  Search,
  Heart,
  ArrowUpCircle,
} from "lucide-react";
import { type SharedData } from "@/types";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth } = usePage<SharedData>().props;
  const isLoggedIn = !!auth.user;

  // Use in-page anchors for smooth home page navigation.
  const navItems = [
    { name: "Find Dentist", href: "#featured-dentists", icon: Search },
    { name: "Book Appointment", href: "#how-it-works", icon: Calendar },
    { name: "About Us", href: "#about", icon: Info },
    { name: "Contact", href: "#contact", icon: Phone },
  ];

  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo1.png"
              alt="ToothTime Logo"
              className="h-12 w-12 rounded-xl"
            />
            <span className="text-2xl font-bold text-gray-600">ToothTime</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 focus:outline-none"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User size={20} />
                  <ChevronDown size={16} className="transition-transform duration-300" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg bg-blue-500 shadow-lg transition-opacity duration-300">
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-white hover:bg-blue-400"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href={auth.user.role === "dentist" ? "/dentists/appointments" : "/myAppointments"}
                      className="block px-4 py-2 text-white hover:bg-blue-400"
                    >
                      My Appointments
                    </Link>
                    <Link
                      href="/logout"
                      className="block px-4 py-2 text-white hover:bg-blue-400"
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md p-4 space-y-4 transition-all duration-300">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} />
                  {item.name}
                </Link>
              );
            })}
            {isLoggedIn ? (
              <>
                <hr className="my-2" />
                <Link
                  href="/dashboard"
                  className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  Dashboard
                </Link>
                <Link
                  href={auth.user.role === "dentist" ? "/dentists/appointments" : "/myAppointments"}
                  className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  My Appointments
                </Link>
                <Link
                  href="/logout"
                  className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <hr className="my-2" />
                <div className="flex flex-col gap-2 p-4">
                  <Link
                    href="/login"
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="w-full px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
