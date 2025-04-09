import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from '@/contexts/CartContext';
import MatrixBackground from './components/MatrixBackground';

// Import pages
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Lore from "@/pages/Lore";
import Profile from "@/pages/Profile";
import Product from "@/pages/Product";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';

// Import styles
import '@/styles/halloween.css';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
};

// Auth Route Component (redirects to profile if already authenticated)
const AuthRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return !isAuthenticated ? <>{children}</> : <Navigate to="/profile" />;
};

// Layout Component for Protected Routes
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CartProvider>
            <div className="flex flex-col min-h-screen halloween-bg">
              <div 
                className="cursor"
                style={{
                  left: `${cursorPosition.x}px`,
                  top: `${cursorPosition.y}px`
                }}
              />
              <div 
                className="cursor-follower"
                style={{
                  left: `${followerPosition.x}px`,
                  top: `${followerPosition.y}px`
                }}
              />
              <MatrixBackground opacity={20} />
              <Navbar />
              <Routes>
                {/* Auth Routes */}
                <Route path="/auth/login" element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                } />
                <Route path="/auth/signup" element={
                  <AuthRoute>
                    <Signup />
                  </AuthRoute>
                } />

                {/* Protected Routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <Home />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } />
                <Route path="/shop" element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <Shop />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } />
                <Route path="/lore" element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <Lore />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <Profile />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } />
                <Route path="/product/:id" element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <Product />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <ProtectedLayout>
                      <Cart />
                    </ProtectedLayout>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
              <Sonner />
            </div>
          </CartProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
