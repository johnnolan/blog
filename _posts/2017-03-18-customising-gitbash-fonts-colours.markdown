---
layout: post
title:  "Customising Git Bash fonts and colours"
date:   2017-03-18 09:00:38 +0000
categories: ideas
author: "John Nolan"
publisher: "John Nolan"
image: "/assets/posts/2017-03-18-customising-gitbash-fonts-colours.jpg"
imagewidth: "783"
imageheight: "307"
ogimage: "/assets/posts/2017-03-18-customising-gitbash-fonts-colours.jpg"
---

So I was researching how to be elite in Git recently and stumbled across
 this site [http://durdn.com/blog/2012/11/22/must-have-git-aliases-advanced-examples/](http://durdn.com/blog/2012/11/22/must-have-git-aliases-advanced-examples/).
 Take a look at how sexy that font and colour scheme is! Man I needed
 it in my life bad!

So I did. This is how you can get this look and feel.

First we need to download the font which is called Terminus. This can be
 obtained here [http://files.ax86.net/terminus-ttf/](http://files.ax86.net/terminus-ttf/).

Download the pack that matches your OS, mine is windows... for now, linux is
 proper calling me at the moment :)

Extract and install the fonts.

Next step, we need those colours. I use this tool [http://www.hikarun.com/e/](http://www.hikarun.com/e/)
 for getting to colours (as I am colour blind as well).

This gave me...

* Background colour as ```rgb(0, 57, 70)```
* Text colour as ```rgb(116, 145, 151)```
* Blue Text as ```rgb(95, 175, 245)```
* Greeny looking commit id colour as ```rgb(210, 170, 69)```

Now to apply this

* Open up Git Bash and bring up the options by cicking on the icon in the top left.
* Select the Background as ```rgb(0, 57, 70)```
* Select foreground as ```rgb(116, 145, 151)```
* Go to Text and select the Terminus font Bold and size 12

But what about the blue and green I hear you cry. Well here we can
 setup some new alias to have our colour scheme. See
 here [https://github.com/johnnolan/jb-trunk-of-funk/blob/master/Git/.gitconfig](https://github.com/johnnolan/jb-trunk-of-funk/blob/master/Git/.gitconfig)
  I have converted the RGB to HEX and created some pretty print out log
  commands. This gives us all the loveliness we need. Add this to your
  .gitconfig.

```
ls = log --pretty=format:"%C(#D2AA45)%h%Cred%d\\ %Creset%s%C(#5FAFF5)\\ [%cn]" --decorate
ll = log --pretty=format:"%C(#D2AA45)%h%Cred%d\\ %Creset%s%C(#5FAFF5)\\ [%cn]" --decorate --numstat
lnc = log --pretty=format:"%h\\ %s\\ [%cn]"
lds = log --pretty=format:"%C(#D2AA45)%h\\ %ad%Cred%d\\ %Creset%s%C(#5FAFF5)\\ [%cn]" --decorate --date=short
ld = log --pretty=format:"%C(#D2AA45)%h\\ %ad%Cred%d\\ %Creset%s%C(#5FAFF5)\\ [%cn]" --decorate --date=relative
```

Now in Git bash type ```git ls``` and see the colour scheme for yourself.

Done, so lovely! Of course this is just what I find sexy. Have a play,
 see what you think!

If you want to see my progress on using **Git Templates** for commit
messages and my **Git Alias** settings visit my Trunk of Funk repo I have
just started [ https://github.com/johnnolan/jb-trunk-of-funk]( https://github.com/johnnolan/jb-trunk-of-funk).


