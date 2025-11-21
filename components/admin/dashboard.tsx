"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Wrench, DollarSign, TrendingUp, TrendingDown, FileText, Plus } from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Legend,
} from "recharts"

const revenueData = [
  { month: "Ene", ingresos: 45000, gastos: 28000 },
  { month: "Feb", ingresos: 52000, gastos: 31000 },
  { month: "Mar", ingresos: 48000, gastos: 29000 },
  { month: "Abr", ingresos: 61000, gastos: 35000 },
  { month: "May", ingresos: 55000, gastos: 32000 },
  { month: "Jun", ingresos: 67000, gastos: 38000 },
]

const servicesData = [
  { name: "Sillas", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Sofás", value: 28, color: "hsl(var(--chart-2))" },
  { name: "Automotriz", value: 22, color: "hsl(var(--chart-3))" },
  { name: "Otros", value: 15, color: "hsl(var(--chart-4))" },
]

const weeklyServices = [
  { day: "Lun", servicios: 8 },
  { day: "Mar", servicios: 12 },
  { day: "Mié", servicios: 10 },
  { day: "Jue", servicios: 15 },
  { day: "Vie", servicios: 9 },
  { day: "Sáb", servicios: 14 },
  { day: "Dom", servicios: 5 },
]

const recentActivity = [
  { type: "quote", client: "María González", action: "Nueva cotización", time: "Hace 5 min" },
  { type: "service", client: "Carlos Pérez", action: "Servicio completado", time: "Hace 23 min" },
  { type: "message", client: "Ana Martínez", action: "Nuevo mensaje", time: "Hace 1 hora" },
  { type: "invoice", client: "Roberto Silva", action: "Factura pagada", time: "Hace 2 horas" },
]

interface DashboardProps {
  setActiveView?: (view: string) => void
}

export function Dashboard({ setActiveView }: DashboardProps) {
  return (
    <div className="space-y-6 max-w-full">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">284</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-3 shrink-0" />
              <span className="truncate">+12% del mes anterior</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Servicios Semanales</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-3 shrink-0" />
              <span className="truncate">+8% esta semana</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Servicios Mensuales</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">298</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-3 shrink-0" />
              <span className="truncate">+15% este mes</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Ingresos del Mes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-3 shrink-0" />
              <span className="truncate">+22% vs mes anterior</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Gastos del Mes</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$38,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-destructive shrink-0" />
              <span className="truncate">+9% vs mes anterior</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Utilidad del Mes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">$29,000</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-chart-3 shrink-0" />
              <span className="truncate">43.3% margen</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Ingresos vs Gastos</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minWidth={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="ingresos" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gastos" fill="hsl(var(--chart-5))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Servicios por Categoría</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minWidth={300}>
              <PieChart>
                <Pie
                  data={servicesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {servicesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader>
            <CardTitle>Servicios Esta Semana</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minWidth={300}>
              <AreaChart data={weeklyServices}>
                <defs>
                  <linearGradient id="colorServicios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="servicios"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorServicios)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{activity.client}</p>
                      <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Accesos Rápidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                className="h-20 flex-col gap-2 bg-transparent" 
                variant="outline"
                onClick={() => setActiveView?.("quotations")}
              >
                <Plus className="h-5 w-5 shrink-0" />
                <span className="text-sm text-center">Nueva Cotización</span>
              </Button>
              <Button 
                className="h-20 flex-col gap-2 bg-transparent" 
                variant="outline"
                onClick={() => setActiveView?.("services")}
              >
                <Plus className="h-5 w-5 shrink-0" />
                <span className="text-sm text-center">Nuevo Servicio</span>
              </Button>
              <Button 
                className="h-20 flex-col gap-2 bg-transparent" 
                variant="outline"
                onClick={() => setActiveView?.("expenses")}
              >
                <Plus className="h-5 w-5 shrink-0" />
                <span className="text-sm text-center">Registrar Gasto</span>
              </Button>
              <Button 
                className="h-20 flex-col gap-2 bg-transparent" 
                variant="outline"
                onClick={() => setActiveView?.("invoices")}
              >
                <Plus className="h-5 w-5 shrink-0" />
                <span className="text-sm text-center">Crear Factura</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
