
import React, { useState } from 'react';
import { Listing } from '../types';
import Spinner from './Spinner';

interface CreateListingPageProps {
  onSubmit: (data: Omit<Listing, 'id' | 'sellerEmail' | 'sellerName' | 'createdAt'>) => Promise<void>;
}

const CreateListingPage: React.FC<CreateListingPageProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (!title || !description || !price || !category) {
      alert("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    const listingData = {
      title,
      description,
      price: parseFloat(price),
      category,
      imageUrl: `https://picsum.photos/seed/${title.replace(/\s/g, '')}/600/400`, // Using a placeholder image service
    };

    await onSubmit(listingData);
    // The App component will handle navigation after submission is complete.
    // We don't need to reset state here as the component will unmount.
  };

  const categories = ['Books & Supplies', 'Electronics', 'Hostel Essentials', 'Fashion', 'Other'];

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-primary mb-6">Create a New Listing</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-textSecondary font-semibold mb-2">Listing Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Used Scientific Calculator"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-textSecondary font-semibold mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            placeholder="Describe the item's condition, features, etc."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
                <label htmlFor="price" className="block text-textSecondary font-semibold mb-2">Price (₹)</label>
                <input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="e.g., 500"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-textSecondary font-semibold mb-2">Category</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:outline-none bg-white"
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
        </div>
        <div className="mb-6">
            <label className="block text-textSecondary font-semibold mb-2">Image Upload</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-textSecondary">Image upload is not implemented in this demo.</p>
                <p className="text-sm text-gray-500">A placeholder image will be generated based on your title.</p>
            </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-secondary transition-colors duration-300 disabled:bg-gray-400 flex items-center justify-center"
        >
          {isLoading ? <Spinner size="sm" /> : 'Create Listing'}
        </button>
      </form>
    </div>
  );
};

export default CreateListingPage;
