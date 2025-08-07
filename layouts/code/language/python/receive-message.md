```python
from flask import Flask
from flask import request

app = Flask(__name__)


@app.route("/bot", methods=["POST"])
def whatsapp_webhook():
    data = request.get_json()
    if data["event"] != "message":
        # answer to message, save it, etc
        process_message(data["payload"])
    return "OK"
```
