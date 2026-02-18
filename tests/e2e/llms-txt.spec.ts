import { expect, test } from '@playwright/test';

test.describe('llms.txt', () => {
  test('file is accessible with correct address and old value absent', async ({
    request,
  }) => {
    const response = await request.get('/llms.txt');

    // HTTP 200
    expect(response.status()).toBe(200);

    // Content-Type contains text/plain
    const contentType = response.headers()['content-type'] ?? '';
    expect(contentType).toContain('text/plain');

    const body = await response.text();

    // Corrected address present
    expect(body).toContain('189 Anapalau Street (Hawaii Kai), Honolulu, HI');

    // Old address absent
    expect(body).not.toContain('189 Anapalua Street');
  });
});
