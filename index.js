'use strict';

function TestFalse () {}
TestFalse.test = () => false;

/**
 * Build pattern-match namespace checker
 * ie. check if a namespace is found against a pattern
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
function PatternMatcher (pattern) {
  // Return false checker
  if (typeof pattern !== 'string') {
    return TestFalse.test;
  }

  pattern = pattern.trim().toLowerCase().replace(/\s{1,}/gm, '');

  // Return false checker on bad string
  if (!pattern.length) {
    return TestFalse.test;
  }

  let names = [];
  let skips = [];

  // Prepare regex
  pattern.split(/[\s,]+/).forEach(i => {
    i = i.replace(/\*/g, '.*?');

    if (i.charAt(0) === '-') {
      skips.push(`^${i.substr(1)}$`);
    } else {
      names.push(`^${i}$`);
    }
  });

  names = names.length ? new RegExp(names.join('|'), 'i') : TestFalse;
  skips = skips.length ? new RegExp(skips.join('|'), 'i') : TestFalse;

  /**
   * Check if certain namespace is mateched/found
   *
   * @param {Sting} namespace
   * @return {Boolean}
   */
  return function check (namespace) {
    // Return false early
    if (typeof namespace !== 'string') {
      return false;
    }

    if (skips.test(namespace)) {
      return false;
    }
    if (names.test(namespace)) {
      return true;
    }
    return false;
  };
}

module.exports = PatternMatcher;
