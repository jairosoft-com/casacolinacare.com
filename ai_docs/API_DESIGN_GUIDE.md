# API Design Guide for Next.js 15

## 🎯 **The Two Approaches: Server Actions vs Route Handlers**

In Next.js 15, you have two ways to handle server-side logic:

1. **Server Actions** - For mutations (CREATE, UPDATE, DELETE)
2. **Route Handlers** - For traditional REST APIs (GET, POST, etc.)

---

## 📋 **When to Use Each**

### **Server Actions** ✅ (Preferred for Forms & Mutations)

**Use when:**

- ✅ Handling form submissions
- ✅ Mutating data (create, update, delete)
- ✅ Progressive enhancement (works without JavaScript)
- ✅ Calling from client components directly

**Benefits:**

- No need to create API routes
- Automatic CSRF protection
- Type-safe
- Can call directly from forms or client components

**Example:**

```typescript
// src/lib/actions/user-actions.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function createUser(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  // Call your external API
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    return { error: 'Failed to create user' };
  }

  const user = await response.json();

  // Revalidate the page to show new data
  revalidatePath('/users');

  return { success: true, user };
}

export async function updateUser(
  userId: string,
  data: { name?: string; email?: string },
) {
  'use server'; // Can also be inline

  const response = await fetch(`https://api.example.com/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { error: 'Failed to update user' };
  }

  revalidatePath('/users');
  return { success: true };
}

