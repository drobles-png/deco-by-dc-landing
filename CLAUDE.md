# DECO by DC — funnel VSL (Cristin, diseño de interiores)

Creado con la skill `landings-vsl` desde `drobles-png/landings-vsl`. Repo: `drobles-png/deco-by-dc-landing`.
Cliente: DECO by DC · estudio de diseño interior con fábrica propia, Samborondón · IG @deco_by_dc · FB decoguayaquil.
Estrategia (ficha_tecnica): "Leads para vendedores" → el funnel filtra y agenda la visita de $40.

## Stack y comandos
Vue 3 + Vite 7 + TS · SCSS · Pinia · vue-router · pnpm · función de Vercel `api/capi.ts`.
`pnpm dev --port 5176 --strictPort` (5174 lo usa otra landing) · `pnpm type-check` · `pnpm build`.
E2E: `python3 ~/.claude/skills/landings-vsl/scripts/e2e_funnel.py --base http://localhost:5176 --steps e2e/agenda.json`

## Flujo (agenda, sin pago)
`/` → registro (nombre, apellido, email, WhatsApp, **ciudad**) → `/ver-video` → cualificación →
califica: `/agendar` (calendario GHL `9TWi5r0Z4MuTaSs3lH3c`) → `/cita-confirmada` · no califica: `/sin-espacio` (24 h).

## Config (`src/config/funnel.ts`)
`CLIENT` lleno · Pixel `1911131140329075` · webhooks de contacto y cualificación de la subcuenta del cliente ·
`ASK_CITY = true` (la visita cuesta distinto fuera de Samborondón) · `STORAGE_PREFIX = 'dc'` ·
`FUNNEL_TAG = 'funnel-deco'` · `WHATSAPP_NUMBER = '593980216578'` (botón en `/cita-confirmada`) · `VSL_POSTER_FALLBACK = '/cristin.webp'` · `WISTIA_MEDIA_ID = 1447fkgd8h` ("VSL 1 DECO BY DC", 9:58).
`META_CAPI_TOKEN` solo en `.env.local` y Vercel.

## Landing (FunnelView.vue) — estructura corta, 4 bloques
Recurso propio: el logo es un cuadrado abierto de tres piezas (camel, nogal, espresso) con un trazo desfasado.
Trazo = diseño, pieza sólida = fabricación ("lo que ves en el diseño es lo que llega a tu casa").
1. Hero: titular serif + Cristin dentro del cuadrado del logo (portada del video; las piezas se arman al cargar).
2. Banda espresso: origen en las mesas de mármol + foto de la mesa de mármol + isotipo que se "fabrica" (`DecoMark animate`).
   Galería de proyectos (`LANDING.projects`, fotos en `public/proyectos/`, elegidas del IG): mosaico en escritorio, carrusel en celular.
3. Proceso: línea de tiempo de 4 pasos (visita $40 → diseño $20/m² → el diseño es tuyo → fabricación).
   La ficha de precios de referencia se quitó el 24 nov 2026 a pedido de David.
4. Cristin: foto en su estudio con muestras (`cristin-estudio.webp`, del IG), presentación, cifras, «Quedó tal como lo soñaba» y CTA.
Marca: `src/styles/tokens.scss` ($camel, $walnut, $espresso, $stone). Fraunces (títulos) + Outfit (texto).
Logo redibujado en `BrandLogo.vue` + `DecoMark.vue`; favicon en `public/favicon.svg`.

## Cualificación (`src/utils/qualification.ts`)
`espacio` (casa_completa, sala_comedor, cocina, dormitorio_closet, un_mueble) · `momento` (recien_mudado,
renovar, solo_info) · `inversion` (menos_2k, 2k_5k, 5k_10k, mas_10k) · abierta `objetivo`.
**No califica** si `espacio = un_mueble` ("no vendemos una silla o una mesa suelta"), `momento = solo_info`
o `inversion = menos_2k` (la fabricación arranca en ~$2,000). Regla aprobada por David el 18 nov 2026.

## Deploy
Vercel equipo `bakano-proyects`, proyecto `deco-by-dc-landing` → https://decobydc-lng.vercel.app (único dominio).
Meta en modo landing: `META_PIXEL_ID` + `META_CAPI_TOKEN` en Vercel (production, preview). GHL sin acción de Meta en los flujos del funnel.
Calendario GHL "Visita tecnica" (`9TWi5r0Z4MuTaSs3lH3c`): 2 h, round robin entre 2 usuarios.
Muestras de GHL enviadas el 18 nov 2026. Prueba final en producción (modo ghl) OK el 18 nov: contacto, 3 notas, tags y oportunidad.
Contactos de prueba borrados el 19 nov 2026. Las ramas califica, no califica y cita funcionan (la cita tarda ~1 min por el paso Esperar).
Meta: deduplicación verificada con e2e `--mode meta` (19 nov, 4 eventos con par navegador/servidor). Código de prueba ya quitado.
E2E en producción: el botón de `/ver-video` tarda 120 s; usar pasos con `{"wait": 122000}` antes de `[data-cta=calificar]`.

## Pendientes
- `LEGAL` (razón social, RUC, ciudad, correo): las páginas legales muestran "[Pendiente]". No pautar así.
