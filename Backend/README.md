# AlpaTrace — Backend API

API REST construida con Node.js + Express + TypeScript. Actúa como intermediario entre el frontend y Supabase.

---

## Setup

### Variables de entorno

Crear `.env` en la raíz de `/Backend`:

```
PORT=4000
FRONTEND_URL=http://localhost:3000

SUPABASE_URL=https://<tu-proyecto>.supabase.co
SUPABASE_PUBLISHABLE_KEY=<anon/publishable key>
SUPABASE_SECRET_KEY=<service_role key>
```

### Instalar y correr

```bash
cd Backend
npm install
npm run dev        # desarrollo con hot-reload
npm run build      # compilar a /dist
npm start          # producción
```

Servidor en: `http://localhost:4000`

---

## Autenticación

El backend **no maneja login ni registro directamente**. Eso lo hace Supabase en el frontend. El backend valida el token que Supabase emite.

### Cómo enviar requests autenticados

```http
Authorization: Bearer <access_token>
```

El `access_token` lo provee Supabase después del login (email/password o Google OAuth).

---

## Flujo de autenticación para el frontend

### Email / Password

```
1. supabase.auth.signInWithPassword({ email, password })
   → recibís session.access_token

2. GET /api/auth/me  (con el token)
   → si hasProfile: false → ir al paso 3
   → si hasProfile: true  → redirigir según rol

3. POST /api/auth/profile  { nombre, rol }
   → crea el perfil en la plataforma

4. Redirigir según rol:
   productor   → /dashboard/productor
   empresa     → /dashboard/empresa
   admin       → /dashboard/admin
   capacitador → /dashboard/capacitador
```

### Google OAuth

```
1. supabase.auth.signInWithOAuth({ provider: 'google',
     options: { redirectTo: 'http://localhost:3000/auth/callback' }
   })

2. En la página /auth/callback:
   supabase.auth.getSession() → session.access_token

3. GET /api/auth/me  (con el token)
   → si hasProfile: false → mostrar formulario para elegir rol
   → si hasProfile: true  → redirigir según rol

4. Si es usuario nuevo: POST /api/auth/profile  { nombre, rol }
   El nombre podés tomarlo de: session.user.user_metadata.full_name

5. Redirigir según rol
```

> **Nota**: Para activar Google OAuth en Supabase ir a
> Authentication → Providers → Google → habilitar y pegar Client ID + Secret.

---

## Roles

| Rol | Descripción | Se registra vía |
|-----|-------------|-----------------|
| `productor` | Productor de fibra de alpaca | Formulario público |
| `empresa` | Empresa compradora | Formulario público |
| `admin` | Administrador de la plataforma | Creado por admin |
| `capacitador` | Capacitador técnico de campo | Creado por admin |

El `estado` de un perfil nuevo es siempre `pendiente`. Un admin debe activarlo a `activo`.

---

## Endpoints

### Salud del servidor

```
GET /health
→ { status: "ok" }
```

---

### Auth — `/api/auth`

#### GET `/api/auth/me`
Devuelve el usuario autenticado. Funciona con cualquier token válido de Supabase (email, Google, etc.).

**Headers:** `Authorization: Bearer <token>`

**Response — usuario con perfil:**
```json
{
  "id": "uuid",
  "email": "usuario@email.com",
  "nombre": "Juan Mamani",
  "rol": "productor",
  "estado": "activo",
  "hasProfile": true
}
```

**Response — usuario sin perfil (Google OAuth, primer login):**
```json
{
  "id": "uuid",
  "email": "usuario@gmail.com",
  "hasProfile": false
}
```

---

#### POST `/api/auth/profile`
Crea el perfil del usuario en la plataforma. Se llama **una sola vez** tras el primer login.

**Headers:** `Authorization: Bearer <token>` · `Content-Type: application/json`

**Body:**
```json
{
  "nombre": "Juan Mamani",
  "rol": "productor"
}
```

**Roles permitidos:** `productor` · `empresa`
_(admin y capacitador los crea un administrador directamente en Supabase)_

**Response 201:**
```json
{
  "id": "uuid",
  "email": "usuario@email.com",
  "nombre": "Juan Mamani",
  "rol": "productor",
  "estado": "pendiente"
}
```

**Errores:**
- `400` — falta nombre o rol inválido
- `409` — el perfil ya existe

---

### Profiles — `/api/profiles`

Requieren perfil activo (o pendiente) en la plataforma.

#### GET `/api/profiles/me`
Devuelve el perfil completo del usuario autenticado.

**Headers:** `Authorization: Bearer <token>`

---

#### PUT `/api/profiles/me`
Actualiza datos del perfil.

**Headers:** `Authorization: Bearer <token>` · `Content-Type: application/json`

**Body (campos opcionales):**
```json
{
  "nombre": "Nuevo nombre",
  "telefono": "987654321",
  "avatar_url": "https://..."
}
```

---

### Marketplace — `/api/marketplace`

Rutas **públicas**, no requieren autenticación.

#### GET `/api/marketplace/lotes`
Lista lotes disponibles sin exponer datos sensibles del productor.

**Query params (todos opcionales):**
```
?categoria=Baby
?region=Puno
?precioMin=10
?precioMax=50
```

**Response:**
```json
[
  {
    "lote_id": "uuid",
    "codigo_lote": "LOT-001",
    "categoria": "Baby",
    "peso_disponible": 120.5,
    "color": "blanco",
    "precio_por_libra": 18.50,
    "region": "Puno",
    "estado_verificacion": "verificado",
    "calificacion_promedio": 4.5,
    "ventas_completadas": 3
  }
]
```

---

### Lotes de fibra — `/api/lotes`

Requieren token + rol `productor`.

#### POST `/api/lotes`
Publica un nuevo lote de fibra.

**Body:**
```json
{
  "categoria_id": "uuid",
  "codigo_lote": "LOT-001",
  "peso_libras": 150.0,
  "color": "blanco",
  "precio_por_libra": 18.50,
  "ubicacion_general": "Puno",
  "fecha_esquila": "2025-04-01",
  "descripcion": "Fibra de alta calidad"
}
```

#### GET `/api/lotes/mis-lotes`
Lista los lotes del productor autenticado.

---

## Errores comunes

| Código | Significado |
|--------|-------------|
| `401` | Token no enviado o inválido |
| `403` | Sin perfil, cuenta inactiva, o rol insuficiente |
| `409` | Recurso ya existe (ej: perfil duplicado) |
| `500` | Error interno del servidor |

---

## Seguridad

- La `SUPABASE_SECRET_KEY` (service_role) **nunca** va al frontend ni a GitHub.
- Todos los datos sensibles del productor (DNI, teléfono, dirección exacta) están ocultos en la vista `marketplace_lotes_publicos`.
- El backend valida roles en cada ruta protegida — el frontend no puede saltear permisos.
