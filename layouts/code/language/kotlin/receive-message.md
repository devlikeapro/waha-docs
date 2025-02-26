### Receive Message
```kotlin
import io.ktor.application.*
import io.ktor.features.ContentNegotiation
import io.ktor.jackson.jackson
import io.ktor.request.*
import io.ktor.response.*
import io.ktor.routing.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*

fun main() {
    embeddedServer(Netty, port = 8080) {
        install(ContentNegotiation) {
            jackson()
        }
        routing {
            post("/bot") {
                val data = call.receive<Map<String, Any>>()
                if (data["event"] == "message") {  // Fixed condition logic
                    processMessage(data["payload"])
                }
                call.respondText("OK")
            }
        }
    }.start(wait = true)
}

fun processMessage(payload: Any?) {
    println("Processing message: $payload")
}

```