# Testing Strategy: 60% Coverage Target

## 🎯 **Coverage Goals**

### Target: 60% Overall Coverage

This is a balanced approach that ensures quality without over-testing:

- ✅ **60%** is industry standard for web applications
- ✅ Focuses on critical business logic
- ✅ Avoids testing framework code
- ✅ Maintains development velocity

---

## 📊 **Coverage Breakdown**

### **What to Test (Priority)**

| Component Type         | Coverage Target | Why                    |
| ---------------------- | --------------- | ---------------------- |
| **Business Logic**     | 80-90%          | Critical functionality |
| **API Services**       | 70-80%          | Data integrity         |
| **Utilities**          | 70-80%          | Reused everywhere      |
| **Components (Logic)** | 60-70%          | User interactions      |
| **Components (UI)**    | 30-40%          | Visual, less critical  |
| **Config Files**       | 0%              | No logic to test       |

---

## 🧪 **Testing Pyramid**

```text
        /\
       /  \      E2E Tests (10%)
      /----\     - Critical user journeys
     /      \    - Happy paths
    /--------\
   /          \  Integration Tests (30%)
  /------------\ - API integration
 /              \- Component integration
/________________\
  Unit Tests (60%)
  - Utilities
  - Services
  - Business logic
```

---

## ✅ **What to Test**

### **1. Utility Functions (High Priority)**

```typescript
// src/utils/formatters.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from './formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format USD correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });

    it('should handle zero', () => {
      expect(formatCurrency(0, 'USD')).toBe('$0.00');
    });

    it('should handle negative values', () => {
      expect(formatCurrency(-100, 'USD')).toBe('-$100.00');
    });
  });

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-01-01');
      expect(formatDate(date)).toBe('January 1, 2025');
    });
  });
});
```

### **2. API Services (High Priority)**

```typescript
// src/lib/api/services/users.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { userService } from './users';

// Mock the API client
vi.mock('../client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAll', () => {
    it('should fetch all users', async () => {
      const mockUsers = [{ id: '1', name: 'John', email: 'john@example.com' }];

      const apiClient = await import('../client');
      vi.mocked(apiClient.default.get).mockResolvedValue({
        data: mockUsers,
        error: null,
      });

      const result = await userService.getAll();

      expect(result.data).toEqual(mockUsers);
      expect(result.error).toBeNull();
    });

    it('should handle errors', async () => {
      const apiClient = await import('../client');
      vi.mocked(apiClient.default.get).mockResolvedValue({
        data: null,
        error: 'Network error',
      });

      const result = await userService.getAll();

      expect(result.data).toBeNull();
      expect(result.error).toBe('Network error');
    });
  });
});
```

### **3. Component Logic (Medium Priority)**

```typescript
// src/components/Counter.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  it('should render initial count', () => {
    render(<Counter initialCount={0} />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('should increment count on button click', () => {
    render(<Counter initialCount={0} />);

    const button = screen.getByText('Increment');
    fireEvent.click(button);

    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });

  it('should not go below zero', () => {
    render(<Counter initialCount={0} />);

    const button = screen.getByText('Decrement');
    fireEvent.click(button);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });
});
```

### **4. Server Actions (Medium Priority)**

```typescript
// src/lib/actions/user-actions.test.ts
import { describe, it, expect, vi } from 'vitest';
import { createUser } from './user-actions';

// Mock Next.js cache functions
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

describe('createUser', () => {
  it('should create user successfully', async () => {
    const mockUser = { id: '1', name: 'John', email: 'john@example.com' };

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    } as Response);

    const formData = new FormData();
    formData.append('name', 'John');
    formData.append('email', 'john@example.com');

    const result = await createUser(formData);

    expect(result.success).toBe(true);
    expect(result.user).toEqual(mockUser);
  });

  it('should handle API errors', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const formData = new FormData();
    formData.append('name', 'John');
    formData.append('email', 'john@example.com');

    const result = await createUser(formData);

    expect(result.error).toBe('Failed to create user');
  });
});
```

### **5. E2E Tests (Low Priority, High Value)**

