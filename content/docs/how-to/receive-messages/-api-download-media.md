<div></div>

{{< tabs "download-media-api" "language" >}}
{{< tab "cURL" >}}
```bash { title="Download Media" }
curl -H "X-Api-Key: yoursecretkey" \
    -O http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg
```
{{< /tab >}}

{{< tab "Python" >}}
```python { title="download-media.py" }
import requests

url = "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg"
headers = {
  'X-Api-Key': 'yoursecretkey',
}

response = requests.get(url, headers=headers)
response.raise_for_status()

with open("media.jpg", "wb") as file:
  file.write(response.content)
```
{{< /tab >}}

{{< tab "JavaScript" >}}
```javascript { title="download-media.js" }
const fs = require('fs');
const url = "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg";

const headers = {
  'X-Api-Key': 'yoursecretkey',
};

fetch(url, { headers })
  .then((response) => response.arrayBuffer())
  .then((data) => fs.writeFileSync('media.jpg', Buffer.from(data)))
  .catch((error) => console.error(error));
```
{{< /tab >}}

{{< tab "PHP" >}}
```php { title="download-media.php" }
<?php
$url = "http://localhost:3000/api/files/true_11111111111@c.us_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA.jpg";

$context = stream_context_create([
  'http' => [
    'header' => "X-Api-Key: yoursecretkey\r\n"
  ]
]);

$data = file_get_contents($url, false, $context);
file_put_contents("media.jpg", $data);
?>
```
{{< /tab >}}

{{< /tabs >}}
