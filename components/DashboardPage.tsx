
import React from 'react';
import { User, Listing } from '../types';

interface DashboardPageProps {
  user: User;
  listings: Listing[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ user, listings }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-primary">Welcome, {user.name}!</h1>
        <p className="text-textSecondary mt-2">{user.email}</p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-textPrimary mb-4">Your Listings</h2>
        {listings.length > 0 ? (
          <div className="space-y-4">
            {listings.map(listing => (
              <div key={listing.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                    <img src={listing.imageUrl} alt={listing.title} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                        <h3 className="font-semibold text-lg text-textPrimary">{listing.title}</h3>
                        <p className="text-primary font-bold">₹{listing.price.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-textSecondary">{listing.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
                <div>
                    {/* In a real app, these buttons would have functionality */}
                    <button className="text-sm bg-secondary text-white px-3 py-1 rounded-md hover:bg-primary mr-2">Edit</button>
                    <button className="text-sm bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-textPrimary">You haven't listed any items yet.</h3>
            <p className="text-textSecondary mt-2">Click "Sell Item" in the header to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
