# Example Retry

## Goal

Client retry requests to succeed.

## Steps

1. `npm install` and `npm start`
2. Watch the output and observe exponential backoff and idempotency:
  1.1 First request succeeds
  1.2 Second request fails, succeeds on retry
  1.3 Second request is sent again with same idempotency key, side effect does not occur.

## Result

```
Client 1. Request started
Client 1. Making request, after 0ms, Runs for 1. time.
Server 1. respond with: success, idempotencyKey: 920e3370-7751-11e7-b8b5-eb704cafc995
Client 1. Request finished with: success {"status":"ok"}
Client 2. Request started
Client 2. Making request, after 0ms, Runs for 1. time.
Server 2. respond with: error, idempotencyKey: 920d2200-7751-11e7-b8b5-eb704cafc995
Client 2. Request failed: retry, Runs for 1. time
Client 2. Making request, after 1015ms, Runs for 2. time.
Client 2. Retried after 1006ms
Server 2. respond with: success, idempotencyKey: 920d2200-7751-11e7-b8b5-eb704cafc995
Client 2. Request finished with: success {"status":"ok"}
Client 3. Request started
Client 3. Making request, after 0ms, Runs for 1. time.
Server 3. request already served, respond with: success, idempotencyKey: 920d2200-7751-11e7-b8b5-eb704cafc995
Client 3. Request finished with: success {"status":"ok"}
```
