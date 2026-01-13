<div></div>

{{< tabs "send-video-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Send Video" }
curl -X 'POST' \
  'http://localhost:3000/api/sendVideo' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "caption": "Watch this video!",
  "asNote": false,
  "file": {
    "mimetype": "video/mp4",
    "filename": "video.mp4",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/video.mp4"
  },
  "convert": false
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="send-video.py" }
import requests

url = "http://localhost:3000/api/sendVideo"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "caption": "Watch this video!",
    "asNote": False,
    "file": {
        "mimetype": "video/mp4",
        "filename": "video.mp4",
        "url": "https://github.com/devlikeapro/waha/raw/core/examples/video.mp4"
    },
    "convert": False
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-video.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sendVideo";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    caption: "Watch this video!",
    asNote: false,
    file: {
        mimetype: "video/mp4",
        filename: "video.mp4",
        url: "https://github.com/devlikeapro/waha/raw/core/examples/video.mp4"
    },
    convert: false
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
```php { title="send-video.php" }
<?php
$url = "http://localhost:3000/api/sendVideo";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "caption" => "Watch this video!",
    "asNote" => false,
    "file" => [
        "mimetype" => "video/mp4",
        "filename" => "video.mp4",
        "url" => "https://github.com/devlikeapro/waha/raw/core/examples/video.mp4"
    ],
    "convert" => false
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