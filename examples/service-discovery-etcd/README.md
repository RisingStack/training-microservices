# Service Discovery with etcd

## Step 1.

```sh
PORT=3000 node service1
node service2
```

Watch `service2` stdout.

## Step 2.

Kill `service1`

Watch `service2` stdout.

## Step 3

```sh
PORT=3001 node service1
```

Watch `service2` stdout.
