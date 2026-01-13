<div></div>

{{< tabs "pairing-code-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Pairing" }
curl -X 'POST' \
  'http://localhost:3000/api/default/auth/request-code' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "phoneNumber": "12132132130"
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-pairing.py" }
import requests

url = "http://localhost:3000/api/default/auth/request-code"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "phoneNumber": "12132132130"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-pairing.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/default/auth/request-code";
const data = {
    phoneNumber: "12132132130"
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
```php { title="session-pairing.php" }
<?php
$url = "http://localhost:3000/api/default/auth/request-code";
$data = [
    "phoneNumber" => "12132132130"
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