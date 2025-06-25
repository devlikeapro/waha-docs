Here's how you can **Generate and Set Api Key**:

1. Generate **Api Key** using uuid4 and remove `-` from it (or find a tool online)
```bash
uuidgen | tr -d '-'
> 00000000000000000000000000000000
```

{{< callout context="tip" title="Remember Api Key" icon="outline/shield-check" >}}
`00000000000000000000000000000000` - **Api Key** that you need to send in `X-Api-Key` header, keep it in secret.
{{< /callout >}}

2. Hash it using **sha512** (or find a tool online)
```bash
echo -n "00000000000000000000000000000000" | shasum -a 512
> 98b6d128682e280b74b324ca82a6bae6e8a3f7174e0605bfd52eb9948fad8984854ec08f7652f32055c4a9f12b69add4850481d9503a7f2225501671d6124648  -
```

Set 
`WAHA_API_KEY=sha512:{SHA512_HEX_HASH}` in docker (or in `docker-compose.yaml` or `.env`):

```bash
docker run -it -e WAHA_API_KEY=sha512:98b6d128682e280b74b324ca82a6bae6e8a3f7174e0605bfd52eb9948fad8984854ec08f7652f32055c4a9f12b69add4850481d9503a7f2225501671d6124648 devlikeapro/waha-plus
```

3. Test API works as expected
```bash
# No Key
curl http://localhost:3000/api/sessions
> {"message":"Unauthorized","statusCode":401}

# Wrong Key
curl -H 'X-Api-Key: othersecret' http://localhost:3000/api/sessions
> {"message":"Unauthorized","statusCode":401}

# Right Key
curl -H 'X-Api-Key: 00000000000000000000000000000000' http://localhost:3000/api/sessions
> []
```
