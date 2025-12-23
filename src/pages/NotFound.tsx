import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center"
    >
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">
          Oops! Page not found
        </p>
        <Link
          to="/"
          className="inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
