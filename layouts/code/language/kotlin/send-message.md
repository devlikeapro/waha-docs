```kotlin
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.http.*

suspend fun sendMessage() {
    val client = HttpClient()
    val response =
        client.post("http://localhost:3000/api/sendText") {
            contentType(ContentType.Application.Json)
            setBody(
                mapOf(
                    "session" to "default",
                    "chatId" to "12132132130@newsletter",
                    "text" to "Hi there!"
                )
            )
        }
    println(response.status)
}
```
