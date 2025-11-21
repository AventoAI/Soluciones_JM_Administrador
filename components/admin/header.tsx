"use client"

import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onMenuClick: () => void
  currentView: string
}

const viewTitles: Record<string, string> = {
  dashboard: "Dashboard",
  clients: "Clientes",
  services: "Servicios",
  messages: "Mensajes",
  quotations: "Cotizaciones",
  invoices: "Facturación",
  expenses: "Gastos",
  reports: "Reportes",
  settings: "Ajustes",
}

export function Header({ onMenuClick, currentView }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-8 max-w-full">
      <div className="flex items-center gap-4 min-w-0">
        <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={onMenuClick}>
          <Menu size={20} />
        </Button>
        <h2 className="text-lg sm:text-xl font-semibold text-card-foreground truncate">{viewTitles[currentView]}</h2>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Mi Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Cerrar Sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
