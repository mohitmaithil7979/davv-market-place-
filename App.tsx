
import React, { useState, useEffect, useCallback } from 'react';
import { User, Listing, View } from './types';
import { getListings as fetchListings, createListing as apiCreateListing } from './services/marketplaceService';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import BrowsePage from './components/BrowsePage';
import ListingDetailPage from './components/ListingDetailPage';
import CreateListingPage from './components/CreateListingPage';
import DashboardPage from './components/DashboardPage';
import Spinner from './components/Spinner';

// This is the main component of the application.
// It acts as a controller, managing which "page" is currently visible to the user.
export default function App() {
  // State to hold the currently authenticated user. Null if no one is logged in.
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State to manage the current view (e.g., browse page, login page). Defaults to 'browse'.
  const [currentView, setCurrentView] = useState<View>('browse');

  // State to hold the listing that the user has selected to view in detail.
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  // State to store all the listings fetched from the service.
  const [listings, setListings] = useState<Listing[]>([]);

  // State to indicate if the application is currently fetching data.
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // State to indicate if there was an error during data fetching.
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all listings from the mock service.
  // It uses useCallback to prevent being recreated on every render.
  const loadListings = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedListings = await fetchListings();
      setListings(fetchedListings);
    } catch (err) {
      setError('Failed to load listings. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect hook to load listings when the component first mounts.
  // The empty dependency array [] means this effect runs only once.
  useEffect(() => {
    loadListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handler for when a user successfully logs in.
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('browse'); // After login, redirect to the browse page.
  };

  // Handler for logging out.
  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('browse'); // After logout, show the browse page.
  };

  // Handler to navigate to a different view.
  const handleNavigate = (view: View) => {
    setSelectedListing(null); // Clear selected listing when navigating away
    setCurrentView(view);
  };
  
  // Handler for when a user clicks on a listing to see details.
  const handleSelectListing = (listing: Listing) => {
    setSelectedListing(listing);
    setCurrentView('detail');
  };

  // Handler for creating a new listing.
  const handleCreateListing = async (newListingData: Omit<Listing, 'id' | 'sellerEmail' | 'sellerName' | 'createdAt'>) => {
    if (!currentUser) {
        alert("You must be logged in to create a listing.");
        return;
    }
    setIsLoading(true);
    try {
        const newListing = await apiCreateListing(newListingData, currentUser);
        setListings(prev => [newListing, ...prev]);
        setCurrentView('dashboard'); // Navigate to dashboard to see new listing
    } catch (err) {
        setError("Failed to create listing.");
        console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  // Function to render the correct page component based on the current view state.
  const renderContent = () => {
    if (isLoading && listings.length === 0) {
      return <div className="flex justify-center items-center h-96"><Spinner /></div>;
    }

    if (error) {
        return <div className="text-center text-red-500 p-8">{error}</div>
    }

    switch (currentView) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'browse':
        return <BrowsePage listings={listings} onSelectListing={handleSelectListing} />;
      case 'detail':
        return selectedListing ? <ListingDetailPage listing={selectedListing} onBack={() => handleNavigate('browse')} currentUser={currentUser} /> : <p>Listing not found.</p>;
      case 'create':
        return currentUser ? <CreateListingPage onSubmit={handleCreateListing} /> : <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        const userListings = listings.filter(l => l.sellerEmail === currentUser?.email);
        return currentUser ? <DashboardPage user={currentUser} listings={userListings} /> : <LoginPage onLogin={handleLogin} />;
      default:
        return <BrowsePage listings={listings} onSelectListing={handleSelectListing} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary font-sans">
      <Header
        user={currentUser}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}
