/**!
 *
 * Copyright (c) 2015-2016 Cisco Systems, Inc. See LICENSE file.
 * @private
 */

import {assert} from '@ciscospark/test-helper-chai';
import {make} from '../..';


describe(`common`, () => {
  describe(`TemplateContainer`, () => {
    describe(`make()`, () => {
      // _.memoize breaks most of the tests; at the moment, we're not creating
      // very many containers of the same shape, so I'm not too concerned about
      // this at the moment
      it.skip(`is memoized`, () => {
        const WeakKeyedMap = make(WeakMap, Map);
        const WeakKeyedMap2 = make(WeakMap, Map);

        assert.equal(WeakKeyedMap2, WeakKeyedMap);
      });
    });

    describe(`make(Map)`, () => {
      it(`behaves like a map`, () => {
        const MadeMap = make(Map);

        const key = {};
        const value = 42;

        const m = new MadeMap();

        assert.isFalse(m.has(key));
        m.set(key, value);
        assert.equal(m.get(key), value);
        assert.isTrue(m.has(key));
        assert.isTrue(m.delete(key));
        assert.isFalse(m.has(key));
      });
    });

    describe(`make(WeakMap, Map)`, () => {
      it(`works`, () => {
        const WeakKeyedMap = make(WeakMap, Map);
        class Base {}
        const key = {};
        const value = 42;

        const b = new Base();
        const w = new WeakKeyedMap();

        assert.isFalse(w.has(b, key));
        w.set(b, key, value);
        assert.equal(w.get(b, key), value);
        assert.isTrue(w.has(b, key));
        assert.isTrue(w.delete(b, key));
        assert.isFalse(w.has(b, key));
      });
    });

    describe(`make(Map, Map, Set)`, () => {
      it(`works`, () => {
        const key1 = {};
        const key2 = `blarg`;
        const value = 42;

        const M = Map;
        const S = Set;

        const Container = make(M, M, S);
        const c = new Container();
        assert.isFalse(c.has(key1, key2, value));
        c.set(key1, key2, value);
        assert.instanceOf(c.get(key1, key2), Set);
        assert.isTrue(c.has(key1, key2, value));
        assert.isTrue(c.delete(key1, key2, value));
        assert.isFalse(c.has(key1, key2, value));
      });
    });
  });
});
