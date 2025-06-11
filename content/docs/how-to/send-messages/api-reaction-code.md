<div></div>

{{< tabs "reaction-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'PUT' \
  'http://localhost:3000/api/reaction' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
  -d '{
  "session": "default",
  "messageId": "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
  "reaction": "👍"
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/reaction"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}
data = {
    "session": "default",
    "messageId": "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
    "reaction": "👍"
}

response = requests.put(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript
const axios = require('axios');

const url = "http://localhost:3000/api/reaction";
const data = {
    session: "default",
    messageId: "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
    reaction: "👍"
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
$url = "http://localhost:3000/api/reaction";
$data = [
    "session" => "default",
    "messageId" => "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
    "reaction" => "👍"
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