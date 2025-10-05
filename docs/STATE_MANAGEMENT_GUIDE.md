# State Management Guide for Next.js 15

## The State Management Hierarchy

In Next.js 15 with React Server Components, you should use the **least powerful
state solution** that solves your problem. Here's the hierarchy:

---

## 1. 🌐 **URL State (Server-Side) - FIRST CHOICE**

**When to use:**

- Filters, search queries, pagination
- Anything that should be shareable via URL
- State that should persist across page refreshes
- State that affects SEO

**How it works:**

```typescript
// app/products/page.tsx (Server Component)
type SearchParams = {
  category?: string;
  page?: string;
  sort?: string;
};

export default async function ProductsPage({
  searchParams
}: {
  searchParams: SearchParams
}) {
  const category = searchParams.category || 'all';
  const page = parseInt(searchParams.page || '1');
  const sort = searchParams.sort || 'newest';

  // Fetch data based on URL params (happens on server)
  const products = await fetch(`/api/products?category=${category}&page=${page}`);

  return <ProductList products={products} />;
}

// Client component that updates URL
'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export function FilterButton({ category }: { category: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set('category', category);
    router.push(`/products?${params.toString()}`);
  };

  return <button onClick={handleClick}>Filter by {category}</button>;
}
```

**Benefits:**

- ✅ Shareable URLs
- ✅ Browser back/forward works
- ✅ SEO-friendly
- ✅ Persists across refreshes
- ✅ Server-side rendering

**Use for:** Filters, search, pagination, tabs, modals (that should be
shareable)

---

## 2. 📦 **Server Component Props (Server-Side) - SECOND CHOICE**

**When to use:**

- Data that's fetched once and displayed
- Data that doesn't change based on user interaction
- Initial page data

**How it works:**

```typescript
// Server Component - no useState needed!
export default async function UserProfile({ userId }: { userId: string }) {
  // Fetch directly in the component
  const user = await fetch(`/api/users/${userId}`).then(r => r.json());

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

**Benefits:**

- ✅ No client-side JavaScript needed
- ✅ Fast initial page load
- ✅ Automatic data deduplication
- ✅ SEO-friendly

**Use for:** Static content, initial data, user profiles, blog posts

---

## 3. 🔄 **Local Component State (Client-Side) - THIRD CHOICE**

**When to use:**

- State confined to a single component
- Form inputs, toggles, modals (not shareable)
- UI state (open/closed, selected tab)

**How it works:**

```typescript
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Benefits:**

- ✅ Simple and straightforward
- ✅ No prop drilling
- ✅ Component is self-contained

**Use for:** Form state, toggles, accordions, local UI state

---

## 4. 🌳 **React Context (Client-Side) - FOURTH CHOICE**

**When to use:**

- State shared across a **small subtree** of components
- Theme preferences (light/dark mode)
- Localized settings (within a feature)

**How it works:**

```typescript
'use client';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

**Benefits:**

- ✅ Avoids prop drilling
- ✅ Good for localized state

**Drawbacks:**

- ⚠️ All consumers re-render when value changes
- ⚠️ Can cause performance issues with frequent updates
- ⚠️ Not great for global state

**Use for:** Theme state, feature-level settings, wizard step state

---

## 5. 🌍 **Zustand (Global State) - LAST RESORT**

**When to use:**

- State needed across **distant parts** of the app
- User authentication status
- Shopping cart
- Notifications/toasts
- Global UI state (sidebar open/closed)

**How it works:**

```typescript
// src/lib/store/index.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
);

// Usage in any component
'use client';
import { useAuthStore } from '@/lib/store';

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated) return <LoginButton />;

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

**Benefits:**

- ✅ Global state accessible anywhere
- ✅ No provider nesting
- ✅ Can persist to localStorage
- ✅ Excellent performance (selective subscriptions)
- ✅ DevTools support

**Use for:** Auth state, shopping cart, global notifications, user preferences

---

## 📊 **Decision Tree**

```
Does the state need to be in the URL? (shareable, SEO)
├─ YES → Use URL State (searchParams)
└─ NO
   │
   Is this data fetched once and never changes?
   ├─ YES → Use Server Component (fetch in RSC)
   └─ NO
      │
      Is the state used in only ONE component?
      ├─ YES → Use useState
      └─ NO
         │
         Is the state shared in a small subtree?
         ├─ YES → Use React Context
         └─ NO
            │
            Is the state needed across distant parts of the app?
            └─ YES → Use Zustand
```

---

## 🎯 **Real-World Examples**

### Example 1: Product Filters (URL State)

```typescript
// ✅ CORRECT - Use URL
/products?category=electronics&price=100-500&sort=price-asc

// ❌ WRONG - Don't use Zustand for this
const filters = useFilterStore(); // Bad! Should be in URL
```

### Example 2: Shopping Cart (Zustand)

```typescript
// ✅ CORRECT - Use Zustand
const cart = useCartStore(); // Global, persisted, used everywhere

// ❌ WRONG - Don't use URL
/products?cart=item1,item2,item3 // Bad! Too complex for URL
```

### Example 3: Form Input (Local State)

```typescript
// ✅ CORRECT - Use useState
const [email, setEmail] = useState('');

// ❌ WRONG - Don't use Zustand
const { email, setEmail } = useFormStore(); // Overkill!
```

---

## 🚫 **Common Mistakes**

### Mistake 1: Using Zustand for Everything

```typescript
// ❌ BAD
const { isModalOpen, setModalOpen } = useUIStore();

// ✅ GOOD
const [isModalOpen, setIsModalOpen] = useState(false);
```

### Mistake 2: Not Using URL State for Filters

```typescript
// ❌ BAD
const [category, setCategory] = useState('all');

// ✅ GOOD
const category = searchParams.get('category') || 'all';
```

### Mistake 3: Using Context for High-Frequency Updates

```typescript
// ❌ BAD - Re-renders entire tree
<CountContext.Provider value={count}>
  {/* Everything re-renders on every count change */}
</CountContext.Provider>

// ✅ GOOD - Only consumers re-render
const count = useCountStore(state => state.count);
```

---

## 📚 **Summary Table**

| State Type       | When to Use          | Examples                    | Tool             |
| ---------------- | -------------------- | --------------------------- | ---------------- |
| **URL**          | Shareable, SEO       | Filters, search, pagination | `searchParams`   |
| **Server Props** | Initial, static data | Blog posts, user profiles   | Server Component |
| **Local State**  | Single component     | Form inputs, toggles        | `useState`       |
| **Context**      | Small subtree        | Theme, wizard steps         | `createContext`  |
| **Zustand**      | Global, distant      | Auth, cart, notifications   | `create()`       |

---

## 🎓 **Best Practices**

1. **Start Simple**: Always try URL state or local state first
2. **Avoid Over-Engineering**: Don't reach for Zustand until you need it
3. **Use Server Components**: Fetch data on the server when possible
4. **Keep State Close**: State should live as close to where it's used as
   possible
5. **Persist Wisely**: Only persist what's necessary (auth, cart, preferences)

---

## 🔗 **Additional Resources**

- [Next.js Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
