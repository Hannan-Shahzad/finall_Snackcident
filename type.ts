//type.ts


export type FastFoodItem = {
  id: string;
  name: string;
  price: string;
  originalPrice:string
  image: string; // Image is a string URL
  category: string;
  description: string; // Added description field
  nutritionalInfo: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  }; // Added nutritionalInfo object
  reviews: {
    user: string;
    rating: number;
    comment: string;
  }[]; // Array of reviews
  quantity?: number; // Optional quantity field
};
