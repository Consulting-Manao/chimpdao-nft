import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center"
      >
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-glow">404</h1>
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
      <Footer />
    </div>
  );
};

export default NotFound;
