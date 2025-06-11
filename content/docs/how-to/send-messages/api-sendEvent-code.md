<div></div>

{{< tabs "send-event-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'POST' \
  'http://localhost:3000/api/default/events' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
  -d '{
  "chatId": "12132132130@c.us",
  "event": {
    "title": "Team Meeting",
    "description": "Monthly team sync-up",
    "location": "Conference Room A",
    "startTime": "2023-12-15T10:00:00Z",
    "endTime": "2023-12-15T11:00:00Z"
  }
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/default/events"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}
data = {
    "chatId": "12132132130@c.us",
    "event": {
        "title": "Team Meeting",
        "description": "Monthly team sync-up",
        "location": "Conference Room A",
        "startTime": "2023-12-15T10:00:00Z",
        "endTime": "2023-12-15T11:00:00Z"
    }
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript
const axios = require('axios');

const url = "http://localhost:3000/api/default/events";
const data = {
    chatId: "12132132130@c.us",
    event: {
        title: "Team Meeting",
        description: "Monthly team sync-up",
        location: "Conference Room A",
        startTime: "2023-12-15T10:00:00Z",
        endTime: "2023-12-15T11:00:00Z"
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
$url = "http://localhost:3000/api/default/events";
$data = [
    "chatId" => "12132132130@c.us",
    "event" => [
        "title" => "Team Meeting",
        "description" => "Monthly team sync-up",
        "location" => "Conference Room A",
        "startTime" => "2023-12-15T10:00:00Z",
        "endTime" => "2023-12-15T11:00:00Z"
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