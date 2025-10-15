import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface LocationCardProps {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  type: "mocha" | "food";
}

const LocationCard = ({ id, name, address, imageUrl, type }: LocationCardProps) => {
  return (
    <Link to={`/${type}/${id}`}>
      <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card-hover">
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-accent transition-colors">
            {name}
          </h3>
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>{address}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LocationCard;
