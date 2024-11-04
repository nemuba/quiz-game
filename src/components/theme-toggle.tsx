import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed top-4 left-4 flex items-center">
      <Sun className="mr-2 h-4 w-4" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon className="ml-2 h-4 w-4" />
    </div>
  )
}
