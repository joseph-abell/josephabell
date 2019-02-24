---
title: Code Purity
date: "2019-02-24T07:00:00.000Z"
---

One of the most frequent causes of bugs in code is when values your code is relying on change from underneath you. Maybe you were relying on data that gets deleted elsewhere. Maybe you have multiple areas of a website contribute to a feed, and both trigger an addition to a feed at roughly the same time, leading to one addition to be ignored.

## Definition of pure code

* When given the same inputs multiple times, the output will be identical. 1 + 1 = 2.
* All inputs should be immutable. This means that if you want to change them, you should create a copy of the value, mutate is as you wish, and return the mutated value. If all your code follows this rule, it stops other code from changing the value of your inputs while you are using them.
* Rely on code composition and small units of code to bring functionality. Let the data flow between functions to give you the desired output.