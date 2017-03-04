---
layout: post
title:  "Publishing your Jekyll blog to AWS S3 and Cloudfront
invalidation using Travis CI"
date:   2017-03-03 20:00:38 +0000
categories: ideas
---

> This information is useful once you have signed up to
 [https://travis-ci.org](https://travis-ci.org) via
 [https://github.com](https://github.com) and you have an existing
 AWS S3 bucket and AWS Cloudfront distribution setup. I will be covering
 this soon.

At any time you can look at my [repo on github](https://github.com/johnnolan/blog) to see how I have set this
up.

First create a new directory called *script* in your root folder and
create a file called *cibuild*. Now past the following details
 replacing *www.nolanscafe.co.uk* with your S3 bucket name.

```
jekyll build
pip install awscli
aws s3 sync --acl public-read --sse --delete _site s3://www.nolanscafe.co.uk
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths '/*'
```

This is going to do the following

* Build our jekyll site
* Install ```awscli``` on the Travis site
* We then sync our _site directory that has been built by the command
```jekyll build```, deleting all contents on the remote
bucket at the same time
* The line with ```preview.cloudfront``` tells the AWS Cli that you want
to enable the preview mode of it. This is still in BETA so this allows
us access to it.
* Then finally we invalidate the cache on cloudfront. There are a couple
of points on this. First, you are allowed up to 1,000 files to be
invalidated per month. After this you are charged. At this point it is
around $50 per 1,000. The other is it can take up to 15 minutes for the
cache to be invalidated so please be patient.

Now create a ```.travis.yml``` file in the root for your directory with the
following contents.

```
language: ruby
dist: trusty
sudo: required
rvm:
- 2.3.3
before_script:
- chmod +x ./script/cibuild
script: "./script/cibuild"
branches:
  only:
  - master
```

This is our deployment file. This tells Travis what we want to do once
it has hold of our files from Git.

* ```language: ruby``` tells it the environment we want to use to run our
build (Ruby)
* ```dist``` and ```sudo``` tell Travis that we want to run in full
trust mode. This is required for using the ```awscli``` library
* ```script``` tells Travis to use our file we created previously to be
run
* ```branches``` tells Travis to... only build our master
branch

Now, before we commit and push to git we need to setup credentials for
```awscli```, to allow it to connect to our account.

Log into [https://travis-ci.org](https://travis-ci.org) and find your
repo. In the ```More options``` drop down select
```Settings```. Here you will find an area called Environment Variables.

Here add your AWS Access Key, AWS Secret Key, S3 Bucket Region
 and your AWS Cloudfront Distribution Id for Cloudfront. This can be
 found in the *General* tab in your AWS Cloudfront distribution
 dashboard.

It is important to name these exactly like so

* ```AWS_ACCESS_KEY_ID```
* ```AWS_DEFAULT_REGION```
* ```AWS_SECRET_ACCESS_KEY```
* ```CLOUDFRONT_DISTRIBUTION_ID```

These keys are stored as Environmental Variables that can be accessed in
your Travis build script and are all encrypted.

*Never put sensitive information in your Github Repo*

You should now be all setup ready for continuous integration. Commit and
Push these changes to Git and now Travis should receive the trigger
and use the ```.travis.yml``` file and ```cibuild``` to execute your
Jekyll and AWS S3 and Cloudfront deployment.

