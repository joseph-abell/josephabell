---
title: React Class Methods Cheatsheet
date: '2019-07-23T11:00:00.000Z'
tags: 'React'
sticky: false
---

These notes are summaries from the [React docs](https://reactjs.org/docs/react-component.html).

## Lifecycle Methods

### Constructor

The first method to be called inside a class component.  Used to set initial state from props,
and to bind methods. Binding methods allow the methods to refer to the class as `this`.
This is the only method where it is acceptable to assign to `this.state` directly, rather
than using `this.setState()`.

### static getDerivedStateFromProps

Basically don't use this. Only use this if you are in a situation where your state
depends on changes to props over time. Animation is a good example. Most reasons
why you need this can be solved in the following simpler ways:

* If you need to perform a side effect, use componentDidUpdate
* If you need to recompute data only when a prop changes, use a [memoisation helper](https://www.npmjs.com/package/memoize-one).
* If you want to reset state when a prop changes, either make the component [fully controlled](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component),
or [fully uncontrolled](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) with a key.

### shouldComponentUpdate (Every render except first)

Used only for performance optimisations. Use this only when absolutely necessary,
optimisation often comes at the cost of clean and easy to read code. Use PureComponent
first, rather than doing shouldComponentUpdate by hand, as it does a shallow comparison
for you. Be careful when using this though, especially when your props are objects. You might
need to run your props through a memoise function to make sure you keep referential integrity.

### render

This is the only required method. It should be a pure function. It should not interact directly
with the browser. If you need to interact with the browser, use componentDidMount instead.
It uses the state and props to build up one of the following items:

* React Elements
* Arrays and Fragments
* Portals
* A String
* A Numeral
* A Boolean
* A null

### componentDidMount (First Render only)

A useful place to set up subscriptions. Make sure to clean up after yourself in componentWillUnmount.
This is a good place to make network requests. Avoid making `this.setState` calls from here, because
this causes a second render. You won't see the first render, but it will cause some slowdown in the
component.

### componentDidUpdate (Every render expect the first)

If you want to operate on the dom after it has been loaded, this is where you do it. If you are
relying on an api, make sure that you check whether your props have changed before you do so,
you could end up spamming apis pretty easily. If you call `this.setState` you'll need to do the same
otherwise you'll cause an infinite loop where you make a change, update the component, and call
this method again.

### componentWillUnmount (On component teardown only)

If you have a subscription inside componentDidMount, you need to make sure you tear down the subscription
to prevent memory leaks. Invalidate your timers, cancel network requests, clean up your subscriptions.

## Other methods - Error Handling

### getDerivedStateFromError (outside of regular lifecycle)

If you want to catch errors from lifecycle methods from this component or child components, use this.
This allows you to set the error state to true.

### componentDidCatch (outside of regular lifecycle)

If you want to log errors to a file, do it here, as side effects are permitted here.

## Other Methods - Misc

### setState

Used to update the state of the component in anything other than the constructor.

### forceUpdate

Don't use this. Used to force react to update your component. I've only used this
for testing purposes, probably didn't even need it.

## Other Properties

### defaultProps

This lets you set default props for your properties. Only defaults props which
are undefined, not ones which are null.

### displayName

Used to set a name for the component in debug messages.
