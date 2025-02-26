### Send Message
```java
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

public class WhatsAppClient {
    public static void main(String[] args) {
        String url = "http://localhost:3000/api/sendText";

        HttpResponse<JsonNode> response = Unirest.post(url)
            .header("Content-Type", "application/json")
            .body("{\"session\": \"default\", \"chatId\": \"12132132130@c.us\", \"text\": \"Hi there!\"}")
            .asJson();

        System.out.println(response.getBody());
    }
}
            
```