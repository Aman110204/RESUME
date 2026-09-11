import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Portfolio from "./pages/Portfolio";
import NotFound from "./pages/NotFound";

const AdminPanel = lazy(() => import("./admin/AdminPanel"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={null}>
              <AdminPanel />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
