---
layout: post
title:  "Setting up Jekyll for AMP"
date:   2017-03-05 15:00:00 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2017-03-05-jekyll-amp-setup.svg"
---

In the following article I will be taking you through how I enabled AMP pages for my Jekyll blog.

* Jekyll project structure
* Configuring the layouts
* Adding a Service Worker to an AMP Page
* Adding Google Analytics
* Setting up canonical and amphtml meta tags
* How to build both sites in one command and include it in your CI build

As always you can find an example of all of this to reference on my
 [repo at Github](https://github.com/johnnolan/blog)

For an introduction and guide to AMP, you can go to the official site
here [https://www.ampproject.org/](https://www.ampproject.org/) which
is an excellent source for getting started.

## Jekyll project structure

If you take a look [here](https://github.com/johnnolan/blog) at my Github
repository you can see the following new folder
[_layouts-amp](https://github.com/johnnolan/blog/tree/master/_layouts-amp)
 and a new file called
 [_config-amp.yml](https://github.com/johnnolan/blog/blob/master/_config-amp.yml).

In the _layouts-amp folder we have a copy of the _layouts folder. This
will be used for the necessary html layout changes needed.

The new _config-amp.yml is a copy of our _config.yml and we will be
adding some additional settings to it so we can specify new defaults for
it to use.

This means we will have to run to separate processes to produce 2 versions
of the site but don't worry I will cover how we can make this simpler later.

In your _config-amp.yml add to the bottom the following settings.

```
destination:   _site/amp
layouts_dir:   ./_layouts-amp

defaults:
  -
    scope:
      path: "_posts"
    values:
      layout: "default"
```

and change your baseurl to

```
baseurl: "/amp"
```

Now go to your command line and run the following command

```jekyll build --config _config-amp.yml```

With the additional settings it will produce a copy of your existing site
into a sub folder called /amp. Now for the fun part, customising the
templates.


## Configuring the layouts

AMP requires us to strip the majority of things we have come to take
as standard, and markup our content in a certain way so that it can
be easily processed. This means we need to make the following changes

In our default.html change it to

```
{% raw  %}
<!doctype html>
<html amp lang="en">

	{% include amp-head.html %}

<body>

<header class="site-header">
  <div class="wrapper">
    <a class="site-title" href="{{ site.baseurl }}/index.html">{{ site.title }}</a>
  </div>
</header>

<div class="wrapper">
  {{ content }}
</div>

	{% include amp-footer.html %}

</body>
</html>
{% endraw  %}
```

Notice we have in our html declaration ```amp```. This is an example
of things we need to change. Also pay attention to the site-title link.
Because I host on S3 and haven't got around to figuring out how to set
sub folders to look for index.html by default I have had to add
index.html to the end.

page.html and post.html I have left the same but you may need to amend
yours depending on the markup you have. Mine is very basic (on purpose)
so it validates by default.

In the above snippet I have referenced two files, amp-footer.html and
amp-head.html. We need to create these two files in our
[_includes](https://github.com/johnnolan/blog/tree/master/_includes)
folder. There content will look like so

amp-head.html

```
{% raw  %}
<head>
  <meta charset="utf-8">
  <script async src="https://cdn.ampproject.org/v0.js"></script>
  <script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>
  <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
  <meta name="description" content="{{ page.description }}">
  <meta name="og:description" content="{{ page.description }}">
  <title>{% if page.title %}{{ page.title | escape }}{% else %}{{ site.title | escape }}{% endif %}</title>
  <link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.canonical_baseurl | prepend: site.url }}" />
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
  {% if page.date %}
  <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "blogPost",
        "headline": {% if page.title %}{{ page.title | escape }}{% else %}{{ site.title | escape }}{% endif %},
        "datePublished": {{ page.date }},
        "image": [
          "/android-chrome-512x512.png"
        ]
      }
    </script>
  {% endif %}
  <style amp-custom>
    body {
      color: #000;
      font-family: "Roboto",sans-serif;
    }
    .icon>svg {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }
    .wrapper {
      max-width: -webkit-calc(800px - (30px * 2));
      max-width: calc(800px - (30px * 2));
      margin-right: auto;
      margin-left: auto;
      padding-right: 30px;
      padding-left: 30px;
    }
    a {
      color: #1573ca;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .site-header {
      background-color: #1573ca;
      min-height: 80px;
      position: relative;
    }
    .site-title {
      font-size: 26px;
      color: #fff;
      line-height: 74px;
      letter-spacing: -1px;
      margin-bottom: 0;
      float: left;
    }
    .site-title:hover {
      text-decoration: none;
    }
    .highlighter-rouge .highlight {
      background: #eef;
    }
    pre {
      padding: 8px 12px;
      overflow-x: auto;
    }
    pre, code {
      font-size: 15px;
      border-radius: 3px;
      background-color: #eef;
    }
  </style>
  <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>

</head>
{% endraw  %}
```

With AMP you should include all your CSS inline. It also needs to be as small as possible and be wrapped in a new special
tag called ```<style amp-custom>```. I have deliberately only included the absolute basic CSS to keep it functional.

This tag is a direct relation to this JS include file ```https://cdn.ampproject.org/v0.js```. This contains the definitions
for the new tags that you are able to wrap common functionality into.

This also allows us to use the ```<style amp-boilerplate>``` which from what I can tell is a required set of styles
to allow AMP sites to work.


amp-footer.html

```
{% raw  %}
<footer class="site-footer">

  <div class="wrapper">

    <h2 class="footer-heading">{{ site.title }}</h2>

    <div class="footer-col-wrapper">
      <div class="footer-col footer-col-1">
        <ul class="contact-list">
          <li>{{ site.title }}</li>
          <li><a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
        </ul>
      </div>

      <div class="footer-col footer-col-2">
        <ul class="social-media-list">
          {% if site.github_username %}
          <li>
            {% include icon-github.html username=site.github_username %}
          </li>
          {% endif %}
        </ul>
      </div>

      <div class="footer-col footer-col-3">
        <p>{{ site.description }}</p>
      </div>
    </div>


  </div>

</footer>

<amp-install-serviceworker src="/sw.js" data-iframe-src="https://www.nolanscafe.co.uk" layout="nodisplay">
</amp-install-serviceworker>

<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-92772847-1"
      },
      "triggers": {
        "trackPageview": {
          "on": "visible",
          "request": "pageview"
        }
      }
    }
  </script>

</amp-analytics>
{% endraw  %}
```

The only changes on here are the addition of the amp-analytics and
amp-install-serviceworker tags. I will explain these below.

So now if we run the build command again we should have a new amp compatible
site in our /amp sub folder.


## Adding Service Worker functionality

Because we are restricted by including external javascript and CSS in AMP, we have to use their built in libraries
to get access to functionality such as Service Workers. Above you can see we have included the script

``` <script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"></script>```

and then to enable our service worker we use this tag.

```<amp-install-serviceworker src="/sw.js" data-iframe-src="https://www.nolanscafe.co.uk" layout="nodisplay"></amp-install-serviceworker>```

## Adding Google Analytics

Just like the service worker, for analytics there is an AMP library we can call upon to pass parameters through. The script
to link to is

```<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>```

and then for Google Analytics we can do this in our footer

```
<amp-analytics type="googleanalytics">
  <script type="application/json">
    {
      "vars": {
        "account": "UA-92772847-1"
      },
      "triggers": {
        "trackPageview": {
          "on": "visible",
          "request": "pageview"
        }
      }
    }
  </script>

</amp-analytics>
```

Notice that in the type attribute I have specified googleanalytics. This can be changed to your preferred anaylytics
provider. See the links at the end of tHe document for more advanced usages. Just replace my account ID with your own.

## Setting up canonical and amphtml meta tags

```{% raw  %}<link rel="canonical" href="{{ page.url | replace:'index.html','' | prepend: site.canonical_baseurl | prepend: site.url }}" />{% endraw  %}```

This line specifies the link back to our full html page. It is required to allow the user/browser easy access back
to the full page.

A bit of functionality we haven't configured yet is the addition of the variable ```canonical_baseurl```. Open up your
_config.yml and add the following line in

```canonical_baseurl: "/amp"```

And in your _config-amp.yml add the following line

```canonical_baseurl: ""```

Now in your head.html add the following code

```
{% raw  %}
{% if page.url == '/amp/' %}}
<link rel="amphtml" href="{{ page.url | prepend: site.canonical_baseurl | prepend: site.url | append: 'index.html' }}" />
{% else %}
<link rel="amphtml" href="{{ page.url | prepend: site.canonical_baseurl | prepend: site.url }}" />
{% endif %}
{% endraw  %}
```

This lets the search engines know there is an equivalent AMP file to our full html page.

All this can be seen in my Github repository.


## How to build both sites and include it in your CI build

In your package.json add the following line under scripts

```"build": "jekyll build && jekyll build --config _config-amp.yml"```

Now in your build script change your ```jekyll build``` to ```npm run build```

Every time you want to build both sites just run the following from bash

```npm run build```

Done!


## External resources
[AMP Project Homepage](https://www.ampproject.org/)
[AMP Serviceworker](https://www.ampproject.org/docs/reference/components/dynamic/amp-install-serviceworker)
[AMP Analytics](https://www.ampproject.org/docs/reference/components/ads/amp-analytics)
