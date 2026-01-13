<div></div>

{{< tabs "delete-session-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Delete" }
curl -X 'DELETE' \
  'http://localhost:3000/api/sessions/default' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'Accept: application/json' \
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-delete.py" }
import requests

url = "http://localhost:3000/api/sessions/default"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Accept": "application/json",
}

response = requests.delete(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-delete.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/sessions/default";
const headers = {
    'X-Api-Key': 'yoursecretkey',
    'Accept': 'application/json',
};

axios.delete(url, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="session-delete.php" }
<?php
$url = "http://localhost:3000/api/sessions/default";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
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