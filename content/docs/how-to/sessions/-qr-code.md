<div></div>

{{< callout context="caution" title="QR Code Expires!" icon="outline/qrcode" >}}
The first QR code expires in **60 seconds**, then **20 seconds for each subsequent one**, up to **6 QR codes total**.  

After that, the session moves to the `FAILED` status and needs to be restarted.

👉 **General rule:**  
When you receive a `session.status` event with `SCAN_QR_CODE` status, **refresh the QR code** using API.
{{< /callout >}}
