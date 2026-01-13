<div></div>

{{< tabs "restart-session-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Restart" }
curl -X 'POST' \
  'http://localhost:3000/api/sessions/default/restart' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-restart.py" }
import requests

url = "http://localhost:3000/api/sessions/default/restart"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}

response = requests.post(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-restart.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sessions/default/restart";
const headers = {
    'X-Api-Key': 'yoursecretkey',
    'Content-Type': 'application/json',
};

axios.post(url, {}, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="session-restart.php" }
<?php
$url = "http://localhost:3000/api/sessions/default/restart";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
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