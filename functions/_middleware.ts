// functions/_middleware.ts
export const onRequest = async ({ request, next, env }) => {
  const url = new URL(request.url);

  // Only apply auth to /api routes
  if (!url.pathname.startsWith('/api/')) {
    return next();
  }

  // Skip auth for login API
  if (url.pathname === '/api/auth/login') {
    return next();
  }

  // Basic Session logic (Placeholder for JWT/Cookie)
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Mock User Session from Header (For demo purposes)
  // In production, verify JWT and fetch user from DB/KV
  const parts = authHeader.split(' ');
  if (parts.length < 2) {
    return new Response('Unauthorized', { status: 401 });
  }

  const [role, userId] = parts;

  if (!['ADMIN', 'STUDENT'].includes(role)) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Pass user info to context
  const user = { id: userId, role };

  // RBAC control
  if (url.pathname.startsWith('/api/admin') && role !== 'ADMIN') {
    return new Response('Forbidden', { status: 403 });
  }

  if (url.pathname.startsWith('/api/student') && role !== 'STUDENT') {
    return new Response('Forbidden', { status: 403 });
  }

  return next();
};
