import Image from "next/image";

const companies = [
  {
    img: "/images/front-pages/componies/intel.svg",
  },
  {
    img: "/images/front-pages/componies/oracle.svg",
  },
  {
    img: "/images/front-pages/componies/dell.svg",
  },
  {
    img: "/images/front-pages/componies/samsung.svg",
  },
  {
    img: "/images/front-pages/componies/infosys.svg",
  },
  {
    img: "/images/front-pages/componies/capgemini.svg",
  },
];
const Companies = () => {
  return (
    <>
      <div className="dark:bg-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:py-14 py-7">
            <div className="mb-3 sm:mb-4">
              <h2 className="text-3xl md:text-4xl font-bold text-darklink dark:text-white mb-2 sm:mb-3">
                Trusted By
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Proudly partnering with trusted accredited institutions, we bring you the seal of expert & high quality knowledge.
              </p>
            </div>
            <div className="flex flex-wrap md:justify-between justify-center items-center gap-4 py-5">
              {companies.map((item, index) => (
                <div key={index} className="h-9 w-fit flex flex-col items-center justify-center">
                  <Image src={item.img} alt="company" width={140} height={20} className="h-fit w-fit" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Companies;
