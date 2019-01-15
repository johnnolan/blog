---
layout: post
title:  "How to use webpack-bundle-analyzer with create-react-app"
date:   2019-01-15 09:00:00 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2019-01-13-react.png"
imagewidth: "250"
imageheight: "250"
ogimage: "/assets/posts/2019-01-13-react.png"
---


## A noobies common questions to React and Redux series

webpack Bundle Analyzer ([https://www.npmjs.com/package/webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)) is a beautiful tool that allows you to easily see your build bundles content and size, breaking down each import throughout. It has helped me identify glaring improvements on what I import into my projects and will help you to.

This is a simple and very straight forward way to implement into your project. It is all based on using `create-react-app`.

First step, install the npm package like so

```
npm install --save-dev webpack-bundle-analyzer
```

Now in your `package.json` file add the following to your `scripts` section.

```
"scripts": {
	"stats": "react-scripts build \"--stats\" && webpack-bundle-analyzer build/bundle-stats.json
}
```

Now from your command line you can run `npm stats` and it will build a production build and launch a browser window to show you your bundle size and contents.

![webpack-bundle-analyzer](/assets/posts/webpackanalyzer.gif)

Photo taken from [https://www.npmjs.com/package/webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)