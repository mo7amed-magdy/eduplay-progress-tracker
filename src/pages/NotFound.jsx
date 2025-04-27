
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-700 mb-6">Oops! We couldn't find the page you're looking for</p>
        <p className="text-gray-500 mb-8">
          The page you requested doesn't exist or may have been moved.
        </p>
        <Link to="/">
          <Button className="px-8">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
