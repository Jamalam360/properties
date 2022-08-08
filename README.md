# Properties

A Deno parser for the
[`.properties` file format](https://en.wikipedia.org/wiki/.properties).

## Why not `properties_deno`?

[`properties_deno`](https://deno.land/x/properties_deno@0.2.0) does not support
objects. This implementation deserializes keys with periods in their name to JS
objects (unless the period is prefixed with a backslash). It also supports
arrays with the syntax `greetings = [hello, hey]. Although it contains these
modifications, the variant used by this library is mostly a superset of
properties.

While this **may not be completely spec-compliant**, it is useful to be able to
work with `.properties` files much more effectively. An example is given below.

## Example

The properties file below would be serialized to the JS object below.

```
name=James
favourites.food=Pizza
favourites.drink=Coffee
```

```js
const properties = {
    name: "James",
    favourites: {
        food: "Pizza",
        drink: "Coffee",
    },
};
```

The following code can be used to serialize and deserialize the a properties
file.

```ts
import { parse, stringify } from "https://deno.land/x/properties/mod.ts";

// An example can be found in ./test/test.properties
const file = await Deno.readTextFile("./example.properties");
const properties = parse(file);

console.log(JSON.stringify(properties, null, 2));

// Some style options can be passed to stringify. See ./src/stringifier.ts
const stringified = stringify(properties);
console.log(stringified);
```
