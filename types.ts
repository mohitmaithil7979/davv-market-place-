
// Represents a user in the application.
export interface User {
  id: string;
  name: string;
  email: string;
}

// Represents a single item listed for sale in the marketplace.
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  sellerName: string;
  sellerEmail: string;
  createdAt: Date;
}

// Defines the possible "pages" or views the user can be on.
// This is used for client-side navigation without a router.
export type View = 'browse' | 'detail' | 'create' | 'dashboard' | 'login';
