---
title: Functional Programming
date: '2019-04-20T21:00:00.000Z'
tags: 'Functional Programming'
sticky: false
---

This post is a summary of a few different blog posts. The main one is https://marmelab.com/blog/2018/03/14/functional-programming-1-unit-of-code.html. I cannot recommend marmelab enough.
As always, I am attempting to put what I learn in practise, although with some of this stuff I'm happy using a for loop as long as each function I create is pure.

## Definition

- Functional Programming is declarative. Examples include SQL, where you describe what you want to do to the table. `SELECT * FROM users WHERE id = 100`.
- Avoid control flow. Less `if, for and while loops`, more `reduce, map, and ternary operators`.
- Avoid throwing errors, return them instead, so the flow of data is not broken and the errors can be managed further down the chain.
- Avoid side effects. Make sure all values in a function are called as inputs or are created in the function. Make sure any inputs are not edited, and edits occur on copies of the inputs.

An example of functional programming is the following:

```
const maybeDouble = (val, shouldChange = true) => shouldChange ? val * 2 : val;
```

The code only relies on the inputs givn to it, and it doesn't change any of the inputs. The function returns either the input without making a change, or an entirely new output.

Here is how to handle an error:

```
const add = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number')
    return { error: new Error('add must take two numbers') };

  return { result: a + b };
};
```

This allows us to gracefully handle the error at a later time. Throwing the error relies on a future piece of code to catch the error, which could create unexpected app crashes.
