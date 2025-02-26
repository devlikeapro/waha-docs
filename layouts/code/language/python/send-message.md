### Send Message

```python
import requests

url = "http://localhost:3000/api/sendText"
data = {
    "session": "default",
    "chatId": "12132132130@newsletter",
    "text": "Hi there!"
}
response = requests.post(url, json=data)
response.raise_for_status()
```