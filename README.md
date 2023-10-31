# Lighthouse Labs | HTTP Cookies and Authentication

* [ ] Review some HTTP!
* [ ] What is a Cookie? 🍪
* [ ] Writing and Reading Cookies

## HTTP is Stateless

Each request that hits the server is considered "fresh!" No history is formally recorded, we don't know who the user is or their history with our server based on HTTP alone.

* Many Internet Service Providers assign users dynamic IP addresses - not reliable for security or longevity
* Most info in headers is generic for security reasons, so we have limited options available from an application perspective to keep track of a user.

## Cookies

* Cookies are per-domain key-value pairs stored in-browser
* Cookie key-value pairs are sent with each request from the browser (for the server to read)
* Server responses can suggest new cookies or changes to existing cookies (it is up to the browser to honour this)
* Ultimately a browser maintains control over cookies, using dev tools we can even change these at our will
