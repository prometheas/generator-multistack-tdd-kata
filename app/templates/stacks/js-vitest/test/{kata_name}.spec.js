import { describe, it, expect } from 'vitest';
import <%= kata.pascalized %> from '../src/<%= kata.pascalized %>.js';

describe('<%= kata.pascalized %> variable', () => {
  it('should not be null', () => {
    expect(<%= kata.pascalized %>).not.toBe(null);
  });
});
