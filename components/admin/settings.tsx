"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"

export function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Datos del Negocio</CardTitle>
          <CardDescription>Información general que aparecerá en cotizaciones y facturas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del Negocio</Label>
              <Input id="businessName" placeholder="Tapicería El Maestro" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nit">NIT / RUT</Label>
              <Input id="nit" placeholder="900.123.456-7" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input id="address" placeholder="Calle 123 #45-67" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" placeholder="+57 300 123 4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="contacto@tapiceria.com" />
            </div>
          </div>

          <Button className="gap-2">
            <Save size={16} />
            Guardar Cambios
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Configuración de Impuestos</CardTitle>
          <CardDescription>Define los impuestos que se aplicarán automáticamente</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="iva">IVA (%)</Label>
              <Input id="iva" type="number" placeholder="19" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention">Retención (%)</Label>
              <Input id="retention" type="number" placeholder="0" />
            </div>
          </div>

          <Button className="gap-2">
            <Save size={16} />
            Guardar Impuestos
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Numeración de Documentos</CardTitle>
          <CardDescription>Configura los consecutivos para cotizaciones y facturas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quotePrefix">Prefijo Cotizaciones</Label>
              <Input id="quotePrefix" placeholder="COT" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quoteNext">Siguiente Número</Label>
              <Input id="quoteNext" type="number" placeholder="1" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoicePrefix">Prefijo Facturas</Label>
              <Input id="invoicePrefix" placeholder="FAC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceNext">Siguiente Número</Label>
              <Input id="invoiceNext" type="number" placeholder="1" />
            </div>
          </div>

          <Button className="gap-2">
            <Save size={16} />
            Guardar Numeración
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Términos y Condiciones</CardTitle>
          <CardDescription>Texto que aparecerá al pie de las cotizaciones y facturas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="terms">Términos y Condiciones</Label>
            <Textarea id="terms" placeholder="Ingrese los términos y condiciones..." rows={6} />
          </div>

          <Button className="gap-2">
            <Save size={16} />
            Guardar Términos
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
