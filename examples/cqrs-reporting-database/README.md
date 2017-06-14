# Example CQRS: Reporting Database

## Goal

CQRS example: Reporting Database

## Steps

1. Run RabbitMQ, see below
2. `npm install` and `npm start`

## Requirements

- Docker

## RabbitMQ

### Run

```sh
docker run -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

### Management

http://localhost:15672/
guest / guest

## Result

**Inputs**

```
Create user:  { name: 'John Doe', state: 'default' }
Update user's state:  { state: 'churn' }
Rename user:  { name: 'John Smith' }
```
**Outputs**

```
Running...
User in user service database { id: 'aaa', name: 'John Smith', state: 'churn' }
User in Reporting Database { name: 'John Smith' }
```

![Reporting Database](/examples/cqrs-reporting-database/reporting-database.png)
