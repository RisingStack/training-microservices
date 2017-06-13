## Goal

Distributed tracing with [Jaeger](http://jaeger.readthedocs.io) and [OpenTracing](http://opentracing.io/).

## Steps

1. Run Jaeger: see below
2. Visit your running Jaeger
3. `npm start`
4. open: http://localhost:3001/site
5. Visit your running Jaeger: http://localhost:16686

## Requirements

- Docker

## Jaeger

### Run

```sh
docker run -d -p5775:5775/udp -p6831:6831/udp -p6832:6832/udp -p5778:5778 -p16686:16686 -p14268:14268 jaegertracing/all-in-one:latest
```

[Visit Jaeger: http://localhost:16686](http://localhost:16686)

## Result

![Jaeger Tracing](/examples/jager-tracing/jager-tracing.png)
