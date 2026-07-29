<div></div>

{{< tabs "send-sticker-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Send Sticker" }
curl -X 'POST' \
  'http://localhost:3000/api/sendSticker' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "file": {
    "mimetype": "image/webp",
    "url": "https://example.com/sticker.webp"
  }
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="send-sticker.py" }
import requests

url = "http://localhost:3000/api/sendSticker"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "file": {
        "mimetype": "image/webp",
        "url": "https://example.com/sticker.webp",
    },
}
response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-sticker.js" }
const url = "http://localhost:3000/api/sendSticker";
const options = {
  method: "POST",
  headers: {
    "X-Api-Key": "yoursecretkey",
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    session: "default",
    chatId: "12132132130@c.us",
    file: {
      mimetype: "image/webp",
      url: "https://example.com/sticker.webp",
    },
  }),
};
const response = await fetch(url, options);
const data = await response.json();
console.log(data);
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="send-sticker.php" }
<?php
$url = "http://localhost:3000/api/sendSticker";
$data = [
  "session" => "default",
  "chatId" => "12132132130@c.us",
  "file" => [
    "mimetype" => "image/webp",
    "url" => "https://example.com/sticker.webp",
  ],
];
$options = [
  "http" => [
    "header" => "Content-Type: application/json\r\nX-Api-Key: yoursecretkey\r\n",
    "method" => "POST",
    "content" => json_encode($data),
  ],
];
$result = file_get_contents($url, false, stream_context_create($options));
echo $result;
```
{{< /tab >}}

{{< /tabs >}}
