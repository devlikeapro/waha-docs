---
title: "🗄️ Storages"
description: "Storages - where to save authentication and media files"
lead: ""
date: 2020-10-06T08:48:45+00:00
lastmod: 2020-10-06T08:48:45+00:00
draft: false
weight: 700
images: ["waha-storages.drawio.png"]
slug: storages
---

WAHA uses several **Storage** types. Below you can find a list of these storage options and how to configure them.

1. [**🖥️ Session Storage**](#sessions) - store **the session data** (such as authentication information, configuration, and other data that is required to keep the session alive and connected to WhatsApp)
2. [**🖼️ Media Storage**](#media) - store **the media files** (such as images, videos, and other files that are received from the WhatsApp instance)

{{< imgo src="/images/waha/storages/waha-storages.drawio.png" >}}

{{< include file="content/docs/how-to/storages/features.md" >}}

{{< include file="content/docs/how-to/storages/docker-compose.md" >}}

## Sessions Storage
**🖥️ Session Storage** is used to store **session data**, 
such as authentication information, configuration,
and other data that is required to keep the session alive and connected to WhatsApp.

If you want to save your session and avoid scanning the QR code every time you launch WAHA,
you **MUST** connect the session storage to the container.

For the session storage, you can use the following options:
1. [**Local**](#sessions---local) - the default option, stores the session data in the local storage using files.
2. [**PostgreSQL**](#sessions---postgresql) - stores the session data in the PostgreSQL database.
3. [**MongoDB**](#sessions---mongodb) - stores the session data in the MongoDB database.

{{< include file="content/docs/how-to/storages/docker-compose.md" >}}

### Sessions - Local
By default, the WAHA uses the **local storage (files)** to store the session data.

{{< callout context="note" icon="outline/info-circle" >}}
It's a **well-tested solution** even for **production** with multiple sessions
{{< /callout >}}

#### Quick Start
To use local storage with session persistence, you need to mount a volume to the `/app/.sessions` directory. Here are the common ways to do this:

1. **Using Docker Run** (recommended for development):
```bash
docker run -v `pwd`/.sessions:/app/.sessions -p 3000:3000 devlikeapro/waha-plus
```

2. **Using Docker Compose** (recommended for production):
```yaml
services:
  waha:
    image: devlikeapro/waha-plus
    volumes:
      - ./.sessions:/app/.sessions
    ports:
      - "127.0.0.1:3000:3000"
```

3. **Using Custom Directory** (if you need a specific location):
```bash
docker run -v /custom/path/to/sessions:/app/.sessions -p 3000:3000 devlikeapro/waha-plus
```

#### Configuration Options
- `WAHA_LOCAL_STORE_BASE_DIR=/app/.sessions` - Override the base directory for local storage
  - Useful for handling Azure "dot" restrictions {{< issue 597 >}}
  - Default: `/app/.sessions`

#### Directory Structure
The session data is organized in the following structure:
```sh
sessions/
├── webjs/                    # Engine-specific directory
│   ├── default/              # Session directory
│   │   └── ...               # Session files
│   └── another-session/      # Another session
│       └── ...               # Session files
│
└── noweb/                    # Another engine
    └── default/
        └── ...
```

#### Health Check
[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) provides [health check endpoints]({{< relref "/docs/how-to/observability" >}}).

### Sessions - PostgreSQL
If you want to use the PostgreSQL to store the session data, you need to set `WHATSAPP_SESSIONS_POSTGRESQL_URL` environment variable

**Using Docker Run**
```sh
docker run \
    -e WHATSAPP_SESSIONS_POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable \
    -p 3000:3000 \
    devlikeapro/waha-plus
```

**Using Docker Compose**
```yaml { title="docker-compose.yaml" }
services:
  waha:
    image: devlikeapro/waha-plus
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      - WHATSAPP_SESSIONS_POSTGRESQL_URL=postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable
    depends_on:
      - postgres

  postgres:
    image: postgres:17
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    command:
      - postgres
      - "-c"
      - "max_connections=3000"

volumes:
  postgres_data:
```

{{< details "<b>❓ I want to run >100 sessions on PostgreSQL | pg sorry, too many clients already</b>" >}}
If you see the error:
> pg sorry, too many clients already

Make sure to increase the `max_connections` in the `postgresql.conf` file or start it with the flag:
```bash
postgres -c max_connections=3000
```
{{< /details >}}

{{< callout title="WAHA uses Multiple Databases schema" context="note" icon="outline/database" >}}
👉 Read how WAHA uses databases in the [**Database Schema**](#database-schema) section.
{{< /callout >}}

### Sessions - MongoDB
{{< callout context="danger" title="Deprecated" icon="outline/alert-square-rounded" >}}
**MongoDB** storage is **deprecated** and no new features will be added to it.

👉 Use [**PostgresSQL**](#sessions---postgresql)
instead for new installations.
{{< /callout >}}

If you want to use the MongoDB to store the session data, you need to:
1. Start the MongoDB server (using docker or any other way). You can either start your own MongoDB server or use the one of cloud providers, like [MongoDB Atlas](https://www.mongodb.com/atlas/database).
2. Set `WHATSAPP_SESSIONS_MONGO_URL=mongodb://user:password@host:port/` environment variable to connect to the MongoDB server.

**We recommend using your own MongoDB server as close as possible to the WAHA server** for the best performance and security reasons.

{{< callout title="WAHA uses Multiple Databases schema" context="note" icon="outline/database" >}}
👉 Read how WAHA uses databases in the [**Database Schema**](#database-schema) section.
{{< /callout >}}

First, you need to start MongoDB server:
```bash
docker run -d -p 27017:27017 --name mongodb -v mongo-data:/data/db mongo
```

Then, you need to run the WAHA with the `WHATSAPP_SESSIONS_MONGO_URL` environment variable (please note using `--network host` option as well)
```bash
docker run -e WHATSAPP_SESSIONS_MONGO_URL=mongodb://localhost:27017/ --network host devlikeapro/waha-plus
```

That's all you need to do to use MongoDB storage.
All session authentication data will be automatically stored in the MongoDB database.

For managing and troubleshooting MongoDB, we recommend using [MongoDB Compass](https://www.mongodb.com/products/tools/compass).

![alt](waha-mongodb.png)

#### Health Check
[**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) provides [health check endpoints]({{< relref "/docs/how-to/observability" >}}).

## Media Storage
When your WhatsApp instance receives **media files**, it stores them in the **🖼️ Media Storage**.

You can use the following options to store the media files:
1. [**Local**](#media---local) - stores the media files in the local storage using files.
2. [**PostgreSQL**](#media---postgresql) - stores the media files in the PostgreSQL database.
3. [**S3**](#media---s3) - stores the media files in the S3 storage.

### Media - Local
By default, WAHA stores media files in local storage with a **180-second lifetime**. 

To persist media files:

```bash
docker run -v /path/to/on/host/.media:/app/.media \
  -e WHATSAPP_FILES_FOLDER=/app/.media \
  -e WHATSAPP_FILES_LIFETIME=0 \
  -p 3000:3000 \
  devlikeapro/waha-plus
```

```yaml
services:
  waha:
    image: devlikeapro/waha-plus
    volumes:
      - ./.media:/app/.media
    environment:
      - WHATSAPP_FILES_FOLDER=/app/.media
      - WHATSAPP_FILES_LIFETIME=0
    ports:
      - "127.0.0.1:3000:3000"
```

### Media - PostgreSQL
You can store media files in PostgreSQL. 

It'll create additional `media` table in **each database for session**.

{{< callout title="WAHA uses Multiple Databases schema" context="note" icon="outline/database" >}}
👉 Read how WAHA uses databases in the [**Database Schema**](#database-schema) section.
{{< /callout >}}

```bash
docker run \
  -e WAHA_MEDIA_STORAGE=POSTGRESQL \
  -e WAHA_MEDIA_POSTGRESQL_URL=postgres://postgres:postgres@localhost:5432/postgres?sslmode=disable \
  -p 3000:3000 \
  devlikeapro/waha-plus
```

```yaml
services:
  waha:
    image: devlikeapro/waha-plus
    environment:
      - WAHA_MEDIA_STORAGE=POSTGRESQL
      - WAHA_MEDIA_POSTGRESQL_URL=postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable
    ports:
      - "127.0.0.1:3000:3000"
    depends_on:
      - postgres

  postgres:
    image: postgres:17
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Media - S3
To store media files in S3-compatible storage:

```bash
docker run \
  -e WAHA_MEDIA_STORAGE=S3 \
  -e WAHA_S3_REGION=eu-west-1 \
  -e WAHA_S3_BUCKET=waha \
  -e WAHA_S3_ACCESS_KEY_ID=minioadmin \
  -e WAHA_S3_SECRET_ACCESS_KEY=minioadmin \
  -e WAHA_S3_ENDPOINT=http://127.0.0.1:9000 \
  -e WAHA_S3_FORCE_PATH_STYLE=True \
  -e WAHA_S3_PROXY_FILES=False \
  -p 3000:3000 \
  devlikeapro/waha-plus
```

```yaml
services:
  waha:
    image: devlikeapro/waha-plus
    environment:
      - WAHA_MEDIA_STORAGE=S3
      - WAHA_S3_REGION=eu-west-1
      - WAHA_S3_BUCKET=waha
      - WAHA_S3_ACCESS_KEY_ID=minioadmin
      - WAHA_S3_SECRET_ACCESS_KEY=minioadmin
      - WAHA_S3_ENDPOINT=http://minio:9000
      - WAHA_S3_FORCE_PATH_STYLE=True
      - WAHA_S3_PROXY_FILES=False
    ports:
      - "127.0.0.1:3000:3000"
    depends_on:
      - minio

  minio:
    image: minio/minio
    environment:
      - MINIO_ROOT_USER=minioadmin
      - MINIO_ROOT_PASSWORD=minioadmin
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
    ports:
      - "9000:9000"
      - "9001:9001"

volumes:
  minio_data:
```

**S3 metadata** for each file:
- `X-Amz-Meta-Waha-Session=default` - session name
- `X-Amz-Meta-Waha-Message-Id=true_111...` - message ID
- `X-Amz-Meta-Waha-Media-File-Name=media.jpg` - media file name

## FAQ
### Database Schema
{{< callout context="caution" icon="outline/database" >}}
When using **PostgreSQL** or **MongoDB** storage, 
WAHA creates **multiple databases** using the credentials provided in the connection URL:

1. `waha_{engine}` - A **single database** with
    - session configuration 
    - common parameters that persist until you remove a session
2. `waha_{engine}_{sessionname}` - A **separate database** for **each session** that contains:
    - Credentials
    - Messages
    - Contacts
    - Other session-specific data
{{< /callout >}}

{{< callout context="note" title="Database Schemas" icon="outline/database" >}}
![PostgreSQL Databases](psql-databases.png) ![MongoDB Databases](mongodb-databases.png)
{{< /callout >}}

This approach provides **several benefits**:
1. Easy monitoring of storage usage per session
2. Better stability when running multiple sessions
3. Isolation between sessions - if one session's database has issues, it won't affect other sessions
4. Clear separation of concerns between session configuration and session data

{{< callout context="danger" title="User Permissions" icon="outline/user" >}}
Make sure that the user that connects to the database has **create/drop** permissions on the databases.
{{< /callout >}}

### Multiple Workers - Single Database Server
{{< callout context="warning" icon="outline/alert-triangle" >}}
When running **multiple WAHA workers** with **the same database**, you **MUST** set a unique `WAHA_WORKER_ID` for each worker to prevent conflicts and ensure proper operation.
{{< /callout >}}

Example configuration for multiple workers:

```yaml
services:
  waha-worker-1:
    image: devlikeapro/waha-plus
    environment:
      - WAHA_WORKER_ID=worker-1
      - WHATSAPP_SESSIONS_POSTGRESQL_URL=postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable
    ports:
      - "127.0.0.1:3000:3000"
    depends_on:
      - postgres

  waha-worker-2:
    image: devlikeapro/waha-plus
    environment:
      - WAHA_WORKER_ID=worker-2
      - WHATSAPP_SESSIONS_POSTGRESQL_URL=postgres://postgres:postgres@postgres:5432/postgres?sslmode=disable
    ports:
      - "127.0.0.1:3001:3000"
    depends_on:
      - postgres

  postgres:
    image: postgres:17
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```
