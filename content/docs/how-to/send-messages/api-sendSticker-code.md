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
    "url": "https://www.gstatic.com/webp/gallery/1.webp"
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
        "url": "https://www.gstatic.com/webp/gallery/1.webp"
    }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-sticker.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sendSticker";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    file: {
        mimetype: "image/webp",
        url: "https://www.gstatic.com/webp/gallery/1.webp"
    }
};
const headers = {
    'X-Api-Key': 'yoursecretkey',
    'Content-Type': 'application/json',
};

axios.post(url, data, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
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
        "url" => "https://www.gstatic.com/webp/gallery/1.webp"
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Api-Key: yoursecretkey',
    'Content-Type: application/json',
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```
{{< /tab >}}

{{< /tabs >}}
