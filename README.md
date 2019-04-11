## vue-flip-toolkit

A Vue.js port of the wonderful [`react-flip-toolkit`](https://github.com/aholachek/react-flip-toolkit), developed by [@aholachek](https://github.com/aholachek) (to whom all credit is due here)

## Quick Start

```bash
yarn add vue-flip-toolkit
```

Wrap the components you wish to animate with a _single_ `Flipper` component that has a `flipKey` prop. This prop must change every time you want an animation to happen.

Wrap elements that should be animated with `Flipped` components that have a `flipId` prop matching them across renders.

A basic example can be found here: https://codesandbox.io/s/m354w1mmp9

## Why even port this to Vue.js?

Fair question. In developing my own library, [`vue-overdrive`](https://github.com/mattrothenberg/vue-overdrive), I've felt the pain of not being able to find a declarative library for animating a given DOM element between two states. Upon discovering `react-flip-toolkit`, which has a first-class "core" API that can be used outside of React, I wanted to take a crack at using it to re-implement `vue-overdrive`. The fruit of my attempt is the following library, `vue-flip-toolkit`.

## What's in this library?

This library strives to imitate its parent, `react-flip-toolkit`, as closely as possible. It thus exports the following two components that you can use in your Vue applications. For the sake of brevity, I've lifted descriptions/verbiage from the README of `react-flip-toolkit`, indicated via blockquotes.

### Flipper.vue

> The parent wrapper component that contains all the elements to be animated. You'll most typically need only one of these per page. [Read more –>](https://github.com/aholachek/react-flip-toolkit/blob/master/README.md#basic-props)

**Props**

| prop                     | default      | type     | details                                                                                                           |
| ------------------------ | ------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `className`              | –            | `string` | A class that will apply to the div rendered by `Flipper`                                                          |
| `flipKey` **(required)** | –            | `string` | Changing this tells `vue-flip-toolkit` to transition child elements wrapped in Flipped components.                |
| `spring`                 | `"noWobble"` | `string` | Provide a string referencing one of the spring presets — `noWobble`, `veryGentle`, `gentle`, `wobbly`, or `stiff` |
| `staggerConfig`          | `{}`         | `object` | Provide configuration for staggered Flipped children.                                                             |

### Flipped.vue

> Wraps an element that should be animated.

**Props**

| prop                    | default | type       | details                                                                                                                                                                                                                                                                                                                                                         |
| ----------------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flipId` **(required)** | –       | `string`   | Use this to tell `vue-flip-toolkit` how elements should be matched across renders so they can be animated.                                                                                                                                                                                                                                                      |
| `inverseFlipId`         | –       | `string`   | Refer to the id of the parent `Flipped` container whose transform you want to cancel out. If this prop is provided, the `Flipped` component will become a limited version of itself that is only responsible for cancelling out its parent transform. It will read from any provided transform props and will ignore all other props (besides `inverseFlipId`.) |
| `stagger`               | –       | `string`   | Provide a natural, spring-based staggering effect in which the spring easing of each item is pinned to the previous one's movement. If you want to get more granular, you can provide a string key and the element will be staggered with other elements with the same key.                                                                                     |
| `shouldInvert`          | –       | `function` | A function provided with the current and previous `decisionData` props passed down by the Flipper component. Returns a boolean indicating whether to apply inverted transforms to all `Flipped` children that request it via an `inverseFlipId`.                                                                                                                |
| `shouldFlip`            | –       | `function` | A function provided with the current and previous decisionData props passed down by the `Flipper` component. Returns a `boolean` to indicate whether a `Flipped` component should animate at that particular moment or not.                                                                                                                                     |

**Events**

| eventName    | args                           | details                                      |
| ------------ | ------------------------------ | -------------------------------------------- |
| @on-start    | `{el: DOMElement, id: String}` | Emitted when the `flipped` animation begins. |
| @on-complete | `{el: DOMElement, id: String}` | Emitted when the `flipped` animation begins. |

## Cool, so how do I use it?

Install the library

```bash
yarn add vue-flip-toolkit
```

Import the respective components.

```js
import { Flipper, Flipped } from "vue-flip-toolkit";
```

Register the components.

```vue
// Example.vue
<script>
export default {
  components: {
    Flipped,
    Flipper
  }
};
</script>
```

## OK, time for some examples.

You got it.

### 1) Simple, Expanding Div Animation

[Source](stories/Simple.vue)

<img width="600" src="https://i.imgur.com/CQmQwjA.gif" />

### 2) Two Divs

[Source](stories/Double.vue)

<img width="600" src="https://i.imgur.com/XeuEjHP.gif" />

### 3) List Shuffle Animation

[Source](stories/List.vue)

<img width="600" src="https://i.imgur.com/PWGSyKm.gif" />

### 4) Advanced Accordion

[Source](stories/Accordion.vue)
[Fantastic Tutorial](https://alex.holachek.com/rft-tutorial/)

### 5) Vue Router Example

This example is very much a WIP. Nonetheless, it illustrates at a high-level how to use `vue-flip-toolkit` with `vue-router`, as well as hook into the `@on-complete` and `@on-start` events.

[Source](stories/IconsHome.vue)

<img width="600" src="https://i.imgur.com/UBVjF4b.gif" />

## What's next?

A lot.

Primarily, I want to make sure that this basic set of functionality works for Vue developers, and that the API makes sense.

Once we check that box, I'd like to add support for additional props for both `Flipped` and `Flipper`. Right now, you can't do _too too_ much with them.
