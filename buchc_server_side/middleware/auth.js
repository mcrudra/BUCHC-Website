// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  // Log session info for debugging
  console.log('Auth check:', {
    hasSession: !!req.session,
    sessionId: req.session?.id,
    userId: req.session?.userId,
    cookies: req.headers.cookie ? 'present' : 'missing',
    origin: req.headers.origin
  });
  
  // Check if request is from browser (HTML) or API (JSON)
  const isApiRequest = req.headers.accept && req.headers.accept.includes('application/json');
  
  if (req.session && req.session.userId) {
    console.log('✅ Authenticated, allowing request');
    return next();
  }
  
  console.log('❌ Not authenticated');
  
  // If it's an API request, return JSON
  if (isApiRequest) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // Otherwise redirect to login
  res.redirect('/buchcadmin');
};
