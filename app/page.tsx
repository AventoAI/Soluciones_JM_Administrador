"use client"

import { useState } from "react"
import { Sidebar } from "@/components/admin/sidebar"
import { Header } from "@/components/admin/header"
import { Dashboard } from "@/components/admin/dashboard"
import { Clients } from "@/components/admin/clients"
import { Services } from "@/components/admin/services"
import { Messages } from "@/components/admin/messages"
import { Quotations } from "@/components/admin/quotations"
import { Invoices } from "@/components/admin/invoices"
import { Expenses } from "@/components/admin/expenses"
import { Reports } from "@/components/admin/reports"
import { Settings } from "@/components/admin/settings"

export default function AdminPanel() {
  const [activeView, setActiveView] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard setActiveView={setActiveView} />
      case "clients":
        return <Clients />
      case "services":
        return <Services />
      case "messages":
        return <Messages />
      case "quotations":
        return <Quotations />
      case "invoices":
        return <Invoices />
      case "expenses":
        return <Expenses />
      case "reports":
        return <Reports />
      case "settings":
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"} min-h-screen`}>
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} currentView={activeView} />
        <main className="p-4 sm:p-6 lg:p-8 max-w-[100vw] overflow-x-hidden">{renderView()}</main>
      </div>
    </div>
  )
}
