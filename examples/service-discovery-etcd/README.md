# Service Discovery with etcd

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
