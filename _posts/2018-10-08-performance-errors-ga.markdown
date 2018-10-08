---
layout: post
title:  "Performance Tracking and Error Tracking in Google Analytics and Data Studio"
date:   2018-10-08 09:00:00 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2018-10-07-debugging-javascript.png"
imagewidth: "100"
imageheight: "100"
ogimage: "/assets/posts/2018-10-07-debugging-javascript.png"
---

So you want to track your performance and error tracking on your website? If you have Google Analytics installed
already then you are half way there!

There are some amazing great 3rd party services out there, but if you only want the basics then
this method is amazing for small personal websites.

## Tracking Errors

To track errors on a website then its as simple as the below code.

First we check to see if the onerror object is available for us, if so on an error we fire a google event
`exception` with the line number and error. Very simple and you can expand on this for modern browser APIs like
shown here [https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror](https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror)

For more information on the exception Google Analytics event see the link below.

[https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#exDescription](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#exDescription)

```
if (typeof window.onerror === "object")
{
    window.onerror = function (err, url, line)
    {
        gtag('event', 'exception', {
            'exDescription': line + ': ' + err
        });
    };
}
```

## Tracking Performance

For tracking performance I am using the incredibly awesome [Perfume.js](http://zizzamia.github.io/perfume/). Check out their site
for a breakdown on everything it can do. This includes polyfills for older browsers and gives us a great
starting point to start measuring mertics.

The setup is very straight forward and once you include their script you can start tracking with the code below.

For more information on the Google Analytics timing event, see the link below.

[https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#timingCategory](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#timingCategory)


```
var perfume = new Perfume({
    firstPaint: true,
    firstContentfulPaint: true,
    firstInputDelay: true,
    timeToInteractive: true,
    logging: false,
    googleAnalytics: {
        enable: true,
        timingVar: "performance"
    }
})
```

## Producing a Dashboard

I have created a Dashboard for others to view, take a copy, link to their own Google Analytics account and amend
as needed. Please feel free do so with this as you wish!

[https://datastudio.google.com/open/1BqYvDZXowIb_dyc9u-1UzEPuqS_x1Chg](https://datastudio.google.com/open/1BqYvDZXowIb_dyc9u-1UzEPuqS_x1Chg)

Once you have made a copy simply change the datasource and start playing. Hopefully this will give you a good
starting point.