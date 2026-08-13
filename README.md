# 📚 API de Autores, Posts y Comentarios

API REST desarrollada con **Node.js y Express** para gestionar autores, publicaciones y comentarios.

El proyecto utiliza **PostgreSQL** como base de datos e implementa:

- Operaciones CRUD.
- Validaciones mediante middlewares.
- Pruebas automatizadas con Vitest y Supertest.
- Documentación de la API mediante Swagger / OpenAPI.
- Despliegue en Railway.
- Configuración para ejecución local.

---

## 📚 Documentación de la API

La API cuenta con documentación interactiva mediante **Swagger / OpenAPI**.

👉 **[Swagger / OpenAPI - API desplegada](https://proyectom2manzano-cesar-luis-production-ec6b.up.railway.app/api-docs)**

![Swagger](img/swagger.png)

---

## 🚀 Tecnologías utilizadas

- **Node.js**
- **Express**
- **PostgreSQL**
- **Swagger / OpenAPI**
- **Vitest**
- **Supertest**
- **Railway**
- **dotenv**

---

# 🌐 Ejecución en servidor

La API se encuentra desplegada en **Railway**, por lo que puede utilizarse directamente desde el servidor sin necesidad de realizar una configuración local.

### 🔗 Swagger

👉 **[Abrir documentación Swagger](https://proyectom2manzano-cesar-luis-production-ec6b.up.railway.app/api-docs)**

Desde Swagger se pueden consultar y probar los diferentes endpoints disponibles.

![Despliegue en Railway](img/railway.png)

---

# 💻 Ejecución local

El proyecto también puede ejecutarse localmente utilizando **Node.js, Express y PostgreSQL**.

Para ejecutar la API de forma local es necesario contar con:

- Node.js instalado.
- PostgreSQL instalado y ejecutándose.
- Una base de datos PostgreSQL local.
- Las dependencias del proyecto instaladas.

---

## 1️⃣ Clonar el proyecto

```bash
git clone https://github.com/cesarmanzano1/PROYECTOM2_MANZANO-CESAR-LUIS.git
cd PROYECTOM2_MANZANO-CESAR-LUIS
```

---

## 2️⃣ Instalar las dependencias

Ejecutar:

```bash
npm install
```

---

## 3️⃣ Crear la base de datos PostgreSQL

Crear una base de datos local en PostgreSQL.

Por ejemplo:

```sql
CREATE DATABASE blog_db;
```

Luego conectarse a la base de datos:

```sql
\c blog_db
```

Las tablas necesarias para el funcionamiento de la API deben estar creadas en esta base de datos.

---

## 4️⃣ Crear el archivo `.env`

El proyecto utiliza variables de entorno para configurar la conexión con PostgreSQL.

Crear un archivo llamado:

```text
.env
```

en la raíz del proyecto.

Ejemplo:

```env
PGHOST=localhost
PGPORT=5432
PGDATABASE=blog_db
PGUSER=postgres
PGPASSWORD=tu_contraseña
NODE_ENV=development
```

> ⚠️ Los valores deben modificarse de acuerdo con la configuración de PostgreSQL de cada usuario.

El archivo `.env` **no debe subirse a GitHub**, ya que puede contener información sensible como contraseñas.

El proyecto incluye un archivo `.env.example` como referencia.

---

## 5️⃣ Ejecutar la API localmente

Una vez configurada la base de datos y el archivo `.env`, ejecutar:

```bash
npm start
```

La API estará disponible en:

```text
http://localhost:3000
```

---

## 6️⃣ Documentación Swagger local

La documentación Swagger estará disponible en:

```text
http://localhost:3000/api-docs
```

También se puede consultar la especificación OpenAPI desde:

```text
http://localhost:3000/api-docs.json
```

---

# 📂 Entidades

## 👤 Authors

La entidad `authors` representa a los autores de las publicaciones.

![Entidad Authors](img/authors.png)

---

## 📝 Posts

La entidad `posts` representa las publicaciones realizadas por los autores.

![Entidad Posts](img/posteos.png)

---

## 💬 Comments

La entidad `comments` representa los comentarios realizados sobre las publicaciones.

![Entidad Comments](img/comentarios.png)

---

# 🔗 Relaciones

Las entidades de la API se encuentran relacionadas de la siguiente manera:

- Un autor puede tener muchos posts.
- Un post pertenece a un autor.
- Un autor puede realizar muchos comentarios.
- Un comentario pertenece a un autor.
- Un comentario pertenece a un post.

![Relaciones de Entidades](img/relacion_entidades.png)

---

# 🗄️ Base de datos

El proyecto utiliza **PostgreSQL** para la persistencia de los datos.

Las principales tablas utilizadas son:

- `authors`
- `posts`
- `comments`

---

# 📡 Endpoints

## ❤️ Health Check

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/health` | Verificar el estado de la API |

---

## 👤 Authors

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/authors` | Obtener todos los autores |
| GET | `/authors/:id` | Obtener un autor por ID |
| POST | `/authors` | Crear un nuevo autor |
| PUT | `/authors/:id` | Actualizar un autor |
| DELETE | `/authors/:id` | Eliminar un autor |

---

## 📝 Posts

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/posts` | Obtener todos los posts |
| GET | `/posts/:id` | Obtener un post por ID |
| GET | `/posts/author/:authorId` | Obtener los posts de un autor |
| POST | `/posts` | Crear un nuevo post |
| PUT | `/posts/:id` | Actualizar un post |
| DELETE | `/posts/:id` | Eliminar un post |

---

## 💬 Comments

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/comments` | Obtener todos los comentarios |
| POST | `/comments` | Crear un nuevo comentario |

---

# ✅ Validaciones

La API cuenta con middlewares para validar los datos recibidos.

## 👤 Authors

Se validan los siguientes campos:

- `name`
- `email`
- `bio`

También se verifica que:

- El correo electrónico tenga un formato válido.
- El correo electrónico sea único.

---

## 📝 Posts

Se validan los siguientes campos:

- `author_id`
- `title`
- `content`
- `published`

El campo `published` debe ser de tipo booleano.

---

## 💬 Comments

Se validan los siguientes campos:

- `content`
- `author_id`
- `post_id`

También se verifica que:

- `author_id` sea un número entero positivo.
- `post_id` sea un número entero positivo.
- El contenido del comentario no esté vacío.

---

# 🧪 Pruebas automatizadas

El proyecto utiliza **Vitest** y **Supertest** para realizar pruebas automatizadas de los endpoints.

Para ejecutar las pruebas:

```bash
npx vitest run src/test/server.test.js
```

Las pruebas verifican, entre otros aspectos:

- Funcionamiento del endpoint `/health`.
- Disponibilidad de Swagger.
- Obtención de autores.
- Creación de autores.
- Validación de datos.
- Obtención de posts.
- Creación de comentarios.
- Validaciones de comentarios.
- Códigos de respuesta HTTP.

---

# 🤖 Uso de Inteligencia Artificial

Durante el desarrollo del proyecto se utilizó Inteligencia Artificial como herramienta de apoyo para:

- Analizar y corregir errores en el código.
- Ayudar en la creación de pruebas con Vitest y Supertest.
- Orientar en la documentación con Swagger / OpenAPI.
- Revisar la estructura y organización del proyecto.
- Resolver inconvenientes durante el deployment en Railway.

La IA fue utilizada como herramienta de apoyo al desarrollo y aprendizaje, realizando posteriormente las modificaciones, pruebas y verificaciones correspondientes sobre el código.

---

# 📁 Estructura del proyecto

```text
PROYECTOM2_MANZANO-CESAR-LUIS/
│
├── docIA/
│
├── img/
│
├── src/
│   ├── config/
│   │   ├── constsConfig.js
│   │   ├── dbConnect.js
│   │   └── initDB.js
│   │
│   ├── controllers/
│   │   ├── authors.Controller.js
│   │   ├── comments.controller.js
│   │   ├── health.controller.js
│   │   └── post.controller.js
│   │
│   ├── middleware/
│   │   └── middleware.js
│   │
│   ├── router/
│   │   └── router.js
│   │
│   ├── test/
│   │   └── server.test.js
│   │
│   ├── server.js
│   └── swagger.js
│
├── .env.example
├── .gitignore
├── enlaces.txt
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── vitest.config.js
```

---

# 👨‍💻 Autor

**César Luis Manzano**

Proyecto desarrollado como parte del **Módulo 2 - Desarrollo Backend**.