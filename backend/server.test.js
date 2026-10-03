import test from 'node:test';
import assert from 'node:assert/strict';

test('runtime provides fetch for health checks', () => {
  assert.equal(typeof fetch, 'function');
});
