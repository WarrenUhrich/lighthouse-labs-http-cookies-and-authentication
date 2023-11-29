# Lighthouse Labs | HTTP Cookies and Authentication

* [X] Review some HTTP!
* [ ] What is a Cookie? 🍪
* [ ] Writing and Reading Cookies

## HTTP is Stateless

* There is no history tracked via the protocol
* The server by HTTP itself does not know if a visitor is the same person between requests
* Each request coming in is treated as a completely new/fresh request

IP seems like an option for keeping track of people... we probably have access to this as a server via headers.
* Modems in an office or home represent all devices as far as the outside (internet) is concerned... making it difficult to narrow down traffic by IP from an external location (server)
* Dynamic IP addresses mean that certain users/homes/modems might randomly change at unexpected times, and these addresses may even be assigned to another home/office!

## Cookies

* Are key-value pairs that live in the browser
* Cookies are stored per-domain
* Cookie values are sent in the headers of each request from the client
* The server can suggest a change to cookie key-value pairs in its response
