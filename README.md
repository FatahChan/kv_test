## Experiment Variant using IP
This project demonstrate storing a value on a radis database to using the ip address of the user as the key, and stores the value as a radis hash, and it won't update again unless it expires

## Getting Started

First, Create a vercel project and link it to this projct

```
npm install -g vercel
vercel link
```
Second, create a vercel KV instance

Third, Add the following keys to `.env.development.local` file, values should added from vercel KV dashboard

```
KV_REST_API_READ_ONLY_TOKEN=""
KV_REST_API_TOKEN=""
KV_REST_API_URL=""
KV_URL=""
```
