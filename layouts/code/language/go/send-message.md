```cs
package main

import (
    "bytes"
    "encoding/json"
    "net/http"
)

type Message struct {
    Session string `json:"session"`
    ChatID  string `json:"chatId"`
    Text    string `json:"text"`
}

func main() {
    url := "http://localhost:3000/api/sendText"
    msg := Message{Session: "default", ChatID: "12132132130@c.us", Text: "Hi there!"}
    jsonData, _ := json.Marshal(msg)

    resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()
}
```
