export type PropertyType =
  | 'Apartment'
  | 'Flat'
  | 'House'
  | 'Commercial'
  | 'Factory'
  | 'Office'
  | 'Shop'
  | 'Building'
  | 'Plot';

export type PropertyPurpose = 'sale' | 'rent';

export type FurnishingStatus = 'Furnished' | 'Unfurnished' | 'Semi-Furnished' | 'N/A';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  purpose: PropertyPurpose;
  price: string;
  numericPrice: number; // in PKR for filter sorting
  pricePeriod?: string; // e.g. "/ month" for rentals
  priceNote?: string; // e.g. "Price slightly negotiable"
  location: string;
  areaLocation: 'Johar Town' | 'Canal Road' | 'Etihad Town' | 'Thokar Niaz Baig' | 'Other Lahore Locations';
  areaSize: string; // e.g. "1,250 sq. ft." or "5 Kanal"
  bedrooms?: number;
  bathrooms?: number;
  furnishing: FurnishingStatus;
  status: 'AVAILABLE' | 'ARCHIVED / VERIFY AVAILABILITY';
  featured?: boolean;
  categoryTag?: string; // e.g. "1BHK Luxury", "2 Bed Executive", "5 Kanal Industrial"
  images: string[];
  description: string;
  highlights: string[];
  specifications: Record<string, string>;
  projectReference?: string; // e.g. "Moon Heights", "The Springs Apartments Homes", "Aman Plaza", "Victoria Livings", "Zam Zam Mall"
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'APARTMENTS' | 'FLATS' | 'COMMERCIAL' | 'INTERIORS' | 'PROJECTS' | 'LAHORE';
  image: string;
  location: string;
  caption?: string;
  aspectRatio?: 'tall' | 'wide' | 'square';
}

export interface EnquirySubmission {
  name: string;
  phone: string;
  email: string;
  propertyRequirement: string;
  preferredLocation: string;
  message: string;
  propertyName?: string;
}

export type ActivePage =
  | 'home'
  | 'properties'
  | 'apartments'
  | 'commercial'
  | 'rentals'
  | 'about'
  | 'contact';
