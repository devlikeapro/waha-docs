<div></div>

{{< tabs "qr-code-api" "language" >}}

{{< tab "cURL" >}}
```bash { title="Session Qr" }
# Get binary image
curl -X 'GET' \
  'http://localhost:3000/api/default/auth/qr' \
  -H 'X-Api-Key: yoursecretkey' \
  -H 'Accept: image/png' \
  --output qr-code.png

# Get base64 image
curl -X 'GET' \
  'http://localhost:3000/api/default/auth/qr' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'Accept: application/json' \

# Get raw QR code value
curl -X 'GET' \
  'http://localhost:3000/api/default/auth/qr?format=raw' \
  -H 'X-Api-Key: yoursecretkey'
  -H 'Accept: application/json' \
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="session-qr.py" }
import requests

# Get binary image
url = "http://localhost:3000/api/default/auth/qr"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Accept": "image/png",
}

response = requests.get(url, headers=headers)
with open("qr-code.png", "wb") as f:
    f.write(response.content)

# Get base64 image
url = "http://localhost:3000/api/default/auth/qr"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)
print(response.json())

# Get raw QR code value
url = "http://localhost:3000/api/default/auth/qr?format=raw"
headers = {
    "X-Api-Key": "yoursecretkey",
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)
print(response.json())
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="session-qr.js" }
const axios = require('axios');
const fs = require('fs');

// Get binary image
const getBinaryImage = async () => {
    const url = "http://localhost:3000/api/default/auth/qr";
    const headers = {
        'X-Api-Key': 'yoursecretkey',
        'Accept': 'image/png',
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
        'X-Api-Key': 'yoursecretkey',
        'Accept': 'application/json',
    };
    
    const response = await axios.get(url, { headers });
    console.log(response.data);
};

// Get raw QR code value
const getRawQRCode = async () => {
    const url = "http://localhost:3000/api/default/auth/qr?format=raw";
    const headers = {
        'X-Api-Key': 'yoursecretkey',
        'Accept': 'application/json',
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
```php { title="session-qr.php" }
<?php
// Get binary image
$url = "http://localhost:3000/api/default/auth/qr";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Api-Key: yoursecretkey',
    'Accept: image/png',
]);
$response = curl_exec($ch);
curl_close($ch);

file_put_contents('qr-code.png', $response);

// Get base64 image
$url = "http://localhost:3000/api/default/auth/qr";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'X-Api-Key: yoursecretkey',
    'Accept: application/json',
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;

// Get raw QR code value
$url = "http://localhost:3000/api/default/auth/qr?format=raw";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
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