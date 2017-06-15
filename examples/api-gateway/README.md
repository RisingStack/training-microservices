# Example API Gateway

## Goal

Provide an example for various API Gateway approaches.

## Steps

1. `npm install` and `npm start`
2. Call http://localhost:3001/service1
3. Call http://localhost:3001/service2
4. Call http://localhost:3001
5. Call `curl -H "Content-Type:application/xml" http://localhost:3001`

## Result

- First call proxies request to service 1
- Second call proxies request to service 1
- Third call merges response from multiple services
- Fourth call transforms response
- Fifth call responses in XML format
