"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MessageSquare, Mail, ImageIcon } from "lucide-react"
import { useState } from "react"

const messagesData = [
  {
    id: 1,
    name: "Laura Rodríguez",
    email: "laura@email.com",
    phone: "+57 300 111 2222",
    message: "Necesito cotización para tapizar un juego de sala completo",
    images: ["/worn-beige-sofa-needs-reupholstery.jpg", "/damaged-armchair-cushion-close-up.jpg"],
    date: "2024-01-20 14:30",
    status: "nuevo",
    tags: ["presupuesto"],
  },
  {
    id: 2,
    name: "Jorge Ramírez",
    email: "jorge@email.com",
    phone: "+57 310 222 3333",
    message: "¿Cuánto tiempo tarda el servicio de tapizado de sillas?",
    images: ["/dining-chair-with-torn-fabric.jpg"],
    date: "2024-01-20 10:15",
    status: "seguimiento",
    tags: ["presupuesto"],
  },
  {
    id: 3,
    name: "Patricia Gómez",
    email: "patricia@email.com",
    phone: "+57 320 333 4444",
    message: "Muy contenta con el servicio, gracias",
    images: [],
    date: "2024-01-19 16:45",
    status: "atendido",
    tags: ["posventa"],
  },
]

const statusConfig = {
  nuevo: { label: "Nuevo", color: "bg-blue-500/10 text-blue-500" },
  seguimiento: { label: "Seguimiento", color: "bg-yellow-500/10 text-yellow-500" },
  atendido: { label: "Atendido", color: "bg-green-500/10 text-green-500" },
}

function ImageGallery({ images, onClose }: { images: string[]; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={onClose}>
      <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        <Button size="sm" variant="outline" className="absolute top-2 right-2 z-10 bg-background" onClick={onClose}>
          Cerrar
        </Button>
        <img
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`Foto ${currentIndex + 1}`}
          className="w-full h-auto rounded-lg"
        />
        {images.length > 1 && (
          <div className="flex gap-2 justify-center mt-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full ${idx === currentIndex ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function Messages() {
  const [selectedImages, setSelectedImages] = useState<string[] | null>(null)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead>Mensaje</TableHead>
                  <TableHead>Imágenes</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Etiquetas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messagesData.map((msg) => {
                  const status = statusConfig[msg.status as keyof typeof statusConfig]
                  return (
                    <TableRow key={msg.id}>
                      <TableCell className="font-medium">{msg.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{msg.phone}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[150px]">{msg.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate">{msg.message}</p>
                      </TableCell>
                      <TableCell>
                        {msg.images.length > 0 ? (
                          <button
                            onClick={() => setSelectedImages(msg.images)}
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ImageIcon size={16} />
                            {msg.images.length} foto{msg.images.length > 1 ? "s" : ""}
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground">Sin fotos</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">{msg.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={status.color}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {msg.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 bg-transparent"
                            onClick={() => window.open(`https://wa.me/${msg.phone.replace(/\D/g, "")}`)}
                          >
                            <MessageSquare size={14} />
                            WhatsApp
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 bg-transparent"
                            onClick={() => window.open(`mailto:${msg.email}`)}
                          >
                            <Mail size={14} />
                            Email
                          </Button>
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

      {selectedImages && <ImageGallery images={selectedImages} onClose={() => setSelectedImages(null)} />}
    </div>
  )
}
