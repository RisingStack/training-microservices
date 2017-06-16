# Example Swagger

## Goal

Demonstrate documentation based routing and API discovery via Swagger.

## Steps

1. `npm install` and `npm start`
2. Check out `/api/swagger/swagger.yaml` API defintion.
3. Open http://localhost:3001/docs
4. Play with API.
5. Run client `node client`

## Result

![Swagger](/examples/swagger/swagger.png)

**Client output**

```
Get [{"id":1,"title":"RisingStack","url":"https://risingstack.com"},{"id":2,"title":"Twitter","url":"https://twitter.com"}]
Insert {"id":2,"title":"Twitter","url":"https://twitter.com"}
Get [{"id":1,"title":"RisingStack","url":"https://risingstack.com"},{"id":2,"title":"Twitter","url":"https://twitter.com"},{"id":2,"title":"Twitter","url":"https://twitter.com"}]
```
