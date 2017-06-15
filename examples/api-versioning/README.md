# Example API Versioning

## Goal

Example for API Versioning with showing two approaches:

- via path
- via headers

## Steps

1. `npm install` and `npm start`
2. Call http://localhost:3001/api/v1/site
3. Call http://localhost:3001/api/v2/site
4. Call `curl -s -H 'accept-version: 1.0.0' localhost:3001/site`
5. Call `curl -s -H 'accept-version: 2.1.0' localhost:3001/site`

## Result

```
{"version":1}
{"version":2}
{"version":1}
{"version":2}
```
