<div></div>

{{< tabs "send-location-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'POST' \
  'http://localhost:3000/api/sendLocation' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
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
```python
import requests

url = "http://localhost:3000/api/sendLocation"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
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
```javascript
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