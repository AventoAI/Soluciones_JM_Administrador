"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MoreVertical, Edit, Trash2 } from "lucide-react"

const servicesData = [
  {
    id: "SRV-001",
    client: "María González",
    type: "Sofá 3 puestos",
    status: "en-proceso",
    receivedDate: "2024-01-10",
    deliveryDate: "2024-01-25",
    price: 450000,
    advance: 200000,
  },
  {
    id: "SRV-002",
    client: "Carlos Pérez",
    type: "Silla comedor (x6)",
    status: "listo",
    receivedDate: "2024-01-12",
    deliveryDate: "2024-01-22",
    price: 380000,
    advance: 380000,
  },
  {
    id: "SRV-003",
    client: "Ana Martínez",
    type: "Tapizado automotriz",
    status: "cotizado",
    receivedDate: "2024-01-15",
    deliveryDate: "2024-01-30",
    price: 520000,
    advance: 0,
  },
]

const statusConfig = {
  nuevo: { label: "Nuevo", color: "bg-blue-500/10 text-blue-500" },
  cotizado: { label: "Cotizado", color: "bg-purple-500/10 text-purple-500" },
  "en-proceso": { label: "En Proceso", color: "bg-yellow-500/10 text-yellow-500" },
  listo: { label: "Listo", color: "bg-green-500/10 text-green-500" },
  entregado: { label: "Entregado", color: "bg-gray-500/10 text-gray-500" },
  cancelado: { label: "Cancelado", color: "bg-red-500/10 text-red-500" },
}

interface Service {
  id: string
  client: string
  type: string
  status: string
  receivedDate: string
  deliveryDate: string
  price: number
  advance: number
}

export function Services() {
  const [services, setServices] = useState<Service[]>(servicesData)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    client: "",
    type: "",
    status: "nuevo",
    receivedDate: "",
    deliveryDate: "",
    price: "",
    advance: "",
  })

  const handleCreate = () => {
    setFormData({
      client: "",
      type: "",
      status: "nuevo",
      receivedDate: "",
      deliveryDate: "",
      price: "",
      advance: "",
    })
    setIsCreateModalOpen(true)
  }

  const handleEdit = (service: Service) => {
    setSelectedService(service)
    setFormData({
      client: service.client,
      type: service.type,
      status: service.status,
      receivedDate: service.receivedDate,
      deliveryDate: service.deliveryDate,
      price: service.price.toString(),
      advance: service.advance.toString(),
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = (service: Service) => {
    setSelectedService(service)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveCreate = () => {
    const newService: Service = {
      id: `SRV-${String(services.length + 1).padStart(3, "0")}`,
      client: formData.client,
      type: formData.type,
      status: formData.status,
      receivedDate: formData.receivedDate,
      deliveryDate: formData.deliveryDate,
      price: Number(formData.price),
      advance: Number(formData.advance),
    }
    setServices([...services, newService])
    setIsCreateModalOpen(false)
  }

  const handleSaveEdit = () => {
    if (!selectedService) return
    setServices(
      services.map((s) =>
        s.id === selectedService.id
          ? {
              ...s,
              client: formData.client,
              type: formData.type,
              status: formData.status,
              receivedDate: formData.receivedDate,
              deliveryDate: formData.deliveryDate,
              price: Number(formData.price),
              advance: Number(formData.advance),
            }
          : s
      )
    )
    setIsEditModalOpen(false)
    setSelectedService(null)
  }

  const handleConfirmDelete = () => {
    if (!selectedService) return
    setServices(services.filter((s) => s.id !== selectedService.id))
    setIsDeleteDialogOpen(false)
    setSelectedService(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button className="gap-2" onClick={handleCreate}>
          <Plus size={16} />
          Nueva Orden de Trabajo
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Tipo de Servicio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Recepción</TableHead>
                  <TableHead>Fecha Entrega</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Anticipo</TableHead>
                  <TableHead className="text-right">Saldo</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => {
                  const status = statusConfig[service.status as keyof typeof statusConfig]
                  return (
                    <TableRow key={service.id}>
                      <TableCell className="font-mono font-medium">{service.id}</TableCell>
                      <TableCell>{service.client}</TableCell>
                      <TableCell>{service.type}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={status.color}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(service.receivedDate).toLocaleDateString("es-CO")}</TableCell>
                      <TableCell>{new Date(service.deliveryDate).toLocaleDateString("es-CO")}</TableCell>
                      <TableCell className="text-right font-medium">${service.price.toLocaleString()}</TableCell>
                      <TableCell className="text-right">${service.advance.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium text-chart-4">
                        ${(service.price - service.advance).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical size={16} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(service)}>
                              <Edit size={16} className="mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(service)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 size={16} className="mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Crear Servicio */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Nueva Orden de Trabajo</DialogTitle>
            <DialogDescription>
              Complete los datos del nuevo servicio
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="client">Cliente</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo de Servicio</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Ej: Sofá 3 puestos"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nuevo">Nuevo</SelectItem>
                  <SelectItem value="cotizado">Cotizado</SelectItem>
                  <SelectItem value="en-proceso">En Proceso</SelectItem>
                  <SelectItem value="listo">Listo</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="receivedDate">Fecha Recepción</Label>
                <Input
                  id="receivedDate"
                  type="date"
                  value={formData.receivedDate}
                  onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deliveryDate">Fecha Entrega</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="advance">Anticipo</Label>
                <Input
                  id="advance"
                  type="number"
                  value={formData.advance}
                  onChange={(e) => setFormData({ ...formData, advance: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCreate}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Servicio */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Orden de Trabajo</DialogTitle>
            <DialogDescription>
              Modifique los datos del servicio
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-client">Cliente</Label>
              <Input
                id="edit-client"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Tipo de Servicio</Label>
              <Input
                id="edit-type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="Ej: Sofá 3 puestos"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nuevo">Nuevo</SelectItem>
                  <SelectItem value="cotizado">Cotizado</SelectItem>
                  <SelectItem value="en-proceso">En Proceso</SelectItem>
                  <SelectItem value="listo">Listo</SelectItem>
                  <SelectItem value="entregado">Entregado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-receivedDate">Fecha Recepción</Label>
                <Input
                  id="edit-receivedDate"
                  type="date"
                  value={formData.receivedDate}
                  onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-deliveryDate">Fecha Entrega</Label>
                <Input
                  id="edit-deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Precio</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-advance">Anticipo</Label>
                <Input
                  id="edit-advance"
                  type="number"
                  value={formData.advance}
                  onChange={(e) => setFormData({ ...formData, advance: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Eliminar Servicio */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la orden de trabajo{" "}
              <strong>{selectedService?.id}</strong> y toda su información asociada.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
