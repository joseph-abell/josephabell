---
title: Code Purity
date: "2019-02-24T07:00:00.000Z"
---

One of the most frequent causes of bugs in code is when values your code is relying on change from underneath you. Maybe you were relying on data that gets deleted elsewhere. Maybe you have multiple areas of a website contribute to a feed, and both trigger an addition to a feed at roughly the same time, leading to one addition to be ignored. Code purity helps deal with these bugs by making each unit of code easier to reason with.

When passing inputs into a function, make copies of any input that you are going to change. By using the copies to create the output, we make sure that any areas of code relying on the inputs are not affected by our code.

If you make sure all of your code is pure, we get an extra benefit. We can use multiple small pure functions together and compose them together to make complex results. As long as every function is pure, we will be able to make reliable assumptions on the result of the final function.
