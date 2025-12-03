"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const companyLogos1 = [
  { name: "Google", logo: "/images/companies/matis logo.png" },
  { name: "Microsoft", logo: "/images/companies/azura logo.jpg" },
  { name: "Apple", logo: "/images/companies/matis logo.png" },
  { name: "Amazon", logo: "/images/companies/matis logo.png" },
  { name: "Meta", logo: "/images/companies/matis logo.png" },
  { name: "Slack", logo: "/images/companies/azura logo.jpg" },
];

const companyLogos2 = [
  { name: "Netflix", logo: "/images/companies/matis logo.png" },
  { name: "Tesla", logo: "/images/companies/matis logo.png" },
  { name: "Spotify", logo: "/images/companies/matis logo.png" },
  { name: "Uber", logo: "/images/companies/azura logo.jpg" },
  { name: "Airbnb", logo: "/images/companies/azura logo.jpg" },
  { name: "Stripe", logo: "/images/companies/azura logo.jpg" },
];

const LogosLine = ({ logos, direction, duration }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Marquee */}
      <motion.div
        className="relative w-fit flex"
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: duration, ease: "linear", repeat: Infinity }}
      >
        <List logos={[...logos, ...logos]} />
        <div className="absolute left-full top-0">
          <List logos={logos} />
        </div>
      </motion.div>
      {/* Gradient fade overlays */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

export default function CompaniesLogos() {
  return (
    <div className="py-10 bg-gradient-to-b from-white to-gray-100">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Partnered with
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {" "}
            World-Class Institutions
          </span>
        </h3>
        <p className="text-gray-600">
          Leading universities and companies trust our platform for their
          learning needs
        </p>
      </div>
      <LogosLine logos={companyLogos1} duration={40} />
      <LogosLine logos={companyLogos2} duration={30} />
    </div>
  );
}

function List({ logos }) {
  return (
    <div className="flex gap- whitespace-nowrap">
      {logos.map((company, index) => (
        <div
          key={index}
          className="flex h-auto w-32 flex-shrink-0 flex-col items-center px-8 py-2"
        >
            <div className="h-26 w-28">
              <Image
                src={company.logo || "/placeholder.svg"}
                alt={`logo`}
                width={150}
                height={80}
                className="max-h-full object-contain filter grayscale opacity-60 hover:opacity-80 transition-opacity duration-300"
              />
            </div>
        </div>
      ))}
    </div>
  );
}
