# 🪑 Panel de Administración - Tapicería

Sistema de gestión administrativo para talleres de tapicería, desarrollado con Next.js, React y TypeScript. Permite gestionar clientes, servicios, cotizaciones, facturas, gastos y mensajes de manera eficiente.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Iniciar el Proyecto](#-iniciar-el-proyecto)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Componentes Principales](#-componentes-principales)
- [Funcionalidades CRUD](#-funcionalidades-crud)
- [Scripts Disponibles](#-scripts-disponibles)
- [Configuración](#-configuración)

## ✨ Características

- 📊 **Dashboard Interactivo**: Visualización de métricas clave, gráficos de ingresos/gastos y actividad reciente
- 👥 **Gestión de Clientes**: CRUD completo para administrar información de clientes
- 🔧 **Gestión de Servicios**: Control de órdenes de trabajo con estados y seguimiento
- 📄 **Cotizaciones**: Creación y gestión de cotizaciones con estados y fechas de validez
- 💰 **Facturación**: Sistema completo de facturas con estados de pago
- 💸 **Control de Gastos**: Registro y categorización de gastos operativos
- 💬 **Mensajes**: Gestión de mensajes de clientes con imágenes adjuntas
- 📈 **Reportes**: Visualización de reportes y estadísticas
- ⚙️ **Configuración**: Panel de ajustes del sistema
- 🎨 **UI Moderna**: Interfaz responsive con diseño moderno y componentes reutilizables

## 🛠 Tecnologías

### Frontend
- **Next.js 16** - Framework React con App Router
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Framework de estilos
- **Radix UI** - Componentes accesibles sin estilos
- **Recharts** - Gráficos y visualizaciones
- **Lucide React** - Iconos
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

### Herramientas de Desarrollo
- **ESLint** - Linter para JavaScript/TypeScript
- **PostCSS** - Procesador de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 📦 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.x o superior
- **npm**, **yarn** o **pnpm** (gestor de paquetes)

Puedes verificar las versiones instaladas:

```bash
node --version
npm --version
```

## 🚀 Instalación

1. **Clonar el repositorio** (si aplica):
```bash
git clone <url-del-repositorio>
cd tapiceria_panel_admin
```

2. **Instalar dependencias**:
```bash
npm install
# o
yarn install
# o
pnpm install
```

## ▶️ Iniciar el Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

El proyecto estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo Producción

1. **Construir el proyecto**:
```bash
npm run build
# o
yarn build
# o
pnpm build
```

2. **Iniciar el servidor de producción**:
```bash
npm start
# o
yarn start
# o
pnpm start
```

### Linting

Para verificar el código con ESLint:

```bash
npm run lint
# o
yarn lint
# o
pnpm lint
```

## 📁 Estructura del Proyecto

```
tapiceria_panel_admin/
├── app/                      # App Router de Next.js
│   ├── globals.css          # Estilos globales
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal (Panel Admin)
│
├── components/              # Componentes React
│   ├── admin/               # Componentes del panel administrativo
│   │   ├── clients.tsx      # Gestión de clientes
│   │   ├── dashboard.tsx    # Dashboard principal
│   │   ├── expenses.tsx     # Gestión de gastos
│   │   ├── header.tsx       # Encabezado del panel
│   │   ├── invoices.tsx      # Gestión de facturas
│   │   ├── messages.tsx     # Gestión de mensajes
│   │   ├── quotations.tsx   # Gestión de cotizaciones
│   │   ├── reports.tsx      # Reportes
│   │   ├── services.tsx    # Gestión de servicios
│   │   ├── settings.tsx    # Configuración
│   │   └── sidebar.tsx     # Barra lateral de navegación
│   │
│   ├── theme-provider.tsx   # Proveedor de tema (dark/light)
│   │
│   └── ui/                  # Componentes UI reutilizables
│       ├── button.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── table.tsx
│       ├── select.tsx
│       └── ... (más componentes)
│
├── hooks/                   # Custom hooks
│   ├── use-mobile.ts
│   └── use-toast.ts
│
├── lib/                     # Utilidades y helpers
│   └── utils.ts             # Funciones utilitarias
│
├── public/                  # Archivos estáticos
│   ├── icon.svg
│   ├── placeholder-*.jpg
│   └── ...
│
├── styles/                  # Estilos adicionales
│   └── globals.css
│
├── components.json          # Configuración de shadcn/ui
├── next.config.mjs          # Configuración de Next.js
├── package.json             # Dependencias y scripts
├── postcss.config.mjs       # Configuración de PostCSS
└── tsconfig.json            # Configuración de TypeScript
```

## 🧩 Componentes Principales

### Componentes Administrativos

#### Dashboard (`components/admin/dashboard.tsx`)
- Métricas principales (clientes, servicios, ingresos, gastos)
- Gráficos de ingresos vs gastos
- Gráfico de servicios por categoría
- Actividad reciente
- Accesos rápidos a funciones principales

#### Clients (`components/admin/clients.tsx`)
- Listado de clientes con búsqueda
- Crear, editar y eliminar clientes
- Información: nombre, teléfono, email, ciudad
- Historial de servicios y montos

#### Services (`components/admin/services.tsx`)
- Gestión de órdenes de trabajo
- Estados: Nuevo, Cotizado, En Proceso, Listo, Entregado, Cancelado
- Control de fechas de recepción y entrega
- Gestión de precios y anticipos

#### Quotations (`components/admin/quotations.tsx`)
- Creación y gestión de cotizaciones
- Estados: Borrador, Enviada, Aprobada, Rechazada
- Fechas de validez
- Generación de PDF y envío

#### Invoices (`components/admin/invoices.tsx`)
- Gestión de facturas
- Estados: Borrador, Emitida, Pagada, Anulada
- Control de fechas de pago
- Generación de PDF

#### Expenses (`components/admin/expenses.tsx`)
- Registro de gastos
- Categorías: Materiales, Transporte, Arriendo, Servicios Públicos, Otros
- Filtrado por categoría
- Control de proveedores

#### Messages (`components/admin/messages.tsx`)
- Gestión de mensajes de clientes
- Visualización de imágenes adjuntas
- Estados: Nuevo, Seguimiento, Atendido
- Integración con WhatsApp y Email

## 🔄 Funcionalidades CRUD

Todas las vistas principales incluyen operaciones CRUD completas:

### Crear
- Modales con formularios completos
- Validación de campos
- Confirmación de creación

### Editar
- Modales prellenados con datos existentes
- Actualización de información
- Validación de cambios

### Eliminar
- Diálogos de confirmación
- Advertencia de acción irreversible
- Eliminación segura

### Implementación
- **Dialog** (Radix UI) para crear/editar
- **AlertDialog** (Radix UI) para confirmar eliminación
- Estado local con `useState` para gestión de datos
- Formularios con validación básica

## 📜 Scripts Disponibles

```json
{
  "dev": "next dev",        // Inicia servidor de desarrollo
  "build": "next build",    // Construye para producción
  "start": "next start",    // Inicia servidor de producción
  "lint": "eslint ."        // Ejecuta el linter
}
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto para variables de entorno (si es necesario):

```env
# Ejemplo de variables de entorno
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### TypeScript

El proyecto está configurado con TypeScript en modo estricto. La configuración se encuentra en `tsconfig.json`.

### Tailwind CSS

Los estilos se gestionan con Tailwind CSS 4. La configuración está en `postcss.config.mjs`.

### Next.js

La configuración de Next.js está en `next.config.mjs`:
- TypeScript: errores de build ignorados (para desarrollo)
- Imágenes: sin optimización (configurable)

## 🎨 Sistema de Diseño

El proyecto utiliza un sistema de componentes basado en:
- **Radix UI**: Componentes accesibles y sin estilos
- **Tailwind CSS**: Utilidades de estilo
- **shadcn/ui**: Patrón de componentes (configurado en `components.json`)

### Tema

El proyecto incluye soporte para temas claro/oscuro mediante `next-themes`.

## 📝 Notas de Desarrollo

- Los datos actualmente se gestionan con estado local (`useState`)
- Para producción, se recomienda integrar con una API backend
- Los componentes están diseñados para ser fácilmente conectables a un backend

## 🔜 Próximos Pasos

- [ ] Integración con API backend
- [ ] Autenticación y autorización
- [ ] Persistencia de datos (base de datos)
- [ ] Exportación de reportes a PDF/Excel
- [ ] Notificaciones en tiempo real
- [ ] Búsqueda avanzada y filtros
- [ ] Paginación en tablas grandes
- [ ] Modo offline

## 📄 Licencia

Este proyecto es privado.

## 👥 Contribución

Para contribuir al proyecto, por favor:
1. Crea una rama para tu feature
2. Realiza tus cambios
3. Envía un pull request

---

**Desarrollado con ❤️ para talleres de tapicería**