export async function deleteUser(userId: string) {
  'use server';

  const response = await fetch(`https://api.example.com/users/${userId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    return { error: 'Failed to delete user' };
  }

  revalidatePath('/users');
  return { success: true };
}
```

**Usage in Client Component:**

```typescript
'use client';
import { createUser } from '@/lib/actions/user-actions';

export function CreateUserForm() {
  const handleSubmit = async (formData: FormData) => {
    const result = await createUser(formData);

    if (result.error) {
      console.error(result.error);
    } else {
      console.log('User created!', result.user);
    }
  };

  return (
    <form action={handleSubmit}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Create User</button>
    </form>
  );
}
```

---

### **Route Handlers** ✅ (For REST APIs & External Access)

**Use when:**

- ✅ Building a public API
- ✅ Webhooks (external services calling you)
- ✅ Non-form data fetching (GET requests)
- ✅ Need full control over HTTP response
- ✅ Mobile app or external clients need access

**Example:**

```typescript
// src/app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';

  try {
    // Call your external API
    const response = await fetch(
      `https://api.example.com/users?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch users' },
        { status: response.status },
      );
    }

    const users = await response.json();

    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Call your external API
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: response.status },
      );
    }

    const user = await response.json();

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
```

**Dynamic Routes:**

```typescript
// src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET /api/users/123
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const response = await fetch(`https://api.example.com/users/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const user = await response.json();
  return NextResponse.json(user);
}

// PUT /api/users/123
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const body = await request.json();

  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: response.status },
    );
  }

  const user = await response.json();
  return NextResponse.json(user);
}

// DELETE /api/users/123
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: response.status },
    );
  }

  return NextResponse.json({ success: true });
}
```

---

## 📊 **Comparison Table**

| Feature                     | Server Actions       | Route Handlers         |
| --------------------------- | -------------------- | ---------------------- |
| **URL**                     | No URL needed        | `/api/...`             |
| **Use Case**                | Forms, mutations     | REST API, webhooks     |
| **Client Access**           | Direct function call | HTTP fetch             |
| **Progressive Enhancement** | ✅ Works without JS  | ❌ Requires JS         |
| **CSRF Protection**         | ✅ Automatic         | ⚠️ Manual              |
| **Type Safety**             | ✅ Full              | ⚠️ Requires validation |
| **Response Format**         | Return objects       | `NextResponse`         |
| **External Access**         | ❌ No                | ✅ Yes                 |
| **Webhooks**                | ❌ No                | ✅ Yes                 |

---

## 🎯 **Your Use Case: API-First Architecture**

Since you're calling external APIs, here's the recommended pattern:

### **Pattern 1: Server Actions for Mutations (Recommended)**

```typescript
// src/lib/actions/product-actions.ts
'use server';

import apiClient from '@/lib/api/client';
import { revalidatePath } from 'next/cache';

export async function addToCart(productId: string, quantity: number) {
  const token = await getAuthToken(); // Get from Clerk or your auth

  apiClient.setAuthToken(token);
  const result = await apiClient.post('/cart/items', {
    productId,
    quantity,
  });

  if (result.error) {
    return { error: result.error };
  }

  revalidatePath('/cart');
  return { success: true, data: result.data };
}
```

```typescript
// Usage in component
'use client';
import { addToCart } from '@/lib/actions/product-actions';

export function AddToCartButton({ productId }: { productId: string }) {
  const handleAdd = async () => {
    const result = await addToCart(productId, 1);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success('Added to cart!');
    }
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

### **Pattern 2: Server Components for Data Fetching**

```typescript
// src/app/products/page.tsx
import apiClient from '@/lib/api/client';

export default async function ProductsPage() {
  // Fetch directly in the Server Component
  const result = await apiClient.get('/products');

  if (result.error) {
    return <div>Error loading products</div>;
  }

  return (
    <div>
      {result.data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### **Pattern 3: Route Handlers for Webhooks**

```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  // Verify webhook signature
  // Process webhook event
  // Call your external API to update order status

  return NextResponse.json({ received: true });
}
```

---

## 🏗️ **Recommended Architecture for Your Project**

```text
┌─────────────────────────────────────────────┐
│         Next.js App (Frontend)              │
│                                             │
│  ┌─────────────────┐  ┌──────────────────┐ │
│  │ Server          │  │ Route Handlers   │ │
│  │ Components      │  │ /api/*           │ │
│  │ (Data Fetching) │  │ (Webhooks)       │ │
│  └────────┬────────┘  └────────┬─────────┘ │
│           │                    │           │
│  ┌────────▼────────────────────▼─────────┐ │
│  │      API Client (/lib/api/client.ts)  │ │
│  │      - Handles auth tokens            │ │
│  │      - Error handling                 │ │
│  │      - Request/response formatting    │ │
│  └────────────────┬──────────────────────┘ │
│                   │                         │
└───────────────────┼─────────────────────────┘
                    │
                    ▼
    ┌───────────────────────────────┐
    │   Your External API           │
    │   (Backend Service)           │
    │   - Database operations       │
    │   - Business logic            │
    │   - Authentication            │
    └───────────────────────────────┘
```

---

## ✅ **Best Practices**

### 1. Centralize API Calls

```typescript
// ✅ GOOD - Single API client
import apiClient from '@/lib/api/client';

// ❌ BAD - Scattered fetch calls
await fetch('https://api.example.com/...');
```

### 2. Handle Errors Consistently

```typescript
// ✅ GOOD
const result = await apiClient.get('/users');
if (result.error) {
  return { error: result.error };
}
return { data: result.data };

// ❌ BAD - Unhandled errors
const data = await apiClient.get('/users'); // What if it fails?
```

### 3. Use Server Actions for Mutations

```typescript
// ✅ GOOD - Server Action
export async function updateProfile(data: FormData) {
  'use server';
  // ...
}

// ❌ BAD - Route Handler for form submission
// Don't use /api/profile for this
```

### 4. Use Environment Variables for API URLs

```typescript
// .env.local
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

// lib/api/client.ts
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL);
```

### 5. Add Request/Response Types

```typescript
// ✅ GOOD
interface User {
  id: string;
  email: string;
}

const result = await apiClient.get<User[]>('/users');

// ❌ BAD - No types
const result = await apiClient.get('/users');
```

---

## 🚀 **Quick Start**

1. ✅ Use the API client I created (`/src/lib/api/client.ts`)
2. ✅ Create service files (`/src/lib/api/services/users.ts`)
3. ✅ Use Server Actions for mutations
4. ✅ Use Server Components for data fetching
5. ✅ Only create Route Handlers for webhooks or public APIs

**You're all set!** 🎉
