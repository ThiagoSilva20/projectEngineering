import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "Site Engenharia",
  description: "Site de Engenharia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
        )} 
            > 
        
        {children}
        <Toaster/>
      </body>

    </html>
  );
}
