import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const ExpertCard = ({ name, expertise, image, rating, sessions }) => {
  return (
    <Card className="w-full max-w-[300px] rounded-2xl shadow-lg border border-gray-200">
      <CardContent className="p-5 flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
          <img src={image} alt={name} width={96} height={96} className="object-cover w-full h-full" />
        </div>

        {/* Name & Expertise */}
        <h3 className="mt-3 text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{expertise}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i + 0.5 < rating ? "fill-amber-500 text-amber-500" : "fill-gray-300 text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">({rating.toFixed(1)})</span>
        </div>

        {/* Sessions Count */}
        <p className="mt-2 text-xs text-gray-500">{sessions} sessions conducted</p>
      </CardContent>

      {/* View Profile Button */}
      <CardFooter className="p-5">
        <Button className="w-full">View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default ExpertCard;
