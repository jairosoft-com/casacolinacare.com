import { describe, expect, test } from 'vitest';

import { jsonLd } from '@/lib/structured-data';

describe('Schema.org Structured Data', () => {
  test('telephone is +18082001840', () => {
    expect(jsonLd.telephone).toBe('+18082001840');
  });

  test('telephone is not the old value', () => {
    expect(jsonLd.telephone).not.toBe('+18008888888');
  });

  test('faxNumber is +18086701163', () => {
    expect(jsonLd.faxNumber).toBe('+18086701163');
  });

  test('faxNumber appears after telephone in object keys', () => {
    const keys = Object.keys(jsonLd);
    const telephoneIndex = keys.indexOf('telephone');
    const faxIndex = keys.indexOf('faxNumber');
    expect(faxIndex).toBeGreaterThan(telephoneIndex);
    expect(faxIndex).toBe(telephoneIndex + 1);
  });

  test('streetAddress is 189 Anapalau Street without (Hawaii Kai)', () => {
    expect(jsonLd.address.streetAddress).toBe('189 Anapalau Street');
    expect(jsonLd.address.streetAddress).not.toContain('Anapalua');
    expect(jsonLd.address.streetAddress).not.toContain('(Hawaii Kai)');
  });

  test('addressLocality is Honolulu, not Hawaii Kai', () => {
    expect(jsonLd.address.addressLocality).toBe('Honolulu');
    expect(jsonLd.address.addressLocality).not.toBe('Hawaii Kai');
  });
});
