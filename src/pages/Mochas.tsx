import { useState, useEffect } from "react";
import LocationCard from "@/components/LocationCard";

// Type definition for Mocha data from Firebase
interface MochaLocation {
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

const Mochas = () => {
  const [mochas, setMochas] = useState<MochaLocation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your Firebase fetch logic
    // Example:
    // const fetchMochas = async () => {
    //   const snapshot = await getDocs(collection(db, "mochas"));
    //   const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    //   setMochas(data);
    //   setLoading(false);
    // };
    // fetchMochas();

    // Placeholder data - remove when connecting to Firebase
    const placeholderData: MochaLocation[] = [
      {
        id: "1",
        name: "Artisan Coffee House",
        address: "123 Main Street, Downtown",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      },
      {
        id: "2",
        name: "Brew & Beans",
        address: "456 Oak Avenue, City Center",
        imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
      },
      {
        id: "3",
        name: "The Mocha Lab",
        address: "789 Coffee Lane, Arts District",
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
      },
    ];
    
    setMochas(placeholderData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading mochas...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Mocha Locations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mochas.map((mocha) => (
            <LocationCard
              key={mocha.id}
              id={mocha.id}
              name={mocha.name}
              address={mocha.address}
              imageUrl={mocha.imageUrl}
              type="mocha"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mochas;
