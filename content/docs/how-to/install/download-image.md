<br>
{{< tabs "download-docker-image" >}}

{{< tab "WAHA Core" >}}
Run the command below:

```bash
docker pull devlikeapro/waha
```

{{< /tab >}}

{{< tab "➕ WAHA Plus" >}}
If you got the
[➕ WAHA Plus]({{< relref "/docs/how-to/waha-plus" >}})
, use the following commands:

```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus
docker logout
```

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right version.
{{< /tab >}}

{{< tab "WAHA (ARM)" >}}
If you're using ARM (like Apple M1/M2, Raspberry Pi etc.) - use following commands to download the image:
```bash
# Download the image
docker pull devlikeapro/waha:arm
# Rename it, so you can use devlikeapro/waha image in other place
docker tag devlikeapro/waha:arm devlikeapro/waha
```

If you got the
[➕ WAHA Plus]({{< relref "/docs/how-to/waha-plus" >}})
, use the following commands:

```bash
docker login -u devlikeapro -p {KEY}
docker pull devlikeapro/waha-plus:arm
docker logout

# Rename it, so you can use devlikeapro/waha image in other place
docker tag devlikeapro/waha-plus:arm devlikeapro/waha-plus
```

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right version.
{{< /tab >}}

{{< /tabs >}}
