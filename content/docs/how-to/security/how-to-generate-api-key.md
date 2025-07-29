1. Generate **Api Key** using uuid4 and remove `-` from it (or find a tool online)
```bash
uuidgen | tr -d '-'
> 00000000000000000000000000000000
```

2. **Hash** it using **sha512** (or find a tool online)
```bash
echo -n "00000000000000000000000000000000" | shasum -a 512
> 98b6d128682e280b74b324ca82a6bae6e8a3f7174e0605bfd52eb9948fad8984854ec08f7652f32055c4a9f12b69add4850481d9503a7f2225501671d6124648  -
```

- `WAHA_API_KEY=sha512:98b6...24648` - SHA512 hash in hex format.
- `X-Api-Key: 0000...0000` - **Api Key** that you need to send in `X-Api-Key` header. 
  - **Keep it in secret**, do not add it to `.env`
