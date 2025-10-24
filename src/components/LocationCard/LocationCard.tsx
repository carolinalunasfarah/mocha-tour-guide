import { Link } from "react-router-dom";

import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";
import { StarRating } from "@/components/StarRating";

import { LocationCardProps } from "./types";

const LocationCard = ({
  id,
  name,
  address,
  imgUrl,
  domain = "mochas",
  rating,
}: LocationCardProps) => {
  return (
    <Link to={`/${domain}/${id}`}>
      <Card className="group overflow-hidden cursor-pointer transition-all duration-300 border-none">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img
            src={imgUrl}
            alt={name}
            width={400}
            height={300}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 transition-opacity duration-300 ${"opacity-100"}`}
            loading="lazy"
            decoding="async"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-accent transition-colors">
            {name}
          </h3>
          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-foreground" />
            <p className="text-foreground">{address}</p>
          </div>
          <div className="flex justify-end gap-2 text-sm text-muted-foreground">
            <StarRating rating={rating} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export { LocationCard };
