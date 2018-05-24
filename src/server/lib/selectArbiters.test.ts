import { suite, test } from 'mocha-typescript';
import selectArbiters from './selectArbiters';
const unique = require('array-unique');
const equal = require('fast-deep-equal');

suite("one", () => {
  test("result", done => {
    const selected = selectArbiters(['1', '2', '3'], 'seed', 4);
    done(selected);
  });

  test("result length", done => {
    const count = 3;
    const selected = selectArbiters(['1', '2', '3'], 'seed', count);
    done(selected.length !== count);
  });

  test("result has no dublicates", done => {
    const count = 3;
    const selected = selectArbiters(['1', '2', '3'], 'seed', count);
    const uniqueSelected = unique(selected);
    done(uniqueSelected.length !== count);
  });

  test("result with same seeds has same values", done => {
    const count = 3;
    const selected = selectArbiters(['1', '2', '3', '4', '5'], 'seed', count);
    const selected2 = selectArbiters(['1', '2', '3', '4', '5'], 'seed', count);
    done(!equal(selected, selected2));
  });

  test("result with different seeds has different values", done => {
    const count = 3;
    const selected = selectArbiters(['1', '2', '3', '4', '5'], 'seed', count);
    const selected2 = selectArbiters(['1', '2', '3', '4', '5'], 'seed1', count);
    done(equal(selected, selected2));
  });
});