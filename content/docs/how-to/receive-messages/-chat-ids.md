<div></div>

- `111111111111111@lid` - **user accounts (LID)** - hidden user ID, the main ID WhatsApp uses for direct chats now.
Incoming direct messages usually come from `@lid` - reply to the same `from` you received.
Use [**👤 Contacts - Lids API**]({{< relref "/docs/how-to/contacts/#api---lids" >}}) to get the phone number for it.
- `123123123@c.us` -  **user accounts (phone number)** - international phone number without + at the start and add `@c.us` at the end. 
For phone number `12132132131` the `chatId` is  `12132132131@c.us`
- `123123123@s.whatsapp.net` can also appear in **internal** `_data` field for **GOWS, NOWEB**. Convert it to `@c.us` to work with that properly. Kindly don't use it in `chatId` when sending messages
- `12312312123133@g.us` - for [**👥 Groups**]({{< relref "/docs/how-to/groups" >}})
- `12312312123133@newsletter` - for [**📢 Channels**]({{< relref "/docs/how-to/channels" >}})
- `status@broadcast` - for [**🟢 Status**]({{< relref "/docs/how-to/status" >}}) 
