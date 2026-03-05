| Storage                           | WEBJS | WPP | NOWEB | GOWS |
|-----------------------------------|:-----:|:---:|:-----:|:----:|
| **Local** - **🖥️ Session**       |  ✔️   |     |  ✔️   |  ✔️  |
| **Local** - **🖼️ Media**         |  ✔️   |     |  ✔️   |  ✔️  |
| **PostgresSQL** - **🖥️ Session** |   ➕   |     |   ➕   |  ➕   |
| **PostgresSQL** - **🖼️ Media**   |   ➕   |     |   ➕   |  ➕   |
| **S3** - **🖼️ Media**            |   ➕   |     |   ➕   |  ➕   |
| ~~MongoDB - 🖥️ Session~~         |   ➕   |     |   ➕   |  ❌   |

- **PostgreSQL**, **S3** and **MongoDB** storages are available in [**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}})
- **MongoDB is deprecated** and no new features will be added to it.
- Any **S3 Compatible** storage can be used, such as AWS S3, MinIO, DigitalOcean Spaces, etc. For in-house solutions, you can use [**MinIO**](https://min.io/).

---
