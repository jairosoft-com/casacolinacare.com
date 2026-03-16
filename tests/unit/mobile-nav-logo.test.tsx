import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import { MobileNav } from '@/components/layout/mobile-nav';

describe('Mobile Nav Logo — Font Consistency (US-008-03)', () => {
  test('TEST-008-03: mobile nav SheetTitle has font-heading class', async () => {
    const user = userEvent.setup();
    render(<MobileNav pathname="/" />);
    const menuButton = screen.getByRole('button', { name: /toggle menu/i });
    await user.click(menuButton);
    const title = await screen.findByText('Casa Colina Care');
    expect(title).toHaveClass('font-heading');
  });
});
