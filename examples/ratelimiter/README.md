# Example Rate Limiter

## Goal

Rate limiting API.

## Steps

1. Run Redis: see below
2. `npm install` and `npm start`
3. Call http://localhost:3001 once and check out response headers
4. Call http://localhost:3001 more than 5 times and check out response headers

## Requirements

- Docker / Redis

## Redis

### Run

```sh
docker run -p 6379:6379 redis
```

## Result

```
RateLimit-Limit: 5
RateLimit-Remaining: -1
RateLimit-Reset: 1497362769
Retry-After: 51
```
