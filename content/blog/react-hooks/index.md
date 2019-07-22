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
