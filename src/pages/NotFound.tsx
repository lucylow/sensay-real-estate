import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" role="main">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <nav aria-label="Navigation options">
          <div className="space-y-4">
            <a 
              href="/" 
              className="block w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Return to home page"
            >
              Return to Home
            </a>
            <a 
              href="/app" 
              className="block w-full px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Go to application dashboard"
            >
              Go to Dashboard
            </a>
          </div>
        </nav>
        <p className="text-sm text-gray-500 mt-6">
          Requested path: <code className="bg-gray-200 px-2 py-1 rounded text-xs">{location.pathname}</code>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
