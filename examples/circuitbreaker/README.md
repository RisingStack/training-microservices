# Example Circuit Breaker

## Goal

Demonstrate Circuit Breaker.

## Steps

1. `npm install` and `npm start`
2. Call http://localhost:3001
3. Call http://localhost:3001?fail=true multiple times until you don't get "Circuit breaker is active" message

## Result

```
Resource error -> Circuit breaker is active
```
