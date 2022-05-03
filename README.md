# Lighthouse Labs | HTTP Cookies and Authentication

* [ ] What is a cookie?
* [ ] Writing and Reading Cookies
* [ ] Basic Web Authentication

## HTTP is Stateless

* Between requests, no information is held.

1. Client sends request.
2. Server receives; sets cookie.
3. Client receives reponse; updates its cookie.
4. Client sends new requests INCLUDING the cookie.

## What is a Cookie?

A key-value pair-based information storage in our web browser(s) on a per-domain basis.

## Routes Planning

* `GET /` Home page / sign in form.
* `POST /sign-in` Handle sign-in logic.
* `POST /sign-out` Handle sign-out logic.
* `GET /register` Registration form.
* `POST /register` Handle registration logic.
