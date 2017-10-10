# Example Circuit Breaker

## Goal

Demonstrate Circuit Breaker.

## Steps

1. `npm install` and `npm start`
2. Call http://localhost:3001
3. Call http://localhost:3001?fail=true multiple times until you don't get "Circuit breaker is active" message
4. `for i in $(seq 0 250); do curl 'http://localhost:3001/?fail=true'; echo; curl 'http://localhost:3001'; echo; done` to test if it actually stops all requests when the circuit breaker is open
## Result

```
Resource error -> Circuit breaker is active
```
