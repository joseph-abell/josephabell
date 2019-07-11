---
title: Strategy Pattern
date: '2019-07-11T22:34:00.000Z'
tags: 'Object Orientated Programming'
---

I'm currently working through Head First Design Patterns by Eric Freeman and Elisabeth Robson. It's good, and pretty challenging to translate to JS. The section on strategy pattern can be found in the introductory chapter: Welcome to Design Patterns.

I attempted to follow along using JS, although the examples are written in Java. You can find the result at my [github](https://github.com/gerbilsinspace/strategy-pattern).

The Strategy pattern lets you decouple functionality from an object. Doing so lets you reuse an object without gaining unwanted functionality. If you wanted to make a rubber duck from a duck object, you wouldn't want the rubber duck to fly. Passing in a custom fly method during creation would prevent this.

There are a few ways to use the strategy pattern. The first way is to create a class. A class comes with a constructor method. The constructor method can set up internal variables with the passed in  functionality.

The example here uses a curried function and relying on scoped variables. A curried function in a partially applied function. We call the curried function with the functionality, and it returns a new function. This new function in a batteries included version of the functionality. It has everything it needs to work when called next.

By calling the makeDuck method with custom fly and quack methods, our rubber duck cannot fly. It squeaks as intended.

The strategy pattern makes inheriting functionality a conscious choice. Our code will be less buggy during reuse as it cannot inherit functionality it might not need.