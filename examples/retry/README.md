# Example Retry

## Goal

Client retry requests to succeed.

## Steps

1. `npm install` and `npm start`
2. Watch the output and observe exponential backoff

## Result

```
1. Request started
1. Making request, after 0ms, Runs for 1. time.
1. Request finished with: success {"status":"ok"}
2. Request started
2. Making request, after 0ms, Runs for 1. time.
2. Request failed: retry, Runs for 1. time
2. Making request, after 1013ms, Runs for 2. time.
2. Retried after 1004ms
2. Request failed: retry, Runs for 2. time
2. Making request, after 3022ms, Runs for 3. time.
2. Retried after 2005ms
2. Request failed: retry, Runs for 3. time
2. Making request, after 7027ms, Runs for 4. time.
2. Retried after 4001ms
2. Request finished with: success {"status":"ok"}
```
