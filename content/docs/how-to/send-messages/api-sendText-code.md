<div></div>

{{< tabs "send-text-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Send Text" }
curl -X 'POST' \
  'http://localhost:3000/api/sendText' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "text": "Hi there!"
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="send-text.py" }
import requests

url = "http://localhost:3000/api/sendText"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "text": "Hi there!"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-text.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sendText";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    text: "Hi there!"
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
```php { title="send-text.php" }
<?php
$url = "http://localhost:3000/api/sendText";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "text" => "Hi there!"
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
