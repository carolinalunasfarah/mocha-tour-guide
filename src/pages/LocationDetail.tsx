import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin } from "lucide-react";

interface LocationData {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

const LocationDetail = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with your Firebase fetch logic
    // Example:
    // const fetchLocation = async () => {
    //   const docRef = doc(db, type === "mocha" ? "mochas" : "foods", id);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     setLocation({ id: docSnap.id, ...docSnap.data() });
    //   }
    //   setLoading(false);
    // };
    // fetchLocation();

    // Placeholder data
    const placeholderLocations: Record<string, LocationData> = {
      "mocha-1": {
        id: "1",
        name: "Artisan Coffee House",
        address: "123 Main Street, Downtown",
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
        description: "A cozy spot known for its expertly crafted mochas and warm atmosphere. Perfect for coffee enthusiasts.",
        coordinates: { lat: 40.7128, lng: -74.0060 }
      },
      "food-1": {
        id: "1",
        name: "The Pastry Corner",
        address: "234 Bakery Street, Old Town",
        imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
        description: "Fresh pastries and baked goods made daily. The perfect companion to your mocha experience.",
        coordinates: { lat: 40.7580, lng: -73.9855 }
      }
    };

    const key = `${type}-${id}`;
    setLocation(placeholderLocations[key] || null);
    setLoading(false);
  }, [type, id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center">Location not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-6">
              <img
                src={location.imageUrl}
                alt={location.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">{location.name}</h1>
            <div className="flex items-start gap-2 text-muted-foreground mb-6">
              <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
              <p className="text-lg">{location.address}</p>
            </div>
            <p className="text-lg text-foreground leading-relaxed">
              {location.description}
            </p>
          </div>

          <div className="bg-muted rounded-lg p-4 h-[500px] flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">Map integration placeholder</p>
              <p className="text-sm">
                Add your Mapbox API key or other mapping service
              </p>
              {location.coordinates && (
                <p className="text-xs mt-2">
                  Coordinates: {location.coordinates.lat}, {location.coordinates.lng}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetail;
