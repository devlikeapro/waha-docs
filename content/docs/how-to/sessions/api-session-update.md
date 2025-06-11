<div></div>

{{< tabs "update-session-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'PUT' \
  'http://localhost:3000/api/sessions/default' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
  -d '{
  "name": "default",
  "config": {
    "webhooks": [
      {
        "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
        "events": [
          "message"
        ]
      }
    ]
  }
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/sessions/default"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}
data = {
    "name": "default",
    "config": {
        "webhooks": [
            {
                "url": "https://webhook.site/11111111-1111-1111-1111-11111111",
                "events": [
                    "message"
                ]
            }
        ]
    }
}

response = requests.put(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript
const axios = require('axios');

const url = "http://localhost:3000/api/sessions/default";
const data = {
    name: "default",
    config: {
        webhooks: [
            {
                url: "https://webhook.site/11111111-1111-1111-1111-11111111",
                events: [
                    "message"
                ]
            }
        ]
    }
};
const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'yoursecretkey'
};

axios.put(url, data, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php
<?php
$url = "http://localhost:3000/api/sessions/default";
$data = [
    "name" => "default",
    "config" => [
        "webhooks" => [
            [
                "url" => "https://webhook.site/11111111-1111-1111-1111-11111111",
                "events" => [
                    "message"
                ]
            ]
        ]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
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