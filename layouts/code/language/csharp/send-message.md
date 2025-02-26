### Send Message
```cs
using System;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;

var client = new HttpClient();
var url = "http://localhost:3000/api/sendText";
var data = new
{
    session = "default",
    chatId = "12132132130@c.us",
    text = "Hi there!"
};
var response = await client.PostAsJsonAsync(url, data);
response.EnsureSuccessStatusCode();
```