```typescript
// tests/e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Registration Flow', () => {
  test('should allow user to register and login', async ({ page }) => {
    // Navigate to sign-up page
    await page.goto('/sign-up');

    // Fill form
    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', 'john@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');

    // Submit
    await page.click('button[type="submit"]');

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');

    // Should see welcome message
    await expect(page.getByText('Welcome, John')).toBeVisible();
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    await page.goto('/sign-up');

    // Submit empty form
    await page.click('button[type="submit"]');

    // Should show errors
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
  });
});
```

---

## ❌ **What NOT to Test**

### **1. Third-Party Libraries**

```typescript
// ❌ DON'T TEST
import { describe, it } from 'vitest';
import { clsx } from 'clsx';

describe('clsx', () => {
  it('should merge classes', () => {
    // Don't test external libraries!
  });
});
```

### **2. Framework Code**

```typescript
// ❌ DON'T TEST
describe('Next.js routing', () => {
  it('should navigate to page', () => {
    // Don't test Next.js internals!
  });
});
```

### **3. Simple Presentational Components**

```typescript
// ❌ LOW PRIORITY (unless complex logic)
export function Logo() {
  return <img src="/logo.svg" alt="Logo" />;
}
// No logic = no test needed
```

### **4. Configuration Files**

```typescript
// ❌ DON'T TEST
// tailwind.config.ts
// next.config.ts
// etc.
```

---

## 🎯 **Coverage Configuration**

Update `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/unit/setup.ts',
    exclude: [
      '**/node_modules/**',
      '**/tests/e2e/**',
      '**/.next/**',
      '**/*.spec.ts',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '.next/',
        '**/*.js',
        '**/*.config.*',
        '**/types.ts',
        '**/main.ts',
        // Exclude files with no logic
        '**/*.d.ts',
        '**/index.ts', // Re-export files
      ],
      // Set thresholds
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
  },
});
```

---

## 📊 **Running Coverage**

```bash
# Run tests with coverage
npm test -- --coverage

# View coverage report in browser
open coverage/index.html

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- user-service.test.ts

# Run tests matching pattern
npm test -- --grep "user"
```

---

## 🎓 **Best Practices**

### **1. Follow AAA Pattern**

```typescript
it('should format currency', () => {
  // Arrange
  const amount = 1234.56;
  const currency = 'USD';

  // Act
  const result = formatCurrency(amount, currency);

  // Assert
  expect(result).toBe('$1,234.56');
});
```

### **2. Test Behavior, Not Implementation**

```typescript
// ✅ GOOD - Tests behavior
it('should show welcome message after login', async () => {
  await loginUser('john@example.com', 'password');
  expect(screen.getByText(/welcome/i)).toBeVisible();
});

// ❌ BAD - Tests implementation
it('should call useState hook', () => {
  // Don't test React internals
});
```

### **3. Use Descriptive Test Names**

```typescript
// ✅ GOOD
it('should show error message when email is invalid', () => {});

// ❌ BAD
it('test email', () => {});
```

### **4. Mock External Dependencies**

```typescript
// Mock API calls
vi.mock('@/lib/api/client');

// Mock Next.js functions
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
}));
```

### **5. Clean Up After Tests**

```typescript
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});
```

---

## 📈 **Coverage Report Structure**

After running `npm test -- --coverage`:

```text
coverage/
├── index.html          # Main report (open in browser)
├── lcov.info          # For CI/CD tools
└── coverage-final.json # Raw data
```

---

## ✅ **Testing Checklist**

- [ ] All utilities have unit tests
- [ ] API services have unit tests
- [ ] Components with logic have tests
- [ ] Server Actions have tests
- [ ] Critical user flows have E2E tests
- [ ] Coverage is at least 60%
- [ ] All tests pass in CI/CD
- [ ] No false positives

---

## 🚀 **Quick Start**

```bash
# Run all tests
npm test

# Watch mode
npm test -- --watch

# Coverage report
npm test -- --coverage

# E2E tests
npm run test:e2e

# E2E with UI
npm run test:e2e:ui
```

---

## 🎯 **Summary**

**Achieving 60% coverage:**

1. ✅ Test all utilities (formatters, validators)
2. ✅ Test API services
3. ✅ Test business logic
4. ✅ Test component interactions
5. ✅ E2E test critical flows
6. ❌ Skip presentational components
7. ❌ Skip third-party code
8. ❌ Skip config files

**Focus on value, not vanity metrics!**
