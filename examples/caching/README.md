# Example Caching

## Goal

Caching example

## Steps

1. `npm install` and `npm start`
2. Call curl -w "@curl-format.txt" -o /dev/null -s "http://localhost:3001"
3. Call again and compare timing

## Result

```
First call is slower because calls GitHub API.
Second call is faster because it uses cache.
```
