# vuedragger

> A Vue.js project with some dragging and a dropping

## Build Setup

``` bash
# install dependencies
npm

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Kalle's comments and notes

> We’d like you to tell us if something doesn’t work in the design, and what alternatives we might have to handle it better.

* The design works UX-wise but I'm not very familiar with the domain so I don't know if there are particular issues.
* An immediate save with an undo option to roll-back could be preferable to having to explicitly save.
* Needs some way to delete account groups (persons) as it is easy to create them.

> In the upcoming versions, we are planning on updating the visual styling by changing the typography and color
scheme (but we don’t have the final design yet).

* I addressed some of this with variables and use of scss. Generally I'd try to extract common primitives into components,use variables for common colors, spacings, font-sizes etc. I could've utilized sass silent classes more, especially for the typography to define common line heights, font sizes and font weights for certain text types.

> We’d like you to prepare for this in your solution in some way and tell us how you’d extend the codebase with future iterations.

* Maybe not the question asked, but the state management strategy in this application gets unwieldy rather quickly. I'm prone to Redux when doing React so I'd probably look into Vuex pretty quickly. Especially if any two views are sharing data.
* Also something to handle flow control when we start orchestrating more complex asynchonous actions & side effects (e.g. vuex-saga or whatever is popular in the Vuex community)

> We’d also like you to show or tell us how you would test your implementation.

* I seem to have broken the unit test runner at some point but I don't have time to fix it currently. It was working in earlier commits. Now it complains with a cryptic `ReferenceError: Can't find variable: exports` error.

* Generally in a real app I'd try to extract the interesting logic away from presentational components so I can test that more easily with unit tests without having to involve dom. If using Vuex I'd assume I'd mostly be testing selectors and reducers. For presentational components mostly devoid of logic sort of smoke test should be enough. Jest has snapshot testing for this which are very low-maintenance, not sure if something similar is possible with Vue.

* re-usable components can also be tested in some sort of harness (e.g. styleguide). It's also easier to develop them to be re-usable there.

* side effects (e.g. async api request) are more easily tested when the related behaviour is isolated into their own testable modules (with whatever side effect management library)

* For e2e tests I'd only have a few testing the happy paths of core use cases.
