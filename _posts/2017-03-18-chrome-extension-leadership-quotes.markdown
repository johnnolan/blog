---
layout: post
title:  "Creating a Google Chrome Extension Tab"
date:   2017-03-18 20:00:38 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2017-03-18-chrome-extension-leadership-quotes.jpg"
imagewidth: "200"
imageheight: "200"
ogimage: "/assets/posts/2017-03-18-chrome-extension-leadership-quotes.jpg"
---

> A little writeup on some fun I had creating a Google Chrome
tab plugin called "Inspirational Leadership and Coaching Quotes"

## Why?
Over the past few months I have had the joy of taking part in
a self discovery course with our company UNiDAYS. I have already done
one of these before but it is nice to try a different system
and have a recap on what you have been up to. I had a thought,
random shower thought, why not have some fun and using one
of the sessions where we talked about influences and quotes
that mean something to us to make a start tab in Chrome. 

So I did.

The repo to look at is here [https://github.com/johnnolan/leadership-quotes-chrome-tab](https://github.com/johnnolan/leadership-quotes-chrome-tab)

## How?
I first went here [http://extensionizr.com](http://extensionizr.com) 
and selected the settings I needed. This tool is so simple and 
since I just wanted to get up and running, this gave me a quick
way to create the boiler plate for the extension.

I created a very basic Gulp file, again, quick and simple to
get up and running that would take my src dir and copy all
required files for release into a new dist folder.

I created a bunch of icons and added these to my manifest file.
 Then created a screenshot of the finished tab to upload.
 
A note on the boilerplate setup, it is missing the following 
from the manifest file which is a required attribute

```"short_name": "Inspirational Leadership Quotes",```

```shortname``` is required so make sure you add this.

In ```Override.html``` add your html you want and add a ```script```
tag to your .js file should you need it. Mine does the following.

* Load and parse the local json file with all the quotes and
authors in
* Randomly selects a number from the length of quotes
* Populates a id placeholder using jquery (which I bundled
in the file)

Nice and simple.

For the styling I took advantage of knowing this was in Chrome
so used ```vh``` and ```vw``` values for placement of divs and
backgrounds, then ```vw``` for font sizes to get a dynamic font
sizing depending on the viewport size.

After I was done, I ran my ```build``` Gulp task which collected
everything and put it in a ```dist``` folder. Then zip up the contents
of the folder and you are ready to submit it to the Google
Chrome Extension Console.

## Publishing
To publish your shiney new tab/extension go here

[https://chrome.google.com/webstore/developer/dashboard](https://chrome.google.com/webstore/developer/dashboard)
and click ```Add new item```.

Upload your zip folder here and after you should find you can 
fine tune your extension with a few extra options.

Once thing that is a bit shitty is you need to pay a one off $5 
when you first submit an extension. I gather this is to deter 
people from spamming so much but meh.

Once you are happy publish your extension, wait up to an hour 
and then go show your friends, your mum and co-workers and 
show them how awesome you are.

## Conclusion
So there you go, the whole thing is quite simple to setup, except
the horrible Chomre Extension Admin Console interface, but hey,
it's functional!

Cheers
JB