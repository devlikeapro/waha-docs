<div></div>

{{< tabs "list-sessions-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session List" }
# List active sessions
curl -X 'GET' \
  'http://localhost:3000/api/sessions' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'accept: application/json' \

# List all sessions (including stopped)
curl -X 'GET' \
  'http://localhost:3000/api/sessions?all=true' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'accept: application/json' \
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-list.py" }
import requests

# List active sessions
url = "http://localhost:3000/api/sessions"
headers = {
    "X-Api-Key": "yoursecretkey",
    "accept": "application/json",
}

response = requests.get(url, headers=headers)
print(response.json())

# List all sessions (including stopped)
url = "http://localhost:3000/api/sessions?all=true"
headers = {
    "X-Api-Key": "yoursecretkey",
    "accept": "application/json",
}

response = requests.get(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-list.js" }
const axios = require('axios');

// List active sessions
const getActiveSessions = async () => {
    const url = "http://localhost:3000/api/sessions";
    const headers = {
        'X-Api-Key': 'yoursecretkey',
        'accept': 'application/json',
    };
    
    const response = await axios.get(url, { headers });
    console.log(response.data);
};

// List all sessions (including stopped)
const getAllSessions = async () => {
    const url = "http://localhost:3000/api/sessions?all=true";
    const headers = {
        'X-Api-Key': 'yoursecretkey',
        'accept': 'application/json',
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
```php { title="session-list.php" }
<?php
// List active sessions
$url = "http://localhost:3000/api/sessions";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Api-Key: yoursecretkey',
    'accept: application/json',
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
    'X-Api-Key: yoursecretkey',
    'accept: application/json',
]);
$response = curl_exec($ch);
curl_close($ch);

echo "\nAll sessions (including stopped):\n";
echo $response;
?>
```
{{< /tab >}}

{{< /tabs >}}