<div></div>

{{< tabs "send-buttons-api" "language" >}}

{{< tab "cURL" >}}
```sh
curl -X 'POST' \
  'http://localhost:3000/api/sendButtons' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'X-Api-Key: yoursecretkey' \
  -d '{
  "session": "default",
  "chatId": "12132132130@c.us",
  "header": "How are you?",
  "headerImage": {
    "mimetype": "image/jpeg",
    "filename": "filename.jpg",
    "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
  },
  "body": "Tell us how are you please 🙏",
  "footer": "If you have any questions, please send it in the chat",
  "buttons": [
    {
      "type": "reply",
      "text": "I am good!"
    },
    {
      "type": "call",
      "text": "Call us",
      "phoneNumber": "+1234567890"
    },
    {
      "type": "copy",
      "text": "Copy code",
      "copyCode": "4321"
    },
    {
      "type": "url",
      "text": "How did you do that?",
      "url": "https://waha.devlike.pro"
    }
  ]
}'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

url = "http://localhost:3000/api/sendButtons"
headers = {
    "Content-Type": "application/json",
    "X-Api-Key": "yoursecretkey"
}
data = {
    "session": "default",
    "chatId": "12132132130@c.us",
    "header": "How are you?",
    "headerImage": {
        "mimetype": "image/jpeg",
        "filename": "filename.jpg",
        "url": "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
    },
    "body": "Tell us how are you please 🙏",
    "footer": "If you have any questions, please send it in the chat",
    "buttons": [
        {
            "type": "reply",
            "text": "I am good!"
        },
        {
            "type": "call",
            "text": "Call us",
            "phoneNumber": "+1234567890"
        },
        {
            "type": "copy",
            "text": "Copy code",
            "copyCode": "4321"
        },
        {
            "type": "url",
            "text": "How did you do that?",
            "url": "https://waha.devlike.pro"
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

const url = "http://localhost:3000/api/sendButtons";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    header: "How are you?",
    headerImage: {
        mimetype: "image/jpeg",
        filename: "filename.jpg",
        url: "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
    },
    body: "Tell us how are you please 🙏",
    footer: "If you have any questions, please send it in the chat",
    buttons: [
        {
            type: "reply",
            text: "I am good!"
        },
        {
            type: "call",
            text: "Call us",
            phoneNumber: "+1234567890"
        },
        {
            type: "copy",
            text: "Copy code",
            copyCode: "4321"
        },
        {
            type: "url",
            text: "How did you do that?",
            url: "https://waha.devlike.pro"
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
$url = "http://localhost:3000/api/sendButtons";
$data = [
    "session" => "default",
    "chatId" => "12132132130@c.us",
    "header" => "How are you?",
    "headerImage" => [
        "mimetype" => "image/jpeg",
        "filename" => "filename.jpg",
        "url" => "https://github.com/devlikeapro/waha/raw/core/examples/waha.jpg"
    ],
    "body" => "Tell us how are you please 🙏",
    "footer" => "If you have any questions, please send it in the chat",
    "buttons" => [
        [
            "type" => "reply",
            "text" => "I am good!"
        ],
        [
            "type" => "call",
            "text" => "Call us",
            "phoneNumber" => "+1234567890"
        ],
        [
            "type" => "copy",
            "text" => "Copy code",
            "copyCode" => "4321"
        ],
        [
            "type" => "url",
            "text" => "How did you do that?",
            "url" => "https://waha.devlike.pro"
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