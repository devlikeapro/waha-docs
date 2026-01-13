<div></div>

{{< tabs "get-session-me-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Me" }
curl -X 'GET' \
  'http://localhost:3000/api/sessions/default/me' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'Accept: application/json' \
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-me.py" }
import requests

url = "http://localhost:3000/api/sessions/default/me"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-me.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sessions/default/me";
const headers = {
    'X-Api-Key': 'yoursecretkey',
    'Accept': 'application/json',
};

axios.get(url, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="session-me.php" }
<?php
$url = "http://localhost:3000/api/sessions/default/me";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Api-Key: yoursecretkey',
    'Accept: application/json',
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```
{{< /tab >}}

{{< /tabs >}}