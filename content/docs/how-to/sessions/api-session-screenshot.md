<div></div>

{{< tabs "screenshot-api" "language" >}}

{{< tab "cURL" >}}
```sh
# Get binary image
curl -X 'GET' \
  'http://localhost:3000/api/screenshot?session=default' \
  -H 'accept: image/png' \
  -H 'X-Api-Key: yoursecretkey' \
  --output screenshot.png

# Get base64 image
curl -X 'GET' \
  'http://localhost:3000/api/screenshot?session=default' \
  -H 'accept: application/json' \
  -H 'X-Api-Key: yoursecretkey'
```
{{< /tab >}}

{{< tab "Python" >}}
```python
import requests

# Get binary image
url = "http://localhost:3000/api/screenshot?session=default"
headers = {
    "accept": "image/png",
    "X-Api-Key": "yoursecretkey"
}

response = requests.get(url, headers=headers)
with open("screenshot.png", "wb") as f:
    f.write(response.content)

# Get base64 image
url = "http://localhost:3000/api/screenshot?session=default"
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
    const url = "http://localhost:3000/api/screenshot?session=default";
    const headers = {
        'accept': 'image/png',
        'X-Api-Key': 'yoursecretkey'
    };
    
    const response = await axios.get(url, { 
        headers, 
        responseType: 'arraybuffer' 
    });
    
    fs.writeFileSync('screenshot.png', response.data);
};

// Get base64 image
const getBase64Image = async () => {
    const url = "http://localhost:3000/api/screenshot?session=default";
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
```
{{< /tab >}}

{{< tab "PHP" >}}
```php
<?php
// Get binary image
$url = "http://localhost:3000/api/screenshot?session=default";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'accept: image/png',
    'X-Api-Key: yoursecretkey'
]);
$response = curl_exec($ch);
curl_close($ch);

file_put_contents('screenshot.png', $response);

// Get base64 image
$url = "http://localhost:3000/api/screenshot?session=default";

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