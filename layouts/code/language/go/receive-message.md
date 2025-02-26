### Receive Message
```go
package main

import (
    "fmt"
    "github.com/gofiber/fiber/v2"
)

func main() {
    app := fiber.New()

    app.Post("/bot", func(c *fiber.Ctx) error {
        var data map[string]interface{}
        if err := c.BodyParser(&data); err != nil {
            return err
        }

        if event, ok := data["event"].(string); ok && event == "message" {
            fmt.Println("Received message:", data["payload"])
            // Process message...
        }
        return c.SendString("OK")
    })

    app.Listen(":3000")
}
```