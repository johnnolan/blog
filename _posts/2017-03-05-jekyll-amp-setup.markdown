---
layout: post
title:  "Setting up Jekyll for AMP"
date:   2017-03-05 09:00:00 +0000
categories: amp, jekyll
author: "John Nolan"
publisher: "John Nolan"
---

In the following article I will be taking you through how I enabled AMP pages for my Jekyll blog. I will be talking
about the following

* Creating a subfolder called /amp that will contain our content
* How I have structured my project to share the same content with different layouts
* Adding a Service Worker to an AMP Page
* Adding Google Analytics
* Setting up canonical and amphtml meta tags
* How to build both sites in one command and include it in your CI build

As always you can find an example of all of this to reference on my [repo on Github](https://github.com/johnnolan/blog)