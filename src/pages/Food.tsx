import { useState, useEffect } from "react";
import LocationCard from "@/components/LocationCard";

// Type definition for Food data from Firebase
interface FoodLocation {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  description?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const Food = () => {
  const [foods, setFoods] = useState<FoodLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your Firebase fetch logic
    // Example:
    // const fetchFoods = async () => {
    //   const snapshot = await getDocs(collection(db, "foods"));
    //   const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setFoods(data);
    //   setLoading(false);
    // };
    // fetchFoods();

    // Placeholder data - remove when connecting to Firebase
    const placeholderData: FoodLocation[] = [
      {
        id: "1",
        name: "The Pastry Corner",
        address: "234 Bakery Street, Old Town",
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
      },
      {
        id: "2",
        name: "Fresh Bites Café",
        address: "567 Garden Road, West End",
        imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800&q=80",
      },
      {
        id: "3",
        name: "Sweet Treats Bakery",
        address: "890 Dessert Avenue, Market Square",
        imageUrl: "https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=800&q=80",
      },
    ];
    
    setFoods(placeholderData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading food locations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Food Locations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => (
            <LocationCard
              key={food.id}
              id={food.id}
              name={food.name}
              address={food.address}
              imageUrl={food.imageUrl}
              type="food"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Food;
