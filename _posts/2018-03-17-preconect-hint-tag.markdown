---
layout: post
title:  "preconnect your external sources"
date:   2018-03-17 09:00:00 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2018-03-17-preconnect-hint-tag.jpg"
imagewidth: "400"
imageheight: "419"
ogimage: "/assets/posts/2018-03-17-preconnect-hint-tag.jpg"
---

Recently I have added in (and well overdue) the `preconnect` meta tag.

Preconnect is a resource hint tag you can add to your markup in the `<head>`. It will tell the browser,
that your markup will be making a request to a resource on an external domain, later int the document.

The tag looks like this

```
<link rel="preconnect" href="//example.com">
```

Once defined this will initiate the below, including SSL handshakes

* DNS Lookup
* TCP Handshake
* TLS negotiation

This will save you time later on down the request chain when the browser sees these resources and starts
to decide how to handle them.

Below is an example of results using Google Chrome Dev Tools at `Fast 3G` and `Online` options.

* Fast 3g _with_ preconnect
* Fast 3g _without_ preconnect
* Fast 3g _without_ preconnect
* Online _with_ preconnect
* Fast 3g _with_ preconnect

Red is before and Blue is after.

<img src="/assets/posts/2018-03-17-preconnect-hint-tag.jpg" alt="preconnect tag Chrome Dev Tools Results" />

> On mobile connections and a 6x slowdown on processor speed, it has a reduction of 2-6 seconds on page load speed!

Unfortunately, I didn't get a before for the Online test, but you can imagine the gain. The mobile performance
fight is what I am concentrating on day to day at the moment, anyway.

This gives us another great tool in our arsenal.

There are other options as well

* [dns-prefetch](https://w3c.github.io/resource-hints/#dns-prefetch)
* [prefetch](https://w3c.github.io/resource-hints/#prefetch)
* [prerender](https://w3c.github.io/resource-hints/#prerender)

Each one gives you certain advantages/disadvantages over the other.
For more in-depth information you can check out
[https://w3c.github.io/resource-hints/#preconnect](https://w3c.github.io/resource-hints/#preconnect)


Sources

* [W3C Resource Hints](https://w3c.github.io/resource-hints)