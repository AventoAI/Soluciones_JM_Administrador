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

const invoicesData = [
  {
    id: "FAC-2024-001",
    client: "María González",
    date: "2024-01-15",
    total: 450000,
    status: "pagada",
    paymentDate: "2024-01-16",
  },
  {
    id: "FAC-2024-002",
    client: "Carlos Pérez",
    date: "2024-01-18",
    total: 320000,
    status: "emitida",
    paymentDate: null,
  },
  {
    id: "FAC-2024-003",
    client: "Ana Martínez",
    date: "2024-01-20",
    total: 520000,
    status: "borrador",
    paymentDate: null,
  },
]

const statusConfig = {
  borrador: { label: "Borrador", color: "bg-gray-500/10 text-gray-500" },
  emitida: { label: "Emitida", color: "bg-blue-500/10 text-blue-500" },
  pagada: { label: "Pagada", color: "bg-green-500/10 text-green-500" },
  anulada: { label: "Anulada", color: "bg-red-500/10 text-red-500" },
}

interface Invoice {
  id: string
  client: string
  date: string
  total: number
  status: string
  paymentDate: string | null
}

export function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>(invoicesData)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [formData, setFormData] = useState({
    client: "",
    date: "",
    total: "",
    status: "borrador",
    paymentDate: "",
  })

  const handleCreate = () => {
    setFormData({
      client: "",
      date: new Date().toISOString().split("T")[0],
      total: "",
      status: "borrador",
      paymentDate: "",
    })
    setIsCreateModalOpen(true)
  }

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setFormData({
      client: invoice.client,
      date: invoice.date,
      total: invoice.total.toString(),
      status: invoice.status,
      paymentDate: invoice.paymentDate || "",
    })
    setIsEditModalOpen(true)
  }

  const handleDelete = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsDeleteDialogOpen(true)
  }

  const handleSaveCreate = () => {
    const newInvoice: Invoice = {
      id: `FAC-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(3, "0")}`,
      client: formData.client,
      date: formData.date,
      total: Number(formData.total),
      status: formData.status,
      paymentDate: formData.paymentDate || null,
    }
    setInvoices([...invoices, newInvoice])
    setIsCreateModalOpen(false)
  }

  const handleSaveEdit = () => {
    if (!selectedInvoice) return
    setInvoices(
      invoices.map((i) =>
        i.id === selectedInvoice.id
          ? {
              ...i,
              client: formData.client,
              date: formData.date,
              total: Number(formData.total),
              status: formData.status,
              paymentDate: formData.paymentDate || null,
            }
          : i
      )
    )
    setIsEditModalOpen(false)
    setSelectedInvoice(null)
  }

  const handleConfirmDelete = () => {
    if (!selectedInvoice) return
    setInvoices(invoices.filter((i) => i.id !== selectedInvoice.id))
    setIsDeleteDialogOpen(false)
    setSelectedInvoice(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button className="gap-2" onClick={handleCreate}>
          <Plus size={16} />
          Nueva Factura
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
                  <TableHead>Fecha Emisión</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha Pago</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => {
                  const status = statusConfig[invoice.status as keyof typeof statusConfig]
                  return (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.client}</TableCell>
                      <TableCell>{new Date(invoice.date).toLocaleDateString("es-CO")}</TableCell>
                      <TableCell className="text-right font-medium">${invoice.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={status.color}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {invoice.paymentDate ? new Date(invoice.paymentDate).toLocaleDateString("es-CO") : "-"}
                      </TableCell>
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
                              <DropdownMenuItem onClick={() => handleEdit(invoice)}>
                                <Edit size={16} className="mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDelete(invoice)}
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

      {/* Modal Crear Factura */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nueva Factura</DialogTitle>
            <DialogDescription>
              Complete los datos de la nueva factura
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
              <Label htmlFor="date">Fecha Emisión</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
            <div className="grid gap-2">
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="emitida">Emitida</SelectItem>
                  <SelectItem value="pagada">Pagada</SelectItem>
                  <SelectItem value="anulada">Anulada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.status === "pagada" && (
              <div className="grid gap-2">
                <Label htmlFor="paymentDate">Fecha de Pago</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveCreate}>Guardar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Factura */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Factura</DialogTitle>
            <DialogDescription>
              Modifique los datos de la factura
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
              <Label htmlFor="edit-date">Fecha Emisión</Label>
              <Input
                id="edit-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Estado</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="emitida">Emitida</SelectItem>
                  <SelectItem value="pagada">Pagada</SelectItem>
                  <SelectItem value="anulada">Anulada</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.status === "pagada" && (
              <div className="grid gap-2">
                <Label htmlFor="edit-paymentDate">Fecha de Pago</Label>
                <Input
                  id="edit-paymentDate"
                  type="date"
                  value={formData.paymentDate}
                  onChange={(e) => setFormData({ ...formData, paymentDate: e.target.value })}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Guardar Cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Eliminar Factura */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente la factura{" "}
              <strong>{selectedInvoice?.id}</strong> y toda su información asociada.
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
