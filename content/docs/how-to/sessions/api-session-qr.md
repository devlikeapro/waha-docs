<div></div>

{{< tabs "qr-code-api" "language" >}}

{{< tab "cURL" >}}
```sh
# Get binary image
curl -X 'GET' \
  'http://localhost:3000/api/default/auth/qr' \
  -H 'accept: image/png' \
  -H 'X-Api-Key: yoursecretkey' \
  --output qr-code.png

# Get base64 image
curl -X 'GET' \
  'http://localhost:3000/api/default/auth/qr' \
  -H 'accept: application/json' \
  -H 'X-Api-Key: yoursecretkey'

# Get raw QR code value
curl -X 'GET' \
  'http://localhost:3000/api/default/auth/qr?format=raw' \
  -H 'accept: application/json' \
  -H 'X-Api-Key: yoursecretkey'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

# Get binary image
url = "http://localhost:3000/api/default/auth/qr"
headers = {
    "accept": "image/png",
    "X-Api-Key": "yoursecretkey"
}

response = requests.get(url, headers=headers)
with open("qr-code.png", "wb") as f:
    f.write(response.content)

# Get base64 image
url = "http://localhost:3000/api/default/auth/qr"
headers = {
    "accept": "application/json",
    "X-Api-Key": "yoursecretkey"
}

response = requests.get(url, headers=headers)
print(response.json())

# Get raw QR code value
url = "http://localhost:3000/api/default/auth/qr?format=raw"
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
const fs = require('fs');

// Get binary image
const getBinaryImage = async () => {
    const url = "http://localhost:3000/api/default/auth/qr";
    const headers = {
        'accept': 'image/png',
        'X-Api-Key': 'yoursecretkey'
    };
    
    const response = await axios.get(url, { 
        headers, 
        responseType: 'arraybuffer' 
    });
    
    fs.writeFileSync('qr-code.png', response.data);
};

// Get base64 image
const getBase64Image = async () => {
    const url = "http://localhost:3000/api/default/auth/qr";
    const headers = {
        'accept': 'application/json',
        'X-Api-Key': 'yoursecretkey'
    };
    
    const response = await axios.get(url, { headers });
    console.log(response.data);
};

// Get raw QR code value
const getRawQRCode = async () => {
    const url = "http://localhost:3000/api/default/auth/qr?format=raw";
    const headers = {
        'accept': 'application/json',
        'X-Api-Key': 'yoursecretkey'
    };
    
    const response = await axios.get(url, { headers });
    console.log(response.data);
};

// Call the functions
getBinaryImage().catch(console.error);
getBase64Image().catch(console.error);
getRawQRCode().catch(console.error);
```
{{< /tab >}}

{{< tab "PHP" >}}
```php
<?php
// Get binary image
$url = "http://localhost:3000/api/default/auth/qr";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: image/png',
    'X-Api-Key: yoursecretkey'
]);
$response = curl_exec($ch);
curl_close($ch);

file_put_contents('qr-code.png', $response);

// Get base64 image
$url = "http://localhost:3000/api/default/auth/qr";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: application/json',
    'X-Api-Key: yoursecretkey'
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;

// Get raw QR code value
$url = "http://localhost:3000/api/default/auth/qr?format=raw";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: application/json',
    'X-Api-Key: yoursecretkey'
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
?>
```
{{< /tab >}}

{{< /tabs >}}