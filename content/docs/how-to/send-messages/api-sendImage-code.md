<div></div>

{{< tabs "send-image-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'POST' \
  'http://localhost:3000/api/sendImage' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
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
```python
import requests

url = "http://localhost:3000/api/sendImage"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
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
```javascript
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
    'Content-Type': 'application/json',
    'X-Api-Key': 'yoursecretkey'
};

axios.post(url, data, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php
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
    'Content-Type: application/json',
    'X-Api-Key: yoursecretkey'
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```
{{< /tab >}}

{{< /tabs >}}
