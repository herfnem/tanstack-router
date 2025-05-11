import { Moon, Sun, Laptop } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure hydration mismatch doesn't occur
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden rounded-full border-2 hover:border-primary hover:bg-primary/10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
        >
          <Sun
            className={cn(
              "h-[1.3rem] w-[1.3rem] transition-all duration-500",
              theme !== "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
            )}
          />
          <Moon
            className={cn(
              "absolute h-[1.3rem] w-[1.3rem] transition-all duration-500",
              theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="backdrop-blur-md bg-background/90 border-2 rounded-xl shadow-lg animate-in slide-in-from-top-5 fade-in-50 duration-300"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "flex items-center gap-2 transition-colors cursor-pointer",
            theme === "light" ? "bg-primary/10 font-medium" : ""
          )}
        >
          <Sun className="h-4 w-4" /> Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "flex items-center gap-2 transition-colors cursor-pointer",
            theme === "dark" ? "bg-primary/10 font-medium" : ""
          )}
        >
          <Moon className="h-4 w-4" /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex items-center gap-2 transition-colors cursor-pointer",
            theme === "system" ? "bg-primary/10 font-medium" : ""
          )}
        >
          <Laptop className="h-4 w-4" /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
