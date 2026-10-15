# Sistema web de registro y seguimiento de encomiendas en Trujillo

Proyecto del curso **Agile Development** (UPAO, 2026). Sistema web para que una empresa de transporte registre sus encomiendas, entregue una guía con número de seguimiento y el cliente consulte su envío desde el celular.

## Equipo

| Integrante | Rol |
|---|---|
| Amilcar Anderson Cedano Baca | Backend · Scrum Master |
| Anjhely Jhassadi Minchola Mantilla | Frontend y base de datos |
| Erick Jeancarlo Lozano Aguilar | Análisis y diseño |
| Anthony Eduardo Gaytan Castillo | Pruebas y despliegue |

## Tecnologías

React (Vite) · Node.js con Express · MySQL 8 · Docker

## Cómo ejecutarlo

```bash
cp .env.example .env
docker compose up -d --build
```

- Frontend: http://localhost:5173
- API: http://localhost:4000/api/health
- Usuario de prueba: `admin` / `Admin2026*`

## Estructura

```
backend/    API Express (login, tarifas, validaciones)
frontend/   Aplicación React
database/   Script de creación de tablas y datos iniciales
```

## Avance

**Sprint 1 · MVP (08/10 – 21/10/2026)**

- [x] HU 1.1 · Iniciar sesión
- [ ] HU 1.2 · Registrar encomienda (tablas, cálculo del costo y validaciones en curso)
- [ ] HU 2.1 · Generar e imprimir la guía
- [ ] HU 3.1 · Consultar estado de la encomienda
- [ ] HU 4.1 · Actualizar estado del envío
