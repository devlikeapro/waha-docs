<br>
{{< tabs "download-docker-image" >}}

{{< tab "WAHA" >}}
Run the command below:

```bash
docker pull devlikeapro/waha
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

👉 Go to
[**Docker Image Configurator**](https://portal.devlike.pro/docker-image)
to generate the command with the right version.
{{< /tab >}}

{{< /tabs >}}
