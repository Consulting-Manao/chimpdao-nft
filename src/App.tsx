import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import { CollectionRoute, TokenRoute } from "@/pages/CollectionRoute";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import OGCard from "@/pages/OGCard";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <a
          href="#main-content"
          onClick={(e) => {
            // With a <base>, a bare #fragment resolves against it and reloads the page.
            e.preventDefault();
            const main = document.getElementById("main-content");
            main?.setAttribute("tabindex", "-1");
            main?.focus();
          }}
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
        >
          Skip to main content
        </a>
        <Toaster position="bottom-right" theme="dark" />
        <BrowserRouter basename={window.__BASE__.replace(/\/$/, "")}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/og-card" element={<OGCard />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/:contractId" element={<CollectionRoute />} />
            <Route path="/:contractId/:tokenId" element={<TokenRoute />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
