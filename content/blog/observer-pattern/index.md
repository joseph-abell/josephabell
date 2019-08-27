---
title: Observer Pattern
date: '2019-07-12T15:13:00.000Z'
category: 'web'
tags: 'Object Oriented Programming'
sticky: false
---

I'm currently reading Head First Design Patterns by Freeman, Robson, Sierra and Bates.
I'm working through the book as a javascript developer, and I'm trying to translate
the patterns as I go. This blog post is my notes on the Observer Pattern chapter.

My example code can be found on [github](https://github.com/gerbilsinspace/observer-pattern).

The Observer pattern allows a single object give updates to many interested parties.
An example is a newspaper. A publisher has a list of subscribers. These subscribers
want to receive a newspaper as it gets delivered. A new subscriber registers their
interest with the publisher, who adds them to their list of subscribers. When the publisher
received a new newspaper, they will send that newspaper to subscribers. If a subscriber
decides they do not want to receive any more news, they alert the publisher and are
removed from the list of subscribers.

In the example we have made, we will assume that everyone is interested in receiving every
update from the publisher. In real life, the odds are we will need to store multiple
lists of subscribers based on which newspaper they are interested in. We would also need
to send a group of batched newspapers at the same time, so we don't need to have more than
round of deliveries to a house when they want more than one newspaper. I would look at using
a reduce method in the style of Redux for this. But, that's a level of complexity we do not need,
so I'm ignoring it.

## Subject Interface

We need a Subject, whose job is to maintain the list of subscribers, and remove subscribers
when necessary and provide an update to each subscriber when it's value changes.

## Counter

The Counter extends from the Subject, so it gains the ability to work with subscribers.
It should store a counter, and call updateSubscribers each time the counter changes.

## CounterDisplay

It should be given a subject as part of it's initialisation, and should register it's intensions
to be an observer while initialising. From there, it should have an update method, which will be called
when the counter changes. It should also store a UUID, which it should pass back to the counter when
it wants to unregister as an observer.

## When to use

The Observer pattern Is useful for situations where you have a one to many relationship,
where many observers are waiting for updates from a piece of state. By letting the
source of the state alert the many observers when the state has changed, we can avoid
polling for content changes, which is overkill at even a one to one relationship, and
gets worse when the observer count increases.
