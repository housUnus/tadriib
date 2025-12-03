import { ArrowRight, Calendar, Clock, MessageCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ExpertCard = ({ item }) => {
  const expert = item;
  return (
    <Card
      key={expert.id}
      className="relative group bg-white/80 border-0 shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-2"
    >
      <CardContent className="p-4">
        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <Badge
            className={`${
              expert.available
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full mr-2 ${
                expert.available ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {expert.available ? "Available" : "Busy"}
          </Badge>
        </div>

        {/* Expert Info */}
        <div className="text-center mb-6">
          <Avatar className="w-20 h-20 mx-auto mb-4 ring-4 ring-purple-100">
            <AvatarImage
              src={expert.avatar || "/placeholder.svg"}
              alt={expert.name}
            />
            <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg">
              {expert.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h4 className="text-xl font-bold text-gray-900 mb-1">
            {expert.name}
          </h4>
          <p className="text-purple-600 font-medium mb-1">{expert.title}</p>
          <p className="text-sm text-gray-500">{expert.company}</p>
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{expert.rating}</span>
            <span className="text-sm text-gray-500">({expert.reviews})</span>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">
              ${expert.rate}/min
            </div>
          </div>
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">
            Responds {expert.responseTime}
          </span>
        </div>

        {/* Specialties */}
        <div className="flex flex-wrap justify-center gap-1 mb-6">
          {expert.specialties.slice(0, 3).map((specialty, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {specialty}
            </Badge>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          className={`w-full ${
            expert.available
              ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              : "bg-gray-100 text-gray-500 cursor-not-allowed"
          } border-0 group/btn`}
          disabled={!expert.available}
        >
          {expert.available ? (
            <>
              <MessageCircle className="w-4 h-4 mr-2" />
              Request Call
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Later
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ExpertCard;
