---
title: Test Driven Development
date: "2019-02-23T23:00:00.000Z"
---

Slides for a talk on Test Driven Development (TDD) can be found at <http://tdd.josephabell.co.uk>.

TDD is a fantastic unit testing tool, which I use often when writing any non-trivial code. It helps document the functionality of your code, and helps future developers, including yourself, follow your thought process. If you have a terrible memory like I do, it keeps you on track between breaks.

TDD, when mixed with Pair Programming and Functional Programming techniques, makes me more sure about the quality of my work. The tiny steps towards a closer goal help fight against writer's block, and each new test helps make sure I've not missed any Acceptance criteria. If the code you are writing has no side effects, and the unit of code is relatively small in size, this is a fantastic way to be confident in your work, which is the whole value of testing.

TDD isn't perfect. It's sometimes hard to figure out how to TDD with existing code, especially if that tests that came before are poorly written. I've found myself fighting the urge to completely rewrite, or at least reorder unit tests when this happens. When you are chasing down a bug, it can be hard to know where to add the next tests. Sometimes it can feel like you are getting bogged down when you feel like you can knock out the code quickly.

## My TDD Checklist

* Write tests before you write your code.
* Make sure your tests fail before you write your code.
* Make sure that your tests pass after you have written the new addition to your code.
* If your test was passing before writing code, make sure to break your code to see the test fail.
* Start with a test making sure the code you are testing exists. If the code has been removed, you will have lots of failing tests, and this one will tell you why.
* Make sure each test is the most basic logical step from the one before.
* Make sure your code is the most simple way to make the test pass.
* Make the complexity of the task at hand be captured by the sum of your tests. Avoid the complexity in your code, if you can.
* Use multiple tests with different inputs to guard against hardcoded values.
* Try to keep the unit of code small. When you feel that adding more hardcoded values to your code to make it pass would make longer code than doing it properly, that's a good time for factoring in more complexity.
* Start with the happy path - make sure the outcome of your code happens is the intended one.
* Move on to the null handling checks, and likely unintended incorrent value checks.
* Make sure your code is as pure and immutable as possible.

## Extra Advice

* Push against the urge to write your code without tests. Writing your tests as you go along makes your code do what you think it does, and it helps the tests cover the acceptance criteria, rather than assumptions and mistaked baked into the code. 
* Leave a space for tests which account for user error. Make sure if bugs arise with the code due to misshapen inputs, you add tests to capture the regressions. It's hard to think about any that could occur before you sre using your code in earnest, and at the moment of writing you'll be trying to fix things that are not broken, but at least keep it in mind that there is a place for these tests eventually.
* Rely on a type checkers like Flow or Typescript to keep your types in check. Document your types effectively, don't just say the type is a function or an object, describe what the functions input and outputs are, or describe the values inside the object.
* Work closely with QA if you can, to see if they can spot any areas you've missed, and what areas they need to consider in Acceptance or Manual Testing.