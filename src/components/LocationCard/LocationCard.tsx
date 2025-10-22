import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { LocationCardProps } from "./types";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const LocationCard = ({
  id,
  name,
  address,
  imgUrl,
  domain = "mochas",
}: LocationCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/${domain}/${id}`}>
      <Card className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:bg-card-hover">
        <div className="aspect-[4/3] overflow-hidden">
          {!isLoaded && <Skeleton className="absolute inset-0 w-full h-full" />}
          <img
            src={imgUrl}
            alt={name}
            width={400}
            height={300}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            loading="lazy"
            decoding="async"
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

export { LocationCard };
