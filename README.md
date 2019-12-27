# node-namespace-matcher

Utility to check if certain namespace is matched/found against a pattern.

- Can be used as feature flags toggle in apps
- Allows for customization of logger (similar to debug pattern used in the Node core)

**Note:** Matching is case insensitive.

---

## Usage

```js
/**
 * Require the module
 */
const NamespaceMatcher = require('namespace-matcher');

/**
 * Build pattern-match namespace checker, create instance
 *
 * @param {String} pattern
 * @return {Function}
 *
 * @example patterns
 *   `*` for wildcard
 *   `-` to exclude
 *   `feature1`
 *   `feature1*`
 *   `*,-feature1`
 *   `feature1,-feature2,feature3`
 */
const check = NamespaceMatcher('feature1,feature2:*');

/**
 * Check if certain namespace is mateched/found
 *
 * @param {Sting} namespace
 * @return {Boolean}
 */
check('feature1'); // true | false
```


## Examples

See [test directory](/test/index.test.js)


## License

[MIT](https://mit-license.org)
