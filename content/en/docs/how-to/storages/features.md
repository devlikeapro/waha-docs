| Storage                            | WEBJS | NOWEB | GOWS |
|------------------------------------|:-----:|:-----:|:----:|
| **🖥️ Session** - **Local**        |  ✔️   |  ✔️   |  ✔️  |
| **🖼️ Media** - **Local**          |  ✔️   |  ✔️   |  ✔️  |
| **🖥️ Session** - **PostgresSQL**¹ |  ✔️   |  ✔️   |  ✔️  |
| **🖼️ Media** - **PostgresSQL**¹   |  ✔️   |  ✔️   |  ✔️  |
| **🖼️ Media** - **S3**¹²           |  ✔️   |  ✔️   |  ✔️  |
| ~~🖥️ Session - MongoDB~~¹³        |  ✔️   |  ✔️   |  ❌   |


****
1. Available in [**➕ WAHA Plus**]({{< relref "/docs/how-to/waha-plus" >}}) 
2. Any **S3 Compatible** storage can be used, such as AWS S3, MinIO, DigitalOcean Spaces, etc. For in-house solutions, you can use [**MinIO**](https://min.io/).
3. **MongoDB** is deprecated. Use **PostgresSQL** instead for new installations.
****
