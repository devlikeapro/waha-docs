<div></div>

{{< tabs "send-image-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Send Image" }
curl -X 'POST' \
  'http://localhost:3000/api/sendImage' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "file": {
    "mimetype": "image/jpeg",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg",
    "filename": "filename.jpeg"
  },
  "caption": "Check out this image!"
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="send-image.py" }
import requests

url = "http://localhost:3000/api/sendImage"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "file": {
        "mimetype": "image/jpeg",
        "url": "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg",
        "filename": "filename.jpeg"
    },
    "caption": "Check out this image!"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-image.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sendImage";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    file: {
        mimetype: "image/jpeg",
        url: "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg",
        filename: "filename.jpeg"
    },
    caption: "Check out this image!"
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
```php { title="send-image.php" }
<?php
$url = "http://localhost:3000/api/sendImage";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "file" => [
        "mimetype" => "image/jpeg",
        "url" => "https://github.com/devlikeapro/waha/raw/core/examples/dev.likeapro.jpg",
        "filename" => "filename.jpeg"
    ],
    "caption" => "Check out this image!"
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
