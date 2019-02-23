---
title: Test Driven Development
date: "2019-02-23T23:00:00.000Z"
---

I recently gave a talk to my colleagues about test driven development (TDD). My slides can be found at <http://tdd.josephabell.co.uk>. They go into an example of how I TDD. For a TLDR, read on.

I find TDD to be a fantastic tool, which I use as much as I can when writing any non-trivial code. It helps document the process of writing code, helps future developers follow your thought process, and if you have a terrible memory like I do, it can keep you on track while you wait for your code to build.

* Write tests before you write your code.
* Make sure your tests fail before your code runs.
* Make sure that your tests pass after you have written your code.
* If your test was passing before writing code, make sure to break your code to see the test fail.
* Make sure each test is the most basic logical step from the one before.
* Make sure your code is the most simple way to make the test pass.
* Make the complexity of the task at hand be captured by the sum of your tests.
* Make sure to keep the unit of code small.
* Start with the happy path, then move on to the null handling checks, and rely on a type checker like Flow or Typescript to keep your types in check.
* Make sure your code is as pure and immutable as possible.
* Work closely with QA if you can, to see if they can spot any areas you've missed, and what areas they need to consider in Acceptance or Manual Testing.

TDD, mixed with Pair Programming, and functional programming, made me more sure about the quality of my work. The tiny steps towards a closer goal help fight against writer's block, and the documentation that comes out of the tests helps fight against scope creep, and helps make sure I've not missed any Acceptance criteria.

TDD isn't perfect. It's sometimes hard to figure out how to TDD with existing code, especially if that code was written before we decided to do TDD. When you are chasing down a bug, it can be hard to know where to add the next tests. Sometimes it can feel like you are getting bogged down when you feel like you can knock out the code quickly.

Push against the urge to write your code without tests. Writing your tests as you go along makes your code do what you think it does, and it helps the tests cover the acceptance criteria, rather than assumptions and mistaked baked into the code. 