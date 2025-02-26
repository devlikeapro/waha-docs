### Send Message
```javascript
const axios = require('axios');

const url = "http://localhost:3000/api/sendText";
const data = {
    session: "default",
    chatId: "12132132130@c.us",
    text: "Hi there!"
};

axios.post(url, data)
    .then(response => console.log(response.data))
    .catch(error => console.error(error));
```