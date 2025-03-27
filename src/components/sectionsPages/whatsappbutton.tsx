"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

export function Whatsappbutton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);

      // Show tooltip after 2 seconds
      const tooltipTimer = setTimeout(() => {
        setIsTooltipVisible(true);

        // Hide tooltip after 5 seconds
        const hideTooltipTimer = setTimeout(() => {
          setIsTooltipVisible(false);
        }, 5000);

        return () => clearTimeout(hideTooltipTimer);
      }, 2000);

      return () => clearTimeout(tooltipTimer);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn( "fixed bottom-6 right-6 z-50 transition-all duration-500 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      {isTooltipVisible && (
        <div className="absolute bottom-full right-0 mb-3 p-4 bg-white rounded-lg shadow-lg w-[300px] animate-fade-in">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => setIsTooltipVisible(false)}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Fechar</span>
          </Button>
          <p className="text-gray-800 font-medium mb-2">Precisa de ajuda?</p>
          <p className="text-gray-600 text-sm">
            Estamos online para tirar suas dúvidas sobre nossos serviços de
            engenharia. Entre em contato conosco pelo WhatsApp.
          </p>
        </div>
      )}

      <Button asChild className="size-14 rounded-full bg-green-600 hover:bg-green-700v animate-bounce">
        <Link
          href="https://wa.me/5521993392724"
          target="_blank"
          className="flex items-center justify-center"
        >
          <FaWhatsapp className="size-14 text-white" />
        </Link>
      </Button>
    </div>
  );
}
