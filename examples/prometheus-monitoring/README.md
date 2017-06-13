## Goal

Setup monitoring with [Prometheus](https://prometheus.io) and [Grafana](https://grafana.com/).

## Prometheus

### Start

```sh
docker run -p 9090:9090 -v /YOUR_PATH/training-microservices/examples/prometheus-monitoring/prometheus-data:/prometheus-data prom/prometheus -config.file=/prometheus-data/prometheus.yml
```

Modify: `/prometheus-data`
Host machine address: `ifconfig | grep 'inet 192'| awk '{ print $2}'`

[Open Prometheus: http://http://localhost:9090](http://http://localhost:9090)

### Queries

- RPM: `sum(rate(http_requests_total[15s])) by (service)  * 60`
- Response time: `avg(rate(http_request_duration_ms_sum[1m]) / rate(http_request_duration_ms_count[1m])) by (service, route)`
- Memory usage in MB: `avg(nodejs_external_memory_bytes / 1024) by (service)`

### Reload config

```sh
curl -X POST http://localhost:9090/-/reload
```

## Grafana

### Run

```sh
docker run -i -p 3000:3000 grafana/grafana
```

[Open Grafana: http://http://localhost:3000](http://http://localhost:3000)

```
Username: admin
Password: admin
```

### Result

![Grafaba Dashboard](/grafana-dashboard.png)
