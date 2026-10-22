# ðŸŽ¬ CineMatch - Frontend CinematogrÃ¡fico Interactivo

> **Proyecto Universitario - Desarrollo de Aplicaciones Web**  
> AplicaciÃ³n interactiva tipo SPA (Single Page Application) desarrollada con **React 19 + TypeScript + Vite** para la exploraciÃ³n, recomendaciÃ³n, catÃ¡logo y gestiÃ³n personalizada de pelÃ­culas y series.

---

## ðŸ‘¥ Equipo de Desarrollo

| Integrante | Usuario de GitHub | Correo ElectrÃ³nico | Contribuciones Principales |
| :--- | :--- | :--- | :--- |
| **Blanca Maravilla** | [@bmaravilla-hub](https://github.com/bmaravilla-hub) | `maravillacruz806@gmail.com` | Arquitectura base, Modelos TypeScript, Estado global (`CineMatchContext`), persistencia con `localStorage`, Vistas de Detalle (`MovieDetailView`), Inicio (`HomeView`) y Perfil de Usuario (`ProfileView`). |
| **Rebeca ArÃ©valo** | [@Rebe155](https://github.com/Rebe155) | `arevalorebeca41@gmail.com` | Tokens de diseÃ±o HSL y paleta oscura (`index.css`), componentes de Layout (`AppLayout`, `Sidebar`, `Topbar`), componentes atÃ³micos (`MovieCard`, `StarRating`, `Tabs`), CatÃ¡logo con filtros (`CatalogView`), Recomendaciones y Mi Lista. |

---

## ðŸš€ Stack TecnolÃ³gico

- **Framework / Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Estilos**: Vanilla CSS moderno con Custom Properties (`:root`), glassmorphism y microinteracciones fluidas.
- **IconografÃ­a**: [Lucide React](https://lucide.dev/)
- **GestiÃ³n de Estado**: React Context API (`CineMatchContext`) + Custom Hooks (`useLocalStorage`, `useCineMatch`)
- **Persistencia de Datos**: Web Storage API (`localStorage`)
- **Control de Versiones**: Git & GitHub con flujo estructurado de ramas por caracterÃ­sticas (`feature/`) y merges explÃ­citos.

---

## âœ¨ Funcionalidades Implementadas

1. **CatÃ¡logo Integral y BÃºsqueda (`CatalogView`)**:
   - Barra de bÃºsqueda reactiva en tiempo real por tÃ­tulo y descripciÃ³n.
   - Filtros combinados dinÃ¡micos por gÃ©nero, aÃ±o de estreno y formato (PelÃ­cula / Serie).
   - Vista en cuadrÃ­cula responsiva con estados vacÃ­os amigables (`EmptyState`).

2. **Detalle CinematogrÃ¡fico (`MovieDetailView`)**:
   - Reproductor cinematogrÃ¡fico simulado con trÃ¡ilers dinÃ¡micos.
   - NavegaciÃ³n interna por pestaÃ±as: Sinopsis, Reparto y TrÃ¡ilers adicionales.
   - Sistema interactivo de calificaciÃ³n por estrellas (escala 1 a 5 estrellas: `â˜…â˜†â˜†â˜†â˜†` a `â˜…â˜…â˜…â˜…â˜…`).
   - BotÃ³n interactivo para alternar guardado en "Mi Lista" con feedback visual.

3. **Motor de Recomendaciones (`RecommendationsView`)**:
   - Algoritmo de similitud basado en afinidad de gÃ©neros y tÃ­tulos favoritos guardados.

4. **Mi Lista Personalizada (`MyListView`)**:
   - ColecciÃ³n privada del usuario sincronizada en tiempo real con `localStorage`.

5. **Perfil de Usuario (`ProfileView`)**:
   - Historial de tÃ­tulos visualizados, mÃ©tricas de actividad (horas vistas, calificaciones emitidas) y listado de tÃ­tulos mejor evaluados.

---

## ðŸ“‚ Arquitectura de Carpetas

```text
CineMatch/
â”œâ”€â”€ public/                 # Iconos SVG y recursos de identidad visual
â”œâ”€â”€ src/
â”‚   â”œâ”€â”€ assets/             # GrÃ¡ficos e ilustraciones
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ layout/         # AppLayout, Sidebar (navegaciÃ³n fija) y Topbar
â”‚   â”‚   â””â”€â”€ ui/             # Componentes reutilizables (Button, MovieCard, StarRating, Tabs, etc.)
â”‚   â”œâ”€â”€ context/            # CineMatchContext (Estado global y sincronizaciÃ³n reactiva)
â”‚   â”œâ”€â”€ data/               # Mock dataset (pelÃ­culas, usuarios y calificaciones)
â”‚   â”œâ”€â”€ hooks/              # Custom hooks (useLocalStorage, useCineMatch)
â”‚   â”œâ”€â”€ types/              # Definiciones e interfaces TypeScript
â”‚   â”œâ”€â”€ views/              # Vistas completas de la aplicaciÃ³n (Home, Catalog, Detail, etc.)
â”‚   â”œâ”€â”€ App.tsx             # Enrutamiento de vistas y layout raÃ­z
â”‚   â”œâ”€â”€ index.css           # Tokens de diseÃ±o y estilos globales
â”‚   â””â”€â”€ main.tsx            # Punto de entrada de la aplicaciÃ³n
â”œâ”€â”€ index.html              # Plantilla HTML5 con fuentes Montserrat e Inter
â”œâ”€â”€ package.json            # Scripts y dependencias del proyecto
â””â”€â”€ tsconfig.json           # ConfiguraciÃ³n del compilador de TypeScript
```

---

## ðŸ› ï¸ InstalaciÃ³n y EjecuciÃ³n Local

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

4. **Compilar para producciÃ³n (validaciÃ³n de TypeScript y bundle de Vite)**:
   ```bash
   npm run build
   ```
