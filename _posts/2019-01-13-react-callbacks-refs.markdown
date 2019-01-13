---
layout: post
title:  "React Callback refs - Disable Button onClick"
date:   2019-01-13 09:00:00 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2019-01-13-react.png"
imagewidth: "250"
imageheight: "250"
ogimage: "/assets/posts/2019-01-13-react.png"
---

## A noobies common questions to React and Redux series

One issue I had, was getting to a DOM element in my JSX. 

The following could probably be done with setting state and setting the disabled attribute based on this, but mine was a bit more complex and I found this snippet that allowed you to access the Element.

To access the Element you want, you need to first assign it a `ref`. Like below

```
<button
	className="btn"
	onClick={this.onClick}
	ref={btnReview  => {
		this.btnReview = btnReview;
	}}
)}>
	Review
</button>
```
Callback refs are a way to assign your element a function with a name you can access higher up in your Component. For example you may want to change the text temporarily or change an attribute, call a event handler, etc, depending on a more complex set of logic. 

More examples and alternative ways of using `refs` can be found here [https://reactjs.org/docs/refs-and-the-dom.html#callback-refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)

From here we are now able to access this in our code. For the example below, `onClick` will disable the button to prevent users from double clicking the button.

```
onClick = e => {
	this.btnReview.setAttribute("disabled", "disabled");
}
```
