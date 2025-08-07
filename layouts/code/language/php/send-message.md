```php
<?php
$url = "http://localhost:3000/api/sendText";
$data = [
    "session" => "default",
    "chatId" => "12132132130@newsletter",
    "text" => "Hi there!"
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
curl_close($ch);
?>
```
