<div></div>

{{< tabs "send-file-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Send File" }
curl -X 'POST' \
  'http://localhost:3000/api/sendFile' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "caption": "Check this out!",
  "file": {
    "mimetype": "application/pdf",
    "filename": "document.pdf",
    "url": "https://raw.githubusercontent.com/devlikeapro/waha/core/examples/document.pdf"
  }
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="send-file.py" }
import requests

url = "http://localhost:3000/api/sendFile"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "caption": "Check this out!",
    "file": {
        "mimetype": "application/pdf",
        "filename": "document.pdf",
        "url": "https://raw.githubusercontent.com/devlikeapro/waha/core/examples/document.pdf"
    }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-file.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sendFile";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    caption: "Check this out!",
    file: {
        mimetype: "application/pdf",
        filename: "document.pdf",
        url: "https://raw.githubusercontent.com/devlikeapro/waha/core/examples/document.pdf"
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
```php { title="send-file.php" }
<?php
$url = "http://localhost:3000/api/sendFile";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "caption" => "Check this out!",
    "file" => [
        "mimetype" => "application/pdf",
        "filename" => "document.pdf",
        "url" => "https://raw.githubusercontent.com/devlikeapro/waha/core/examples/document.pdf"
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