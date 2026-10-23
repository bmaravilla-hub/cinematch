# 🎬 CineMatch — Frontend Cinematográfico Interactivo

> **Universidad Don Bosco — Facultad de Ingeniería**  
> **Asignatura:** Programación con Estructuras de Datos (PED941) — Grupo G01T  
> **Docente:** Ing. Carmen Celia Morales Samayoa  
> **Fase II: Avance Funcional — Frontend Integrado con Backend REST**  
> **Calificación Fase I:** 10.0 / 10.0  

---

## 👥 Equipo de Desarrollo

| Integrante | Carnet | Usuario de GitHub | Correo Electrónico | Contribuciones Principales |
| :--- | :--- | :--- | :--- | :--- |
| **Blanca Esmeralda Maravilla Cruz** | MC240030 | [@bmaravilla-hub](https://github.com/bmaravilla-hub) | `maravillacruz806@gmail.com` | Arquitectura base, Modelos TypeScript, Estado global (`CineMatchContext`), Cliente API REST (`api.ts`), persistencia con `localStorage` y vistas de Detalle (`MovieDetailView`), Inicio (`HomeView`) y Perfil (`ProfileView`). |
| **Rebeca Marcela Orozco Arévalo** | OA241153 | [@Rebe155](https://github.com/Rebe155) | `arevalorebeca41@gmail.com` | Tokens de diseño HSL y paleta oscura (`index.css`), componentes de Layout (`AppLayout`, `Sidebar`, `Topbar` con indicador de backend), componentes atómicos (`MovieCard`, `StarRating`), Catálogo con filtros (`CatalogView`), Recomendaciones y Mi Lista. |

---

## 🚀 Stack Tecnológico

- **Framework / Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Estilos**: Vanilla CSS moderno con Custom Properties (`:root`), glassmorphism, modo oscuro y microinteracciones fluidas.
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Gestión de Estado**: React Context API (`CineMatchContext`) + Custom Hooks (`useLocalStorage`, `useCineMatch`)
- **Conectividad REST**: Cliente asíncrono con fallback automático ante desconexión del servidor backend.
- **Control de Versiones**: Git & GitHub con flujo estructurado de ramas y commits colaborativos.

---

## 🔄 Integración con Backend (CineMatch-Back)

El frontend se comunica de manera asíncrona y transparente con el backend independiente ([CineMatch-Back](https://github.com/bmaravilla-hub/cinematch-back.git)) alojado en el puerto `3001`:

1. **Catálogo Dinámico (`GET /api/movies`)**: Carga las películas ordenadas alfabéticamente a través del Árbol AVL del backend.
2. **Detalle Rápido (`GET /api/movies/:id`)**: Obtiene la información en $O(1)$ vía la Tabla Hash del backend.
3. **Calificaciones Sincronizadas (`POST /api/ratings`)**: Registra la calificación en el Grafo Bipartito y la Lista Enlazada del backend, actualizando inmediatamente el promedio en el catálogo.
4. **Recomendaciones Personalizadas (`GET /api/recommendations`)**: Consume el motor de filtrado colaborativo basado en similitud de coseno y Max-Heap, con mecanismo alternativo de respaldo por popularidad.
5. **Indicador de Conexión en Tiempo Real**: Badge visual en la barra superior (`Topbar`) que informa al usuario si está sincronizado con el servidor REST o en modo offline/fallback.

---

## 💻 Funcionalidades Implementadas

1. **Catálogo Integral y Búsqueda (`CatalogView`)**:
   - Barra de búsqueda reactiva en tiempo real por título y descripción.
   - Filtros combinados dinámicos por género, año de estreno y formato (Película / Serie).
   - Vista en cuadrícula responsiva con estados vacíos amigables (`EmptyState`).

2. **Detalle Cinematográfico (`MovieDetailView`)**:
   - Reproductor cinematográfico simulado con tráilers dinámicos.
   - Navegación interna por pestañas: Sinopsis, Reparto y Tráilers adicionales.
   - Sistema interactivo de calificación por estrellas (`1` a `5` estrellas).
   - Botón interactivo para alternar guardado en "Mi Lista" con feedback visual.

3. **Motor de Recomendaciones (`RecommendationsView`)**:
   - Algoritmo de filtrado colaborativo con identificación del usuario de sesión (`u1` - Diego M.).
   - Distinción visual entre recomendaciones colaborativas personalizadas y títulos populares de respaldo.

4. **Mi Lista Personalizada (`MyListView`)**:
   - Colección privada del usuario sincronizada en tiempo real con `localStorage`.

5. **Perfil de Usuario (`ProfileView`)**:
   - Historial de títulos visualizados, métricas de actividad (horas vistas, calificaciones emitidas) y listado de títulos mejor evaluados.

---

## 📁 Arquitectura de Carpetas

```text
CineMatch/
├── public/                 # Iconos SVG y recursos estáticos
├── src/
│   ├── assets/             # Gráficos e ilustraciones
│   ├── components/
│   │   ├── layout/         # AppLayout, Sidebar (navegación fija) y Topbar (con status badge)
│   │   └── ui/             # Componentes reutilizables (Button, MovieCard, StarRating, Tabs, etc.)
│   ├── context/            # CineMatchContext (Estado global y sincronización reactiva)
│   ├── data/               # Mock dataset semilla (fallback offline)
│   ├── hooks/              # Custom hooks (useLocalStorage, useCineMatch)
│   ├── services/           # api.ts (cliente HTTP REST para CineMatch-Back)
│   ├── types/              # Definiciones e interfaces TypeScript (Movie, Rating, User, etc.)
│   ├── views/              # HomeView, CatalogView, RecommendationsView, MovieDetailView, MyListView, ProfileView
│   ├── App.tsx             # Enrutamiento de vistas y layout raíz
│   ├── index.css           # Tokens de diseño y estilos globales
│   └── main.tsx            # Punto de entrada de la aplicación
├── index.html              # Plantilla HTML5 con fuentes Montserrat e Inter
├── package.json            # Scripts y dependencias del proyecto
├── tsconfig.json           # Configuración del compilador TypeScript
└── vite.config.ts          # Configuración de Vite con proxy hacia http://localhost:3001
```

---

## 🛠️ Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js:** v20.0.0 o superior.
- **npm:** v10.0.0 o superior.
- **Backend opcional:** Tener ejecutándose [CineMatch-Back](https://github.com/bmaravilla-hub/cinematch-back.git) en el puerto `3001`.

### 1. Clonar el repositorio
```bash
git clone https://github.com/bmaravilla-hub/cinematch.git
cd cinematch
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`. Si el backend está levantado en el puerto `3001`, se conectará automáticamente.

### 4. Compilar para producción
```bash
npm run build
```
Valida los tipos TypeScript y genera los paquetes minificados en `dist/`.

### 5. Validar estilo con ESLint
```bash
npm run lint
```
