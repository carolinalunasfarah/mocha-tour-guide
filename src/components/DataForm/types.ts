type FormData = {
  // Checkboxes
  createMocha: boolean;
  createFood: boolean;
  createVisited: boolean;
  // Common fields
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  // Simple fields when only one is marked
  description: string;
  imgUrl: string;
  rating: number;
  // Specific fields for mocha when both are marked
  mochaDescription: string;
  mochaImgUrl: string;
  mochaRating: number;
  // Specific fields for food when both are marked
  foodDescription: string;
  foodImgUrl: string;
  foodRating: number;
  // Fields for visited
  nameLowercase: string;
};

export type { FormData };
