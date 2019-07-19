# Assignment 4
by Shuo Yang
### Two Features

  - Cancel upcoming bookings (100% finished)
  - View receipts of booking history
  -- download to local machine (80% finished)
  -- send to users' email address (50% finished)

### Tech used

* AngularJS - HTML enhanced for web apps.
* node.js - evented I/O for the backend
* Express - fast node.js network app framework 
* Firebase - store data

other tech I used:
*	HTML
○	Hypertext Markup Language, a standardized system for tagging text files to achieve font, colour, graphic, and hyperlink effects on World Wide Web pages.
*	CSS
○	CSS stands for Cascading Style Sheets. CSS describes how HTML elements are to be displayed on screen, paper, or in other media. CSS saves a lot of work. It can control the layout of multiple web pages all at once
*	Bootstrap
○	Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development
*	Javascript
○	JavaScript is the Programming Language for the Web. JavaScript can update and change both HTML and CSS. JavaScript can calculate, manipulate
*	Ajax
○	AJAX allows web pages to be updated asynchronously by exchanging small amounts of data with the server behind the scenes.


### Installation

 requires Node.js and Anuglarjs to run.

Install the dependencies and devDependencies and start the server.

```sh
$ npm install 
$ npm install -g @angular/cli
$ ng serve
```

Then open the browser to http://localhost:4200/booking-record

### How to use
1. At booking history page, click "view" button to download receipt to local machine, click "mail send" to send the receipt to users' email address.
2. At upcoming booking page, click "cancel" then there will be an alert to ensure you want to cancel in case there's mis-clicking. After you confirm, the status of upcoming booking will change to "canceled".

### Files created in project
- booking-records.component.ts
- booking-records.component.html
- firebase.service.ts

### Gitlab address
- https://git.cs.dal.ca/agbola/web_project_group_7.git
-- branch -booking_history

### Hosted link
- http://129.173.22.35:21441/
