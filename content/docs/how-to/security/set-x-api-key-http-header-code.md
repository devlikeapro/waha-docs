<div></div>

{{< tabs "set-x-api-key-http-header" "language" >}}

{{< tab "cURL" >}}
```bash { title="Set X Api Key Http Header" }
curl -X 'GET' \
  'http://localhost:3000/api/sessions' \
  -H 'accept: application/json' \
  -H 'X-Api-Key: yoursecretkey'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="set-x-api-key-http-header.py" }
import requests

headers = {
  'Content-type': 'application/json',
  'X-Api-Key': 'yoursecretkey',
}
response = requests.get("http://localhost:3000/api/sessions", headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="set-x-api-key-http-header.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sessions";
const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'yoursecretkey'
};

axios.get(url, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="set-x-api-key-http-header.php" }
<?php
$url = "http://localhost:3000/api/sessions";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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
