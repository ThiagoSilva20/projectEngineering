"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={cn(
      "fixed w-full top-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className={cn(
          "text-xl font-bold transition-colors",
          isScrolled ? "text-black" : "text-white"
        )}>
          Site Engenharia
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className={cn(
            "transition-colors", 
            isScrolled ? "text-black hover:text-primary" : "text-white hover:text-gray-200"
          )}>
            Início
          </Link>
          <Link href="#portfolio" className={cn(
            "transition-colors", 
            isScrolled ? "text-black hover:text-primary" : "text-white hover:text-gray-200"
          )}>
            Projetos
          </Link>
          <Link href="#engenheiro" className={cn(
            "transition-colors", 
            isScrolled ? "text-black hover:text-primary" : "text-white hover:text-gray-200"
          )}>
            Engenheiro
          </Link>
          <Link href="#contato" className={cn(
            "transition-colors", 
            isScrolled ? "text-black hover:text-primary" : "text-white hover:text-gray-200"
          )}>
            Contato
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={cn(
            "md:hidden transition-colors",
            isScrolled ? "text-black" : "text-white"
          )}
          onClick={toggleMenu}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md p-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-black hover:text-primary transition-colors" onClick={closeMenu}>
                Início
              </Link>
              <Link href="#servico" className="text-black hover:text-primary transition-colors" onClick={closeMenu}>
                Serviços
              </Link>
              <Link href="/projetos" className="text-black hover:text-primary transition-colors" onClick={closeMenu}>
                Projetos
              </Link>
              <Link href="/sobre" className="text-black hover:text-primary transition-colors" onClick={closeMenu}>
                Sobre
              </Link>
              <Link href="/contato" className="text-black hover:text-primary transition-colors" onClick={closeMenu}>
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}