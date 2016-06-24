# Wittr

This is a silly little demo app for an offline-first course.

## Order of quizes

1. task-register-sw-work
2. task-custom-response-work
3. gif-response-work
4. error-handling-work
5. task-install-work
6. task-cache-response-work
7. task-handling-updates-work
8. new-cache-used-work
9. task-update-notify-work
10. task-update-reload-work
11. task-page-skeleton-work

# Installing

Dependencies:

* [Node.js](https://nodejs.org/en/) v0.21.7 or above

Then check out the project and run:

```sh
npm install
```

# Running

```sh
npm run serve
```

You should now have the app server at [localhost:8888](http://localhost:8888) and the config server at [localhost:8889](http://localhost:8888).

You can also configure the ports:

```sh
npm run serve -- --server-port=8000 --config-server-port=8001
```