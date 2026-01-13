<div></div>

{{< tabs "star-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Star" }
curl -X 'PUT' \
  'http://localhost:3000/api/star' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "session": "default",
  "messageId": "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
  "chatId": "12132132130@c.us",
  "star": true
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="star.py" }
import requests

url = "http://localhost:3000/api/star"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Content-Type": "application/json",
}
data = {
    "session": "default",
    "messageId": "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
    "chatId": "12132132130@c.us",
    "star": True
}

response = requests.put(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="star.js" }
const axios = require('axios');

const url = "http://localhost:3000/api/star";
const data = {
    session: "default",
    messageId: "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
    chatId: "12132132130@c.us",
    star: true
};
const headers = {
    'X-Api-Key': 'yoursecretkey',
    'Content-Type': 'application/json',
};

axios.put(url, data, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="star.php" }
<?php
$url = "http://localhost:3000/api/star";
$data = [
    "session" => "default",
    "messageId" => "false_12132132130@c.us_AAAAAAAAAAAAAAAAAAAA",
    "chatId" => "12132132130@c.us",
    "star" => true
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
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