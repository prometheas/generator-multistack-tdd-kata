'use strict';

var <%= kata.pascalized %> = require('./<%= kata.pascalized %>');

describe('<%= kata.pascalized %> variable', function() {
  test('it should not be null', function() {
    expect(<%= kata.pascalized %>).not.toEqual(null);
  });
});
