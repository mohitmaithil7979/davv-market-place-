
import React, { useState, useMemo } from 'react';
import { Listing } from '../types';
import ListingCard from './ListingCard';

interface BrowsePageProps {
  listings: Listing[];
  onSelectListing: (listing: Listing) => void;
}

const BrowsePage: React.FC<BrowsePageProps> = ({ listings, onSelectListing }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = useMemo(() => {
    return ['All', ...new Set(listings.map(l => l.category))];
  }, [listings]);

  const filteredAndSortedListings = useMemo(() => {
    return listings
      .filter(listing => {
        const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              listing.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'All' || listing.category === filterCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          case 'oldest':
            return a.createdAt.getTime() - b.createdAt.getTime();
          case 'newest':
          default:
            return b.createdAt.getTime() - a.createdAt.getTime();
        }
      });
  }, [listings, searchTerm, filterCategory, sortBy]);

  return (
    <div className="animate-fade-in">
      <div className="bg-white p-4 rounded-lg shadow-md mb-8 sticky top-20 z-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="md:col-span-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none bg-white"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none bg-white"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="oldest">Sort by: Oldest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredAndSortedListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedListings.map(listing => (
            <ListingCard
              key={listing.id}
              listing={listing}
              onSelect={() => onSelectListing(listing)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold text-textPrimary">No items found</h3>
          <p className="text-textSecondary mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default BrowsePage;
