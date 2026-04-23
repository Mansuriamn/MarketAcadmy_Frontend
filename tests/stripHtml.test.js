import test from 'node:test';
import assert from 'node:assert';

// Mock DOMParser for Node environment
global.DOMParser = class {
  parseFromString(html, _type) {
    return {
      body: {
        textContent: html.replace(/<[^>]*>/g, '').trim()
      }
    };
  }
};

// Import the function to test
// Note: In a real Vitest setup, we wouldn't need this mock manually
import { stripHtml } from '../src/utils/stripHtml.js';

test('stripHtml - Basic Tags', (_t) => {
  const input = '<p>Hello <b>World</b></p>';
  const expected = 'Hello World';
  assert.strictEqual(stripHtml(input), expected);
});

test('stripHtml - Whitespace Normalization', (_t) => {
  const input = '  <p>Hello</p>   <p>World</p>  ';
  const expected = 'Hello World';
  assert.strictEqual(stripHtml(input), expected);
});

test('stripHtml - Empty / Null', (_t) => {
  assert.strictEqual(stripHtml(''), '');
  assert.strictEqual(stripHtml(null), '');
});
