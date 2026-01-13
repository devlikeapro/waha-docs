<div></div>

{{< tabs "get-session-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Get" }
curl -X 'GET' \
  'http://localhost:3000/api/sessions/default' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'accept: application/json' \
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-get.py" }
import requests

url = "http://localhost:3000/api/sessions/default"
headers = {
    "X-Api-Key": "yoursecretkey",
    "accept": "application/json",
}

response = requests.get(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-get.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sessions/default";
const headers = {
    'X-Api-Key': 'yoursecretkey',
    'accept': 'application/json',
};

axios.get(url, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="session-get.php" }
<?php
$url = "http://localhost:3000/api/sessions/default";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Api-Key: yoursecretkey',
    'accept: application/json',
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```
{{< /tab >}}

{{< /tabs >}}