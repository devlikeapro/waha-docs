<div></div>

{{< tabs "send-contact-vcard-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'POST' \
  'http://localhost:3000/api/sendContactVcard' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "contacts": [
    {
      "fullName": "John Doe",
      "organization": "Company Name",
      "phoneNumber": "+91 11111 11111",
      "whatsappId": "911111111111"
    }
  ]
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/sendContactVcard"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "contacts": [
        {
            "fullName": "John Doe",
            "organization": "Company Name",
            "phoneNumber": "+91 11111 11111",
            "whatsappId": "911111111111"
        }
    ]
}

response = requests.post(url, json=data, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript
const axios = require('axios');

const url = "http://localhost:3000/api/sendContactVcard";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    contacts: [
        {
            fullName: "John Doe",
            organization: "Company Name",
            phoneNumber: "+91 11111 11111",
            whatsappId: "911111111111"
        }
    ]
};
const headers = {
    'Content-Type': 'application/json',
    'X-Api-Key': 'yoursecretkey'
};

axios.post(url, data, { headers })
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php
<?php
$url = "http://localhost:3000/api/sendContactVcard";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "contacts" => [
        [
            "fullName" => "John Doe",
            "organization" => "Company Name",
            "phoneNumber" => "+91 11111 11111",
            "whatsappId" => "911111111111"
        ]
    ]
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
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