# CineMatch - Frontend Cinematográfico Interactivo

> **Proyecto Universitario - Desarrollo de Aplicaciones Web**  
> Aplicación interactiva tipo SPA (Single Page Application) desarrollada con **React 19 + TypeScript + Vite** para la exploración, recomendación, catálogo y gestión personalizada de películas y series.

---

## Equipo de Desarrollo

| Integrante | Usuario de GitHub | Correo Electrónico | Contribuciones Principales |
| :--- | :--- | :--- | :--- |
| **Blanca Maravilla** | [@bmaravilla-hub](https://github.com/bmaravilla-hub) | `maravillacruz806@gmail.com` | Arquitectura base, Modelos TypeScript, Estado global (`CineMatchContext`), persistencia con `localStorage`, Vistas de Detalle (`MovieDetailView`), Inicio (`HomeView`) y Perfil de Usuario (`ProfileView`). |
| **Rebeca Arévalo** | [@Rebe155](https://github.com/Rebe155) | `arevalorebeca41@gmail.com` | Tokens de diseño HSL y paleta oscura (`index.css`), componentes de Layout (`AppLayout`, `Sidebar`, `Topbar`), componentes atómicos (`MovieCard`, `StarRating`, `Tabs`), Catálogo con filtros (`CatalogView`), Recomendaciones y Mi Lista. |

---

## Stack Tecnológico

- **Framework / Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Estilos**: Vanilla CSS moderno con Custom Properties (`:root`), glassmorphism y microinteracciones fluidas.
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Gestión de Estado**: React Context API (`CineMatchContext`) + Custom Hooks (`useLocalStorage`, `useCineMatch`)
- **Persistencia de Datos**: Web Storage API (`localStorage`)
- **Control de Versiones**: Git & GitHub con flujo estructurado de ramas por características (`feature/`) y merges explícitos.

---

## Funcionalidades Implementadas

1. **Catálogo Integral y Búsqueda (`CatalogView`)**:
   - Barra de búsqueda reactiva en tiempo real por título y descripción.
   - Filtros combinados dinámicos por género, año de estreno y formato (Película / Serie).
   - Vista en cuadrícula responsiva con estados vacíos amigables (`EmptyState`).

2. **Detalle Cinematográfico (`MovieDetailView`)**:
   - Reproductor cinematográfico simulado con tráilers dinámicos.
   - Navegación interna por pestañas: Sinopsis, Reparto y Tráilers adicionales.
   - Sistema interactivo de calificación por estrellas (escala 1 a 5 estrellas: `★☆☆☆☆` a `★★★★★`).
   - Botón interactivo para alternar guardado en "Mi Lista" con feedback visual.

3. **Motor de Recomendaciones (`RecommendationsView`)**:
   - Algoritmo de similitud basado en afinidad de géneros y títulos favoritos guardados.

4. **Mi Lista Personalizada (`MyListView`)**:
   - Colección privada del usuario sincronizada en tiempo real con `localStorage`.

5. **Perfil de Usuario (`ProfileView`)**:
   - Historial de títulos visualizados, métricas de actividad (horas vistas, calificaciones emitidas) y listado de títulos mejor evaluados.

---

## Arquitectura de Carpetas

```text
CineMatch/
├── public/                 # Iconos SVG y recursos de identidad visual
├── src/
│   ├── assets/             # Gráficos e ilustraciones
│   ├── components/
│   │   ├── layout/         # AppLayout, Sidebar (navegación fija) y Topbar
│   │   └── ui/             # Componentes reutilizables (Button, MovieCard, StarRating, Tabs, etc.)
│   ├── context/            # CineMatchContext (Estado global y sincronización reactiva)
│   ├── data/               # Mock dataset (películas, usuarios y calificaciones)
│   ├── hooks/              # Custom hooks (useLocalStorage, useCineMatch)
│   ├── types/              # Definiciones e interfaces TypeScript
│   ├── views/              # Vistas completas de la aplicación (Home, Catalog, Detail, etc.)
│   ├── App.tsx             # Enrutamiento de vistas y layout raíz
│   ├── index.css           # Tokens de diseño y estilos globales
│   └── main.tsx            # Punto de entrada de la aplicación
├── index.html              # Plantilla HTML5 con fuentes Montserrat e Inter
├── package.json            # Scripts y dependencias del proyecto
└── tsconfig.json           # Configuración del compilador de TypeScript
```

---

## Instalación y Ejecución Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/bmaravilla-hub/cinematch.git
   cd cinematch
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Compilar para producción (validación de TypeScript y bundle de Vite)**:
   ```bash
   npm run build
   ```
