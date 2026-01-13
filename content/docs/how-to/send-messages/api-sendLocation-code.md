<div></div>

{{< tabs "send-location-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Send Location" }
curl -X 'POST' \
  'http://localhost:3000/api/sendLocation' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "latitude": 38.8937255,
  "longitude": -77.0969763,
  "title": "Our office"
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="send-location.py" }
import requests

url = "http://localhost:3000/api/sendLocation"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "latitude": 38.8937255,
    "longitude": -77.0969763,
    "title": "Our office"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="send-location.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sendLocation";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    latitude: 38.8937255,
    longitude: -77.0969763,
    title: "Our office"
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
```php { title="send-location.php" }
<?php
$url = "http://localhost:3000/api/sendLocation";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "latitude" => 38.8937255,
    "longitude" => -77.0969763,
    "title" => "Our office"
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