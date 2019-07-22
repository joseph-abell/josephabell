---
title: React Hooks
date: '2019-04-20T21:00:00.000Z'
tags: 'React'
sticky: false
---

Here is a super quick rundown about each react hook. Notes taken from the [React Docs](https://reactjs.org/docs/hooks-intro.html).

## useState

The useState hook is used to add state to a React function component. The argument
passed into useState is the default state we want to store. It returns an array,
the first being the returned state, the second being a callback function we can call
to update the state.

```jsx
import React, { useState } from 'react';

function Example() {
    const [count, setCount] = useState(0);

    function onButtonClick () {
        setCount(count + 1);
    }

    return (
        <>
            <h1>{count}</h1>
            <button onClick={onButtonClick}>Increment Count</button>
        </>
    )
}
```

## useEffect

The useEffect hook lets us add side effects to a React function component. An example of a
side effect is loading data from an api. The useEffect hook takes two arguments. The first
is a function that contains the side effect. The second is an optional array of values the
side effect relies on. Either you can remove the array entirely, and useEffect will run
every time the component is updated, or you can add the array and keep track of all the
dependencies it needs. Missing a dependency will lead to unintentional stale results.
The eslint-plugin-react-hooks eslint plugin will help you catch errors deriving from
missing dependencies.

If your side effect is an event that needs tearing down, useEffect can help with this too.
If you add a callback function to the function, and call it with the teardown code, React
will call the callback function when the components are being cleaned up.

```jsx
import React, {useState, useEffect} from 'react';

function Example() {
    const [joke, setJoke] = useState(0);

    useEffect(() => {
        fetch('http://api.icndb.com/jokes/3')
            .then(response => response.json())
            .then((data) => setJoke(data.joke));
    }, []);

    return (
        <div>
            {joke}
        </div>
    )
}
```

## useLayoutEffect

The signature of useLayoutEffect is identical to useEffect. The useLayoutEffect is
used only for side effects which rely on the rendering of the component to be finished,
for example measuring width of a component.

## useContext

The useContext hook provides a way of passing props down through multiple levels of
components without having to chain props down. The first example is what we would have
to do without Context:

```jsx
import React from 'react';

const RootComponent = () => {
    const theme = {};

    return (<Child theme={theme} />);
}

const Child = ({theme}) => (
    <GrandChild theme={theme} />
)

const GrandChild = ({theme}) => {
    // ...use theme prop here
    return (
        <div></div>
    )
)
```

Can you see that the Child component has been passed the theme prop, even though it
doesn't need it? As it is, I'd probably keep the code as it is, but if we have to pass
the code through multiple layers of components, or there are multiple grandchild components
that need the prop, it would be time to add a context, like so:

```jsx
import React, createContext from 'react';

const ThemeContext = createContext('light'); // provide default as light

const RootComponent = () => {
    // We can change the value of the the context by changing the value argument below
    // If this needs to be dynamic, useState is your friend.
    return (
        <ThemeContext.Provider value='dark'>
            <Child theme={theme} />
        </ThemeContext.Provider>
    );
}

const Child = () => (
    <GrandChild />
)

const GrandChild = () => {
    const theme = useContext(ThemeContext);
    // ...use theme here
    return (
        <div></div>
    )
)
```

## useReducer

The useReducer hook provides a way to manage a more complex section of state.
It takes a reducer and an initial state. The reducer is a function which takes
the state, and an action. The action is an object, which commonly has a type,
that can be used to identify the type of change you are making to the state.
The action also has any data you need to make the change to the state.

We can use a switch statement on the type of the action, and change the state.
If you are using an object as state, make sure to return the whole object with
your new changes in, as you could end up accidentally wiping other parts of
the state.

```jsx
import React, {useReducer} from 'react';

// it is fine to use an object as the state as long as you remember
// to create a new object with all parts of the state accounted for
// each time you make a change, you could end up accidentally losing
// state. We only have one bit of state we care about, so I'm using
// it directly.
const initialState = 0;

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            return state - 1;
        default:
            throw new Error();
    }
}

const Counter = () => {
    const [count, dispatch] = useReducer(reducer, initialState);

    return (
        <>
            Count: {count}
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    );
}

const element = <Counter />;

ReactDOM.render(element, document.getElementById('root'));
```

## useMemo

Returns a memoized value. It expects a function to run, and a list of dependencies. When useMemo is called the first time,
the passed in function runs, and returns a result. the result is cached for later runs. If the dependencies do not change on
a second run, the result from the first run is passed back, and the passed in function is not run. When the dependencies change,
the function is run and the cached result is updated. This helps make sure computationally heavy functions are run as little as
possible.

You can also use useMemo to make sure that an array, function or object you are relying on is indeed equal. If you don't use useMemo,
you will find out quite quickly that `[] === []` is actually false, because they are two arrays, created separately. If you did the
following, the result would be true:

```js
const a = [];
console.log(a === a); // true
```

So, we need to pass the exact array into the list of dependencies. The useMemo stores the exact array in memory for later use. :tada

```js
import React, { useMemo } from 'react';

const Example = () => {
    const a = useMemo(() => [], []); // only updates initially as we have no dependencies

    const result = a === a; // true

    return (
        <div>{result && ('hi')}</di>
    )
}
```

## useCallback

The useCallback hook is exactly the same as the useMemo hook, except that it only takes functions as it's first argument, rather than anything.
you cannot use useCallback to cut down on expensive calculations though. You'll be passed the exact same function back, but you'll still
be continuing to run it. So, only use it to make sure that the callback you are using is referentially equal, so your useEffect that relies
on it doesn't accidentally spam a third party service.

## useRef

The useRef hook is very similar to useMemo, except that the data stored is mutable, meaning it can change from underneath us.
An example of data that can do this is a DOM element. If we wanted to store the id for a setInterval, or a particular element on the page,
this is what we would use.

When we wrote class components in react, our state acted like this automatically. If we wanted to see the state in our app, then changed it,
the initial value would change. Now, in function components, our state is immutable, meaning if we have read the state, we should never
expect to see that value change on us. This prevents a ton of bugs, but sometimes, you really need to make an element turn purple.

## useImperativeHandle

I've never needed this, will probably never need this, so I'm not wasting my breath. I'm sure this will bite me later.

## useDebugValue

When you are debugging a custom hook, throw a useDebugValue in there to aid with logging.

```jsx
function useTheme() {
    const [theme, setTheme] = useState('light');

    // Show a label in React DevTools next to this Hook
    // e.g. "Theme: 'light'"
    useDebugValue(theme); // doesn't work in codepen?! :(
    if (theme === 'light') {
        setTheme('green')
    }

    return theme;
}
```
