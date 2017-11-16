# Example Swagger

## Goal

Demonstrate client driven contract testing with pact.

## Steps

1. `npm install` and `npm start`
2. Check the client and server.
3. `npm run test-consumer`
4. Take a look at the generated files in logs/ and pacts/
5. `npm run test-provider`

## Result

###Consumer

```
[2017-11-16T12:52:12.536Z]  INFO: pact-node@5.2.1/13338 on <machine>.local: 
    Creating Pact Server with options: 
    host = 127.0.0.1,
    port = 1234,
    log = <ABSOLUTE_PATH_TO_DIR>/logs/mockserver-integration.log,
    dir = <ABSOLUTE_PATH_TO_DIR>/pacts,
    spec = 2,
    ssl = false,
    sslcert = false,
    sslkey = false,
    cors = false


  site listing
[2017-11-16T12:52:12.626Z]  INFO: pact-node@5.2.1/13338 on <machine>.local: Creating Pact with PID: 13340
CLIENT: Current sites are: Foo
    ✓ should get site list from server


  1 passing (2s)

[2017-11-16T12:52:14.253Z]  INFO: pact-node@5.2.1/13338 on <machine>.local: Removing Pact with PID: 13340
[2017-11-16T12:52:14.257Z]  INFO: pact-node@5.2.1/13338 on <machine>.local: 
    Deleting Pact Server with options: 
    host = 127.0.0.1,
    port = 1234,
    log = <ABSOLUTE_PATH_TO_DIR>/logs/mockserver-integration.log,
    dir = <ABSOLUTE_PATH_TO_DIR>/pacts,
    spec = 2,
    ssl = false,
    sslcert = false,
    sslkey = false,
    cors = false

```

###Provider

```

[2017-11-16T12:52:15.373Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: Verifying Pacts.
[2017-11-16T12:52:15.378Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: Verifier verify()
SERVER: SiteService listening at 3001
[2017-11-16T12:52:15.390Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: Created Pact Verifier process with PID: 13355
[2017-11-16T12:52:16.296Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: 
    Reading pact at <ABSOLUTE_PATH_TO_DIR>/pacts/client-siteservice.json
    
    
[2017-11-16T12:52:16.296Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: 
    Verifying a pact between client and siteService
      Given it has one site
        a request to retrieve site list
          with GET /sites
            returns a response which
    
[2017-11-16T12:52:16.360Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: 
              has status code 200
    
[2017-11-16T12:52:16.360Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: 
              has a matching body
    
[2017-11-16T12:52:16.362Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: 
    
    1 interaction, 0 failures
    
    
[2017-11-16T12:52:16.362Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: 
    
    
[2017-11-16T12:52:16.396Z]  INFO: pact-node@5.2.1/13353 on <machine>.local: Pact Verification succeeded.
success
```
