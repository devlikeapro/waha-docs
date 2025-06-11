<div></div>

{{< tabs "list-sessions-api" "language" >}}

{{< tab "cURL" >}}
```sh
# List active sessions
curl -X 'GET' \
  'http://localhost:3000/api/sessions' \
  -H 'accept: application/json' \
  -H 'X-Api-Key: yoursecretkey'

# List all sessions (including stopped)
curl -X 'GET' \
  'http://localhost:3000/api/sessions?all=true' \
  -H 'accept: application/json' \
  -H 'X-Api-Key: yoursecretkey'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

# List active sessions
url = "http://localhost:3000/api/sessions"
headers = {
    "accept": "application/json",
    "X-Api-Key": "yoursecretkey"
}

response = requests.get(url, headers=headers)
print(response.json())

# List all sessions (including stopped)
url = "http://localhost:3000/api/sessions?all=true"
headers = {
    "accept": "application/json",
    "X-Api-Key": "yoursecretkey"
}

response = requests.get(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript
const axios = require('axios');

// List active sessions
const getActiveSessions = async () => {
    const url = "http://localhost:3000/api/sessions";
    const headers = {
        'accept': 'application/json',
        'X-Api-Key': 'yoursecretkey'
    };
    
    const response = await axios.get(url, { headers });
    console.log(response.data);
};

// List all sessions (including stopped)
const getAllSessions = async () => {
    const url = "http://localhost:3000/api/sessions?all=true";
    const headers = {
        'accept': 'application/json',
        'X-Api-Key': 'yoursecretkey'
    };
    
    const response = await axios.get(url, { headers });
    console.log(response.data);
};

// Call the functions
getActiveSessions().catch(console.error);
getAllSessions().catch(console.error);
```
{{< /tab >}}

{{< tab "PHP" >}}
```php
<?php
// List active sessions
$url = "http://localhost:3000/api/sessions";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: application/json',
    'X-Api-Key: yoursecretkey'
]);
$response = curl_exec($ch);
curl_close($ch);

echo "Active sessions:\n";
echo $response;

// List all sessions (including stopped)
$url = "http://localhost:3000/api/sessions?all=true";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: application/json',
    'X-Api-Key: yoursecretkey'
]);
$response = curl_exec($ch);
curl_close($ch);

echo "\nAll sessions (including stopped):\n";
echo $response;
?>
```
{{< /tab >}}

{{< /tabs >}}