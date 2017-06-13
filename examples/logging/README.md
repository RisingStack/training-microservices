## Goal

Logging in unified format.

## Steps

1. `npm install` and `npm start`
2. Open http://localhost:3001
3. Check out `stdout`
4. Restart app with `LOG_LEVEL=debug npm start`
5. Open http://localhost:3001
6. Check out `stdout`

## Result

```json
{"severity":"INFO","message":"Server listening on port 3001!"}
{"severity":"DEBUG","message":"HTTP Request received","meta":{"requestId":"5384d2d0-5032-11e7-a06d-797c5385b269","method":"GET","url":"/"}}
{"severity":"DEBUG","message":"Get data for organizations","meta":{"requestId":"5384d2d0-5032-11e7-a06d-797c5385b269","method":"GET","url":"/","orgs":["nodejs","risingstack"]}}
{"meta":{"requestId":"5384d2d0-5032-11e7-a06d-797c5385b269","method":"GET","url":"/","orgRepos":[{"org":"nodejs","repos":["abi-stable-node","abi-stable-node-addon-examples","api","benchmarking","board","build","build-container-sync","build-containers","citgm","code-and-learn","collaboration","community-committee","community-events","contribution-slides","CTC","dev-policy","diagnostics","doc-tool","docker-iojs","docker-node","docs","education","email","evangelism","foundation-slides","foundation.nodejs.org","Future-CI","github-bot","hardware","help"]},{"org":"risingstack","repos":["actionhero","alpine-node-ci","anchor","angular-suite-flipper","async-listener","boar-tasks","cache","codemonster","cqrs-example","docker-codeship-project","docker-node","docker-node-base","emitter-listener","escher-js","escher-keypool-js","escher-suiteapi-js","event-loop-stats","event-sourcing-example","find-port","Ghost","ghost-s3-file-store","graffiti","graffiti-mongoose","graffiti-todo","graphql-server","hapi-twitter-search-plugin","hipchat-cli","hubot-scripts","jaeger-node","koa-helmet"]}]},"severity":"DEBUG","message":"Organization repositories"}
{"severity":"DEBUG","message":"HTTP Request responded","meta":{"requestId":"5384d2d0-5032-11e7-a06d-797c5385b269","method":"GET","url":"/","statusCode":304,"responseTime":1622}}
```
