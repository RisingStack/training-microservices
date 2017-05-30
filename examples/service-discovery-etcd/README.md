# Service Discovery with etcd

## Intro

Demonstration of service registration,

WARNING: you don't want to do this in production as it doesn't do load balancing and doesn't support multiple instances.
In the real world you can use a HAProxy combined with etcd, for every new service registration you can update HAProxy configuration and reach your service through HAProxy with load balancing.

## Preparation

**Installing etcd on OSX**

```sh
brew update
brew install etcd etcdctl
```

**Run etcd with Docker**

```sh
docker run -d -p 2379:2379 -p 2380:2380 appcelerator/etcd
```

## Example

### Step 1.

```sh
PORT=3000 node service1
node service2
```

Watch `service2` stdout.

### Step 2.

Kill `service1`

Watch `service2` stdout.

### Step 3

```sh
PORT=3001 node service1
```

Watch `service2` stdout.
