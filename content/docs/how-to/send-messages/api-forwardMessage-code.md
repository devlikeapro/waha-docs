<div></div>

{{< tabs "forward-message-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Forward Message" }
curl -X 'POST' \
  'http://localhost:3000/api/forwardMessage' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "messageId": "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA"
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="forward-message.py" }
import requests

url = "http://localhost:3000/api/forwardMessage"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "messageId": "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="forward-message.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/forwardMessage";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    messageId: "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA"
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
```php { title="forward-message.php" }
<?php
$url = "http://localhost:3000/api/forwardMessage";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "messageId" => "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA"
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