
import { User, Listing } from '../types';

// This file simulates a backend service.
// In a real application, you would replace this with actual calls to a backend like Firebase.
// For now, it uses mock data and setTimeout to mimic network delays.

// Mock data for listings.
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'Used Engineering Graphics Drafter',
    description: 'A slightly used drafter, perfect for first-year engineering students. All parts are intact and functional.',
    price: 500,
    category: 'Books & Supplies',
    imageUrl: 'https://picsum.photos/seed/drafter/600/400',
    sellerName: 'Rohan Sharma',
    sellerEmail: 'rohan@davv.ac.in',
    createdAt: new Date('2023-10-25T10:00:00Z'),
  },
  {
    id: '2',
    title: 'Data Structures and Algorithms Textbook',
    description: 'Core book for CS/IT students. Latest edition, no markings inside. In excellent condition.',
    price: 350,
    category: 'Books & Supplies',
    imageUrl: 'https://picsum.photos/seed/textbook/600/400',
    sellerName: 'Priya Verma',
    sellerEmail: 'priya@davv.ac.in',
    createdAt: new Date('2023-10-24T14:30:00Z'),
  },
  {
    id: '3',
    title: 'Scientific Calculator (Casio FX-991ES)',
    description: 'The best calculator for engineering exams. Allowed in most university exams. Works perfectly.',
    price: 800,
    category: 'Electronics',
    imageUrl: 'https://picsum.photos/seed/calculator/600/400',
    sellerName: 'Ankit Jain',
    sellerEmail: 'ankit@davv.ac.in',
    createdAt: new Date('2023-10-23T09:00:00Z'),
  },
  {
    id: '4',
    title: 'Hostel Room Cooler',
    description: 'A compact room cooler, great for surviving the Indore summer in your hostel room. Used for one season.',
    price: 1200,
    category: 'Hostel Essentials',
    imageUrl: 'https://picsum.photos/seed/cooler/600/400',
    sellerName: 'Priya Verma',
    sellerEmail: 'priya@davv.ac.in',
    createdAt: new Date('2023-10-22T18:00:00Z'),
  },
  {
    id: '5',
    title: 'Lab Coat - Medium Size',
    description: 'Clean, white lab coat. Mandatory for all chemistry and physics labs. No stains.',
    price: 200,
    category: 'Books & Supplies',
    imageUrl: 'https://picsum.photos/seed/labcoat/600/400',
    sellerName: 'Rohan Sharma',
    sellerEmail: 'rohan@davv.ac.in',
    createdAt: new Date('2023-10-21T11:45:00Z'),
  }
];

// Simulates fetching all listings from a database.
export const getListings = (): Promise<Listing[]> => {
  console.log('Fetching listings...');
  return new Promise((resolve) => {
    // Simulate a network delay of 1 second.
    setTimeout(() => {
      console.log('Listings fetched successfully.');
      // Return a sorted copy of the listings, newest first.
      resolve([...mockListings].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    }, 1000);
  });
};

// Simulates creating a new listing.
export const createListing = (
  data: Omit<Listing, 'id' | 'sellerEmail' | 'sellerName' | 'createdAt'>,
  user: User
): Promise<Listing> => {
  console.log('Creating new listing...');
  return new Promise((resolve) => {
    // Simulate a network delay of 1.5 seconds.
    setTimeout(() => {
      const newListing: Listing = {
        ...data,
        id: Math.random().toString(36).substring(2, 9), // Generate a random ID.
        sellerEmail: user.email,
        sellerName: user.name,
        createdAt: new Date(),
      };
      // Add the new listing to our mock database.
      mockListings.unshift(newListing);
      console.log('Listing created:', newListing);
      resolve(newListing);
    }, 1500);
  });
};

// Simulates logging in a user.
export const loginWithDavvEmail = (email: string, name: string): Promise<User> => {
    console.log(`Attempting to log in with email: ${email}`);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email.endsWith('@davv.ac.in')) {
                const user: User = {
                    id: Math.random().toString(36).substring(2, 9),
                    email,
                    name,
                };
                console.log('Login successful:', user);
                resolve(user);
            } else {
                console.log('Login failed: Invalid email domain.');
                reject(new Error('Please use a valid @davv.ac.in email address.'));
            }
        }, 800);
    });
};
