<div></div>

{{< tabs "logout-session-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Logout" }
curl -X 'POST' \
  'http://localhost:3000/api/sessions/default/logout' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-logout.py" }
import requests

url = "http://localhost:3000/api/sessions/default/logout"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}

response = requests.post(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-logout.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sessions/default/logout";
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
```php { title="session-logout.php" }
<?php
$url = "http://localhost:3000/api/sessions/default/logout";

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