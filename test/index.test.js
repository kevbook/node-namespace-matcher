'use strict';

const tap = require('tap');
const PatternMatcher = require('../');

tap.test('undefined', async t => {
  let result;
  const check = PatternMatcher();

  result = check();
  t.equal(result, false);

  result = check(null);
  t.equal(result, false);

  result = check('');
  t.equal(result, false);

  result = check('something');
  t.equal(result, false);

  result = check('*');
  t.equal(result, false);
});

tap.test('Empty', async t => {
  let result;
  const check = PatternMatcher('');

  result = check();
  t.equal(result, false);

  result = check(null);
  t.equal(result, false);

  result = check('');
  t.equal(result, false);

  result = check('something');
  t.equal(result, false);

  result = check('*');
  t.equal(result, false);
});

tap.test('*', async t => {
  let result;
  const check = PatternMatcher('*');

  result = check();
  t.equal(result, false);

  result = check(null);
  t.equal(result, false);

  result = check('');
  t.equal(result, true);

  result = check('something');
  t.equal(result, true);

  result = check('*');
  t.equal(result, true);
});

tap.test('*,-feature1', async t => {
  let result;
  const check = PatternMatcher('*,-feature1');

  result = check('');
  t.equal(result, true);

  result = check('feature2');
  t.equal(result, true);

  result = check('feature2:something');
  t.equal(result, true);

  result = check('feature1');
  t.equal(result, false);

  // Should pass because the rule is exact "feature1"
  result = check('feature1:something');
  t.equal(result, true);
});

tap.test('-feature1,*', async t => {
  let result;
  const check = PatternMatcher('-feature1,*');

  result = check('');
  t.equal(result, true);

  result = check('feature2');
  t.equal(result, true);

  result = check('feature1');
  t.equal(result, false);

  // Should pass because the rule is exact "feature1"
  result = check('feature1:something');
  t.equal(result, true);
});

tap.test('-feature1', async t => {
  let result;
  const check = PatternMatcher('-feature1');

  result = check('');
  t.equal(result, false);

  result = check('feature1');
  t.equal(result, false);

  result = check('feature2');
  t.equal(result, false);
});

tap.test('feature1,-feature2', async t => {
  let result;
  const check = PatternMatcher('feature1,-feature2');

  result = check('');
  t.equal(result, false);

  result = check('feature1');
  t.equal(result, true);

  result = check('feature2');
  t.equal(result, false);

  result = check('feature2:something');
  t.equal(result, false);
});

tap.test('feature1,-feature2,feature3', async t => {
  let result;
  const check = PatternMatcher('feature1,-feature2,feature3');

  result = check('');
  t.equal(result, false);

  result = check('feature1');
  t.equal(result, true);

  result = check('feature2');
  t.equal(result, false);

  result = check('feature3');
  t.equal(result, true);
});

tap.test('feature1,feature1:*,feature2,-feature2:*', async t => {
  let result;
  const check = PatternMatcher('feature1,feature1:*,feature2,-feature2:*');

  result = check('');
  t.equal(result, false);

  result = check('feature1');
  t.equal(result, true);

  result = check('feature1:something');
  t.equal(result, true);

  result = check('feature2');
  t.equal(result, true);

  result = check('feature2-something');
  t.equal(result, false);

  result = check('feature2:something');
  t.equal(result, false);
});

tap.test('feature1,-feature1:*,feature2*', async t => {
  let result;
  const check = PatternMatcher('feature1,-feature1:*,feature2*');

  result = check('');
  t.equal(result, false);

  result = check('feature1');
  t.equal(result, true);

  result = check('feature1:');
  t.equal(result, false);

  result = check('feature1:something');
  t.equal(result, false);

  result = check('feature2');
  t.equal(result, true);

  result = check('feature2-something');
  t.equal(result, true);

  result = check('feature2:something');
  t.equal(result, true);
});

tap.test('Case insensitive - FEATURE1,-FEATURE1:*,FEATURE2*', async t => {
  let result;
  const check = PatternMatcher('FEATURE1,-FEATURE1:*,FEATURE2*');

  result = check('');
  t.equal(result, false);

  result = check('feature1');
  t.equal(result, true);

  result = check('feature1:');
  t.equal(result, false);

  result = check('feature1:something');
  t.equal(result, false);

  result = check('feature2');
  t.equal(result, true);

  result = check('feature2-something');
  t.equal(result, true);

  result = check('feature2:something');
  t.equal(result, true);
});

tap.test('Case insensitive - feature1,-feature1:*,feature2*', async t => {
  let result;
  const check = PatternMatcher('feature1,-feature1:*,feature2*');

  result = check('');
  t.equal(result, false);

  result = check('FEATURE1');
  t.equal(result, true);

  result = check('FEATURE1:');
  t.equal(result, false);

  result = check('FEATURE1:SOMETHING');
  t.equal(result, false);

  result = check('FEATURE2');
  t.equal(result, true);

  result = check('FEATURE2-SOMETHING');
  t.equal(result, true);

  result = check('FEATURE2:SOMETHING');
  t.equal(result, true);
});
