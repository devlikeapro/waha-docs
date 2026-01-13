<div></div>

{{< tabs "start-session-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Start" }
curl -X 'POST' \
  'http://localhost:3000/api/sessions/default/start' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-start.py" }
import requests

url = "http://localhost:3000/api/sessions/default/start"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}

response = requests.post(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-start.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sessions/default/start";
const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'yoursecretkey'
};

axios.post(url, {}, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="session-start.php" }
<?php
$url = "http://localhost:3000/api/sessions/default/start";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
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