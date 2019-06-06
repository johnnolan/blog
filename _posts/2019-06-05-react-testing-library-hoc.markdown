---
layout: post
title:  "How to test a React Higher Order Component using react-testing-library and Jest"
date:   2019-06-05 09:00:00 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2019-01-13-react.png"
imagewidth: "250"
imageheight: "250"
ogimage: "/assets/posts/2019-01-13-react.png"
---

Recently I have had to test a React Higher Order Component using the fabulous [react-testing-library](https://github.com/testing-library/react-testing-library) but struggled to find how you can achieve this.

Before I go any further into detail, below is some example code I have done so you can get straight to copy and pasting. For more information see below the code sample.

## Show me the code!

<script src="https://gist.github.com/johnnolan/1c8075a9124506d75953b540adf7a3bd.js"></script>

## What is going on?

As you can see from the above code we have an example and very basic High Order Component called `withHOC`. This creates a layout and generic H1 for us and then renders our `WrappedComponent`.

Using the `render` method directly passing this in won't work. We have to instead do a bit of setup.

On *line 22* we create a, what I have called, Mock App with some basic html in it.

```
const MockApp = () => {
    return (
        <p>
            Hello from your Mock App
        </p>  
    )
}
```

We will use this to be able to wrap our Higher Order Component around it. We do this on *line 30*.

```
const MockWithHOC = withHOC(<MockApp />)
```

This will now return us a React component we can pass into render.

```
const { container, getByText } = render(<MockWithHOC />)
```

And that's it, we can now start to use this as if it were any other component, plus test that the `WrappedComponent` renders correctly.

```
expect(getByText(/HOC Example/i)).toBeInTheDocument()
expect(getByText(/Hello from your Mock App/i)).toBeInTheDocument()
```
