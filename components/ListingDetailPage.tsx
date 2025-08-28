
import React from 'react';
import { Listing, User } from '../types';

interface ListingDetailPageProps {
  listing: Listing;
  onBack: () => void;
  currentUser: User | null;
}

const ListingDetailPage: React.FC<ListingDetailPageProps> = ({ listing, onBack, currentUser }) => {
  const handleContact = () => {
      if (!currentUser) {
        alert("Please log in to contact the seller.");
        return;
      }
      alert(`This would open a chat with ${listing.sellerName}.\n\nIn a real app with Firebase, you'd create a new chat document in Firestore between ${currentUser.email} and ${listing.sellerEmail}.`);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-4xl mx-auto animate-fade-in">
      <button onClick={onBack} className="flex items-center text-secondary hover:text-primary mb-6 font-semibold">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Back to Listings
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={listing.imageUrl} alt={listing.title} className="w-full h-auto object-cover rounded-lg shadow-md" />
        </div>
        <div>
          <span className="bg-secondary/20 text-secondary text-sm font-semibold px-3 py-1 rounded-full">{listing.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-textPrimary mt-4 mb-2">{listing.title}</h1>
          <p className="text-4xl font-extrabold text-primary mb-4">₹{listing.price.toLocaleString('en-IN')}</p>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
              <h3 className="font-semibold text-lg text-textPrimary mb-2">Description</h3>
              <p className="text-textSecondary leading-relaxed">{listing.description}</p>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm text-textSecondary">
                Listed by <span className="font-semibold text-textPrimary">{listing.sellerName}</span> on {listing.createdAt.toLocaleDateString()}
              </p>
          </div>

          <div className="mt-8">
            <button 
                onClick={handleContact}
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary transition-colors duration-300 flex items-center justify-center text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
