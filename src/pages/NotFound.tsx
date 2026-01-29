import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const BackgroundPattern = () => (
  <div 
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage: 'url(/token-bg-pattern.png)',
      backgroundSize: '600px',
      backgroundRepeat: 'repeat'
    }}
    aria-hidden="true"
  />
);

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-[hsl(30_25%_32%)]">
      <BackgroundPattern />
      <main
        id="main-content"
        className="flex-1 flex items-center justify-center relative z-10"
      >
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
          <p className="mb-6 text-xl text-white/60">
            Oops! Page not found
          </p>
          <Link
            to="/"
            className="inline-block rounded-md bg-chimp-purple px-6 py-3 text-white font-medium hover:bg-[hsl(270_100%_55%)] transition-colors"
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
