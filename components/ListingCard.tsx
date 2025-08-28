
import React from 'react';
import { Listing } from '../types';

interface ListingCardProps {
  listing: Listing;
  onSelect: () => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform duration-300 group"
    >
      <div className="relative">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-accent text-primary text-xs font-bold px-2 py-1 rounded">
          {listing.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-textPrimary truncate group-hover:text-secondary transition-colors duration-200">
          {listing.title}
        </h3>
        <p className="text-2xl font-bold text-primary mt-2">
          ₹{listing.price.toLocaleString('en-IN')}
        </p>
        <p className="text-sm text-textSecondary mt-2">
            Sold by {listing.sellerName}
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
