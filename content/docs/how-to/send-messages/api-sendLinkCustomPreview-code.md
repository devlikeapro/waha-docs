<div></div>

{{< tabs "send-link-custom-preview-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'POST' \
  'http://localhost:3000/api/send/link-custom-preview' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "text": "Check this out! https://github.com/",
  "linkPreviewHighQuality": true,
  "preview": {
    "url": "https://github.com/",
    "title": "Your Title",
    "description": "Check this out, this is a custom link preview!",
    "image": {
      "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
    }
  }
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/send/link-custom-preview"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "text": "Check this out! https://github.com/",
    "linkPreviewHighQuality": True,
    "preview": {
        "url": "https://github.com/",
        "title": "Your Title",
        "description": "Check this out, this is a custom link preview!",
        "image": {
            "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
        }
    }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript
const axios = require('axios');

const url = "http://localhost:3000/api/send/link-custom-preview";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    text: "Check this out! https://github.com/",
    linkPreviewHighQuality: true,
    preview: {
        url: "https://github.com/",
        title: "Your Title",
        description: "Check this out, this is a custom link preview!",
        image: {
            url: "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
        }
    }
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
$url = "http://localhost:3000/api/send/link-custom-preview";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "text" => "Check this out! https://github.com/",
    "linkPreviewHighQuality" => true,
    "preview" => [
        "url" => "https://github.com/",
        "title" => "Your Title",
        "description" => "Check this out, this is a custom link preview!",
        "image" => [
            "url" => "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
        ]
    ]
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