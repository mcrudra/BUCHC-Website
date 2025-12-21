// Middleware to check if user is authenticated
export const isAuthenticated = (req, res, next) => {
  // Check if request is from browser (HTML) or API (JSON)
  const isApiRequest = req.headers.accept && req.headers.accept.includes('application/json');
  
  if (req.session && req.session.userId) {
    return next();
  }
  
  // If it's an API request, return JSON
  if (isApiRequest) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  // Otherwise redirect to login
  res.redirect('/buchcadmin');
};
