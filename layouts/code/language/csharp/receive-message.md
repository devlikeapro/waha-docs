```cs
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapPost("/bot", async (HttpContext context) =>
{
    var data = await JsonSerializer.DeserializeAsync<JsonElement>(context.Request.Body);
    if (data.GetProperty("event").GetString() != "message")
    {
        // Process message, save it, respond, etc.
        ProcessMessage(data.GetProperty("payload"));
    }
    await context.Response.WriteAsync("OK");
});

app.Run();
```
