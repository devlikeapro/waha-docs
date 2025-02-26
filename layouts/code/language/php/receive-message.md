### Receive Message
```php
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    if ($data["event"] !== "message") {
        processMessage($data["payload"]);
    }
    echo "OK";
}
?>
            
```