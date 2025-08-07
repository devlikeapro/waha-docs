```java
import io.javalin.Javalin;
import io.javalin.http.Context;
import org.json.JSONObject;

public class WhatsAppWebhook {
    public static void main(String[] args) {
        Javalin app = Javalin.create().start(7000);

        app.post("/bot", WhatsAppWebhook::handleWebhook);
    }

    private static void handleWebhook(Context ctx) {
        JSONObject json = new JSONObject(ctx.body());
        if (!"message".equals(json.getString("event"))) {
            processMessage(json.getJSONObject("payload"));
        }
        ctx.result("OK");
    }

    private static void processMessage(JSONObject payload) {
        System.out.println("Received message: " + payload.toString());
    }
}

```
