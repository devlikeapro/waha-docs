```http request
POST /api/{session}/status/image
```
```jsonc { title="Body" }
{
  "file": {
    "mimetype": "image/jpeg",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg"
  },
  "caption": "string"
}
```