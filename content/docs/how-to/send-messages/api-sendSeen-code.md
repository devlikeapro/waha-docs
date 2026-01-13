<div></div>

{{< tabs "send-seen-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Send Seen" }
curl -X 'POST' \
  'http://localhost:3000/api/sendSeen' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us"
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="send-seen.py" }
import requests

url = "http://localhost:3000/api/sendSeen"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-seen.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sendSeen";
const data = {
    session: "default",
    chatId: "12132132130@c.us"
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
```php { title="send-seen.php" }
<?php
$url = "http://localhost:3000/api/sendSeen";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us"
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