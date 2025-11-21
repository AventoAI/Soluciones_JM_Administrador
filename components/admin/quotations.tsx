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
import { Plus, FileText, Send, MoreVertical, Edit, Trash2 } from "lucide-react"

const quotationsData = [
  {
    id: "COT-2024-001",
    client: "María González",
    date: "2024-01-18",
    items: 3,
    total: 450000,
    status: "enviada",
    validUntil: "2024-02-01",
  },
  {
    id: "COT-2024-002",
    client: "Carlos Pérez",
    date: "2024-01-19",
    items: 2,
    total: 320000,
    status: "aprobada",
    validUntil: "2024-02-02",
  },
  {
    id: "COT-2024-003",
    client: "Ana Martínez",
    date: "2024-01-20",
    items: 1,
    total: 520000,
    status: "borrador",
    validUntil: "2024-02-03",
  },
]

const statusConfig = {
  borrador: { label: "Borrador", color: "bg-gray-500/10 text-gray-500" },
  enviada: { label: "Enviada", color: "bg-blue-500/10 text-blue-500" },
  aprobada: { label: "Aprobada", color: "bg-green-500/10 text-green-500" },
  rechazada: { label: "Rechazada", color: "bg-red-500/10 text-red-500" },
}

interface Quotation {
  id: string
  client: string
  date: string
  items: number
  total: number
  status: string
  validUntil: string
}

export function Quotations() {
  const [quotations, setQuotations] = useState<Quotation[]>(quotationsData)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null)
  const [formData, setFormData] = useState({
    client: "",
    date: "",
    items: "",
    total: "",
    status: "borrador",
    validUntil: "",
  })

  const handleCreate = () => {
    const today = new Date()
    const validUntil = new Date(today)
    validUntil.setDate(validUntil.getDate() + 15)
    
    setFormData({
      client: "",
      date: today.toISOString().split("T")[0],
      items: "",
      total: "",
      status: "borrador",
      validUntil: validUntil.toISOString().split("T")[0],
    })
    setIsCreateModalOpen(true)
  }

  const handleEdit = (quotation: Quotation) => {
    setSelectedQuotation(quotation)
    setFormData({
      client: quotation.client,
      date: quotation.date,
      items: quotation.items.toString(),
      total: quotation.total.toString(),
      status: quotation.status,
      validUntil: quotation.validUntil,
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = (quotation: Quotation) => {
    setSelectedQuotation(quotation)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveCreate = () => {
    const newQuotation: Quotation = {
      id: `COT-${new Date().getFullYear()}-${String(quotations.length + 1).padStart(3, "0")}`,
      client: formData.client,
      date: formData.date,
      items: Number(formData.items),
      total: Number(formData.total),
      status: formData.status,
      validUntil: formData.validUntil,
    }
    setQuotations([...quotations, newQuotation])
    setIsCreateModalOpen(false)
  }

  const handleSaveEdit = () => {
    if (!selectedQuotation) return
    setQuotations(
      quotations.map((q) =>
        q.id === selectedQuotation.id
          ? {
              ...q,
              client: formData.client,
              date: formData.date,
              items: Number(formData.items),
              total: Number(formData.total),
              status: formData.status,
              validUntil: formData.validUntil,
            }
          : q
      )
    )
    setIsEditModalOpen(false)
    setSelectedQuotation(null)
  }

  const handleConfirmDelete = () => {
    if (!selectedQuotation) return
    setQuotations(quotations.filter((q) => q.id !== selectedQuotation.id))
    setIsDeleteDialogOpen(false)
    setSelectedQuotation(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button className="gap-2" onClick={handleCreate}>
          <Plus size={16} />
          Nueva Cotización
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
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Items</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Válida Hasta</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quotations.map((quote) => {
                  const status = statusConfig[quote.status as keyof typeof statusConfig]
                  return (
                    <TableRow key={quote.id}>
                      <TableCell className="font-mono font-medium">{quote.id}</TableCell>
                      <TableCell>{quote.client}</TableCell>
                      <TableCell>{new Date(quote.date).toLocaleDateString("es-CO")}</TableCell>
                      <TableCell className="text-right">{quote.items}</TableCell>
                      <TableCell className="text-right font-medium">${quote.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={status.color}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(quote.validUntil).toLocaleDateString("es-CO")}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                            <FileText size={14} />
                            PDF
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                            <Send size={14} />
                            Enviar
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical size={14} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleEdit(quote)}>
                                <Edit size={16} className="mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(quote)}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 size={16} className="mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Crear Cotización */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Cotización</DialogTitle>
            <DialogDescription>
              Complete los datos de la nueva cotización
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Fecha</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validUntil">Válida Hasta</Label>
                <Input
                  id="validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="items">Items</Label>
                <Input
                  id="items"
                  type="number"
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="total">Total</Label>
                <Input
                  id="total"
                  type="number"
                  value={formData.total}
                  onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="enviada">Enviada</SelectItem>
                  <SelectItem value="aprobada">Aprobada</SelectItem>
                  <SelectItem value="rechazada">Rechazada</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Modal Editar Cotización */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Cotización</DialogTitle>
            <DialogDescription>
              Modifique los datos de la cotización
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-date">Fecha</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-validUntil">Válida Hasta</Label>
                <Input
                  id="edit-validUntil"
                  type="date"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-items">Items</Label>
                <Input
                  id="edit-items"
                  type="number"
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-total">Total</Label>
                <Input
                  id="edit-total"
                  type="number"
                  value={formData.total}
                  onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="enviada">Enviada</SelectItem>
                  <SelectItem value="aprobada">Aprobada</SelectItem>
                  <SelectItem value="rechazada">Rechazada</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Dialog Eliminar Cotización */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la cotización{" "}
              <strong>{selectedQuotation?.id}</strong> y toda su información asociada.
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
