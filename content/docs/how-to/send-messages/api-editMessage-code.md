<div></div>

{{< tabs "edit-message-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'PUT' \
  'http://localhost:3000/api/default/chats/12132132130%40c.us/messages/true_12132132130%40c.us_AAAAAAAAAAAAAAAAAAAA' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
  -d '{
  "text": "Hello, world! (edited)",
  "linkPreview": true
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/default/chats/12132132130%40c.us/messages/true_12132132130%40c.us_AAAAAAAAAAAAAAAAAAAA"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}
data = {
    "text": "Hello, world! (edited)",
    "linkPreview": True
}

response = requests.put(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript
const axios = require('axios');

const url = "http://localhost:3000/api/default/chats/12132132130%40c.us/messages/true_12132132130%40c.us_AAAAAAAAAAAAAAAAAAAA";
const data = {
    text: "Hello, world! (edited)",
    linkPreview: true
};
const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'yoursecretkey'
};

axios.put(url, data, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php
<?php
$url = "http://localhost:3000/api/default/chats/12132132130%40c.us/messages/true_12132132130%40c.us_AAAAAAAAAAAAAAAAAAAA";
$data = [
    "text" => "Hello, world! (edited)",
    "linkPreview" => true
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
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