---
title: Code Purity
date: '2019-02-24T07:00:00.000Z'
tags: 'Development Practises'
---

One of the most frequent causes of bugs in my code is when values my code's relying on changes from underneath me.
I relied on data that was deleted elsewhere. I had multiple areas of a website contribute to a feed, and both
trigger an addition to a feed at roughly the same time, leading to one addition to be ignored.
Code purity helps deal with these bugs by making each unit of code easier to reason with.

When passing inputs into a function, make copies of any input that will change.
By changing the copies to, we make sure that any other areas of code relying on the
inputs are not affected by our code.

If you make sure all of your code is pure, we get an extra benefit. We can use multiple small
pure functions together and compose them together to make complex results. As long as every
function is pure, we will be able to make reliable assumptions on the result of the final function.
