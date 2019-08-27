---
title: Typescript Types Cheatsheet
date: '2019-07-23T12:00:00.000Z'
category: 'web'
tags: 'Types'
sticky: false
---

Taken from the Typescript [docs](https://www.typescriptlang.org/docs/handbook/basic-types.html).
Here are a list of types and how to use them.

## Basic types

* Boolean: `let isDone: boolean = false;`
* Number:
  * Decimal: `let age: number = 28;`
  * Hexadecimal: `let hex: number = 0xf00d;`
  * Binary: `let binary: number = 0b1010;`
  * Octal: `let octal: number = 0o0744;`
* String: `let color: string = "blue";` You can also use template strings.
* Array:
  * `let ages: number[] = [1, 2, 3, 4, 5];`
  * `let ages: Array<number> = [1, 2, 3, 4, 5];`
* Tuple: `let personData: [string, number] = ['Joe', 28];`
* Any: `let whoKnows: any = 123;`
* Void: `function func (): void {}`
* Null: `const empty: null = null;`
* Undefined: `let notSet: undefined;`
* Never: `function err (): never { throw new Error('will never return')}`
* Object:
  * Most Basic: `const obj: object = {};`
  * More Detail: `const dave: {dave: string} = {dave: 'Dave'};`

## Enum

I'm giving Enums a section of their own as we don't have it in vanilla JS.
Enums give you a unique set of numbers which have an identifying name. For
example if you need a set of cardinal directions, for later use, you can
do the following example.

```ts
enum Directions {Up, Right, Down, Left};

console.log(Directions[0]) // Up
console.log(Directions.Right) // 1

```

Usually we don't really care about the number each enum represents, we only care
that the number is unique and it matches up to a meaningful name for later. We could
be given a number, and passed into Directions using square brackets, and receive a
direction as a string as a result.

## Interfaces

Interfaces allow you to make your own subtype. For example, if you had an object, you wanted to
reuse the type for that object elsewhere, you can make an interface.

```ts
interface DaveInterface {
    name: string;
    age: number;
    isCool: boolean;
}

const makeDave = (name: string, age: number, isCool: boolean): DaveInterface => ({name, age, isCool});

const dave1: DaveInterface = makeDave('dave', 23, true);
const dave2: DaveInterface = makeDave('not dave', 24, false);
```

## Classes

Allows us to set types on intialised properties before the contructor.

```ts
class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet(): string {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
console.log(greeter); // { greeting: 'world' }
```
