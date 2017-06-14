# Example Healthz

## Goal

Provide a health check endpoint: `/healthz`

## Steps

1. Run Redis: see below
2. `npm install` and `npm start`
3. Call http://localhost:3001/healthz
4. Stop redis
5. Call http://localhost:3001/healthz

## Requirements

- Docker / Redis

## Redis

### Run

```sh
docker run -p 6379:6379 redis
```

## Result

First call: status code 200
Second call: status code 500
