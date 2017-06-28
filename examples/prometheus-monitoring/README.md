# Example Prometheus Monitoring

## Goal

Setup monitoring with [Prometheus](https://prometheus.io) and [Grafana](https://grafana.com/).

## Steps

1. Run sample server: `npm install` and `node server`
2. Run Prometheus: see below
3. Visit your running Prometheus and run queries
4. Run Grafana: see below
5. Import `grafana-dashboard.json` dashboard
6. Create your own dashboard from the Prometheus queries

## Requirements

- Docker

## Prometheus

### Run

Unix:
```sh
docker run -p 9090:9090 -v $(pwd)/prometheus-data:/prometheus-data prom/prometheus -config.file=/prometheus-data/prometheus.yml
```
Windows: 
```sh
docker run -p 9090:9090 -v "$pwd/prometheus-data:/prometheus-data prom/prometheus" -config.file=/prometheus-data/prometheus.yml
```

Host machine IP address: 
UNIX: `ifconfig | grep 'inet 192'| awk '{ print $2}'`
Windows: `docker-machine ip`
Modify: `/prometheus-data/prometheus.yml`, replace `192.168.0.10` with your own host machine's IP.

Necessary when you modified prometheus-data.

```sh
curl -X POST http://localhost:9090/-/reload
```

[Open Prometheus: http://localhost:9090](http://localhost:9090/graph)

### Queries

- RPM: `sum(rate(http_requests_total[15s])) by (service)  * 60`
- Response time: `avg(rate(http_request_duration_ms_sum[1m]) / rate(http_request_duration_ms_count[1m])) by (service, route)`
- Memory usage in MB: `avg(nodejs_external_memory_bytes / 1024) by (service)`

### Reload config

Necessary when you modified prometheus-data.

```sh
curl -X POST http://localhost:9090/-/reload
```

## Grafana

### Run

```sh
docker run -i -p 3000:3000 grafana/grafana
```

[Open Grafana: http://localhost:3000](http://localhost:3000)

```
Username: admin
Password: admin
```

### Result

![Grafaba Dashboard](/examples/prometheus-monitoring/grafana-dashboard.png)
