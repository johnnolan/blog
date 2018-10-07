---
layout: post
title:  "Debugging Javascript - Console and Debugger"
date:   2018-10-07 09:00:00 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2018-10-07-debugging-javascript.png"
imagewidth: "100"
imageheight: "100"
ogimage: "/assets/posts/2018-10-07-debugging-javascript.png"
---

We have recently had some interns start at UNiDAYS and while showing one of the newbies how to write Jest tests in our solution one thing they started doing is adding console.log to various places in the code to see how it worked.

As I started mentioning other debugging methods I realised this may not be common knowledge so here are a few pointers for those at University dealing with JavaScript and having to debug code without being able to step through in a debugger.

Now, go open Chrome and hit F12. This will show you the Chrome Dev Tools debugger.

We will be playing in Console and Sources tabs. For now, select the Console tab.

For those already familiar with the below, check out the [Chrome API Reference](https://developers.google.com/web/tools/chrome-devtools/console/console-reference). It has all
sorts of cool things like `console.assert`, `console.count` and `console.time`!

## console.log
This is standard, you maybe use this all the time to print out messages or objects to see what value is at the time of it being called. This is a slow way of debugging but still a viable option.

You can do this by adding

`console.log(‘Code be here’);`

Or

`console.log(myObject);`

This will print the message to the console window.

<script src="https://gist.github.com/johnnolan/5ce8c624e32645fd1b648bd01451faff.js"></script>

![alt text](/assets/posts/2018-10-07-debugging-javascript/console_log-1.png "console.log")


## console.warn and console.error
This is just like console.log, works in the same way, however now you can get a nicely coloured error or warning message into your console. This can have advantages for debugging errors and warnings in a debug/local environment or if you are building a 3rd party plugin of some sort, a far better way of displaying that something is wrong in the way they have implemented your code rather than just throwing an error.

<script src="https://gist.github.com/johnnolan/f902352efe270c33a3a4bfbf201fb8b2.js"></script>

![alt text](/assets/posts/2018-10-07-debugging-javascript/console_warn-2.png "console.warn and console.error")


## console.table
This is beautiful and so under used. Again used like console.log but it will instead display your object in the console as a table view. If you are wanting to log out an array or complex object, try this first, it is infinitely better to be able to see the data rather than console.log

`console.table(jsonObject);`

<script src="https://gist.github.com/johnnolan/47cb77f479ea5b128ab3be54c44430b4.js"></script>

![alt text](/assets/posts/2018-10-07-debugging-javascript/console_table-3.png "console.table")


## debugger;
When you need to debug and step through your code, adding this to your JavaScript will prompt Chrome Dev Tools to pause and open up the Sources tab. From here you have full access to the stack and can step through your code to find your issue or better understand the flow of you code.

`debugger;`

<script src="https://gist.github.com/johnnolan/7852406804bd2e8fbf5ae2facad67bd6.js"></script>

![alt text](/assets/posts/2018-10-07-debugging-javascript/debugger-4.png "debugger")


![alt text](/assets/posts/2018-10-07-debugging-javascript/debugger-5.png "debugger")


## Console sidebar

Now you have `console.warn`, `console.error`, `console.log` and `console.table` all spitting out data to your console, it can become hard to sift through all the noise.


![alt text](/assets/posts/2018-10-07-debugging-javascript/sidebar-6.png "Sidebar Icon")

Click on the icon like above and this will open up a sidebar to allow you to filter what type of message you want to see.

You also have the ability to filter your messages using the filter bar. Again this is a massive time saver when searching for specific messages registered to your console window.


![alt text](/assets/posts/2018-10-07-debugging-javascript/sidebar-7.png "Sidebar Open")