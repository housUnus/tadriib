"use client";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Packages = () => {
  const Licenses = [
    {
      key: "license1",
      licenseType: "Single Use",
      licenseDesc:
        "Use for single end product which end users can't be charged for.",
      price: "$49",
      isSaasUse: false,
      feature: "One Project",
      isPopular: false,
    },
    {
      key: "license2",
      licenseType: "Multiple Use",
      licenseDesc:
        "Use for unlimited end products end users can't be charged for.",
      price: "$89",
      isSaasUse: false,
      feature: "Unlimited Project",
      isPopular: false,
    },
    {
      key: "license3",
      licenseType: "Extended Use",
      licenseDesc:
        "Use for single end product which end users can be charged for.",
      price: "$299",
      isSaasUse: true,
      feature: "One Project",
      isPopular: true,
    },
    {
      key: "license4",
      licenseType: "Unlimited Use",
      licenseDesc:
        "Use in unlimited end products end users can be charged for.",
      price: "$499",
      isSaasUse: true,
      feature: "Unlimited Project",
      isPopular: false,
    },
  ];

  return (
    <div className="dark:bg-dark py-12 lg:py-24">
      <div className="container-1218 mx-auto">
        {/* Section Header */}
        <div className="flex w-full justify-center mb-12">
          <div className="text-center max-w-2xl">
            <h2 className="sm:text-44 text-3xl font-bold text-darklink dark:text-white leading-tight">
              Fair pricing for everyone.
            </h2>
            <p className="text-base leading-8 pt-4 text-ld opacity-80">
              Our robust analytics offer rich insights into the information
              buyers want, informing where teams.
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-12 gap-6">
          {Licenses.map((item, index) => (
            <div
              key={index}
              className="xl:col-span-3 md:col-span-6 col-span-12"
            >
              <div className="p-6 rounded-tw border border-ld bg-white dark:bg-transparent shadow-sm hover:shadow-md transition-all duration-300">
                {/* License Header */}
                <div className="pb-8">
                  <h6 className="text-xl font-semibold text-ld mb-4 flex items-center gap-2">
                    {item.licenseType}
                    {item.isPopular && (
                      <Badge
                        variant="secondary"
                        className="text-xs font-bold rounded-full px-3 py-1 bg-primary/10 text-primary border-none"
                      >
                        Popular
                      </Badge>
                    )}
                  </h6>
                  <p className="text-ld opacity-90 leading-6 text-sm">
                    {item.licenseDesc}
                  </p>
                </div>

                {/* Price */}
                <div className="flex gap-2 items-end">
                  <div className="text-40 leading-tight font-bold text-primary">
                    {item.price}
                  </div>
                  <p className="text-base text-ld opacity-90 relative -top-1">
                    / one time pay
                  </p>
                </div>

                {/* Features */}
                <div className="mt-8 flex flex-col gap-3.5">
                  <Feature icon="tabler:circle-check" text="Full source code" />
                  <Feature icon="tabler:circle-check" text="Documentation" />
                  {item.isSaasUse ? (
                    <Feature
                      icon="tabler:circle-check"
                      text="Use in SaaS app"
                      iconClass="text-secondary"
                    />
                  ) : (
                    <Feature
                      icon="tabler:circle-x"
                      text="Use in SaaS app"
                      iconClass="text-error opacity-80"
                    />
                  )}
                  <Feature
                    icon=""
                    text={
                      item.feature === "One Project"
                        ? "One Project"
                        : "Unlimited Projects"
                    }
                  />
                  <Feature
                    icon=""
                    text="One Year Technical Support"
                  />
                </div>

                {/* Button */}
                <div className="mt-8">
                  <Button
                    variant="default"
                    className="w-full"
                  >
                    Purchase Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 🔹 Reusable Feature Component
const Feature = ({
  icon,
  text,
  iconClass,
}: {
  icon?: string;
  text: string;
  iconClass?: string;
}) => (
  <div className="flex items-center gap-2">
    {icon && (
      <Icon icon={icon} className={`text-xl ${iconClass || "text-secondary"}`} />
    )}
    <p className="text-15 text-ld font-medium tracking-wide">{text}</p>
  </div>
);
