"use client"

import {
  LayoutDashboard,
  Users,
  Wrench,
  MessageSquare,
  FileText,
  Receipt,
  Wallet,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  isOpen: boolean
  onToggle: () => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "services", label: "Servicios", icon: Wrench },
  { id: "messages", label: "Mensajes", icon: MessageSquare },
  { id: "quotations", label: "Cotizaciones", icon: FileText },
  { id: "invoices", label: "Facturación", icon: Receipt },
  { id: "expenses", label: "Gastos", icon: Wallet },
  { id: "reports", label: "Reportes", icon: BarChart3 },
  { id: "settings", label: "Ajustes", icon: Settings },
]

export function Sidebar({ activeView, setActiveView, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onToggle} />}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          isOpen ? "w-64" : "w-20 -translate-x-full lg:translate-x-0",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
          {isOpen && <h1 className="text-xl font-bold text-sidebar-foreground truncate">Tapicería</h1>}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="ml-auto text-sidebar-foreground hover:bg-sidebar-accent shrink-0"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
        </div>

        <nav className="space-y-1 p-3 overflow-y-auto max-h-[calc(100vh-4rem)]">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  !isOpen && "justify-center px-0",
                )}
                onClick={() => setActiveView(item.id)}
              >
                <Icon size={20} className="shrink-0" />
                {isOpen && <span className="truncate">{item.label}</span>}
              </Button>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
