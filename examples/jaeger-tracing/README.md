# Example Jaeger Tracing

## Goal

Distributed tracing with [Jaeger](http://jaeger.readthedocs.io) and [OpenTracing](http://opentracing.io/).

## Steps

1. Run Jaeger: see below
2. Visit your running Jaeger
3. `npm start`
  3.1. if you get `Error: Cannot find module '../common/bootstrap'`
  3.2. run `rm -rf node_modules package-lock.json && npm i`
4. open: http://localhost:3001/
5. Visit your running Jaeger: http://localhost:16686
6. Check out context and instrumentations: https://github.com/RisingStack/jaeger-node

## Requirements

- Docker

## Jaeger

### Run

```sh
docker run -d -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p5778:5778 -p16686:16686 -p14268:14268 jaegertracing/all-in-one:latest
```

[Visit Jaeger: http://localhost:16686](http://localhost:16686)

## Result

![Jaeger Tracing](/examples/jaeger-tracing/jaeger-tracing.png)
