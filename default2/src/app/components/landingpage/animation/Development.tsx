import Image from "next/image";

const Development = () => {
  return (
    <>
      <div className="bg-lightgray dark:bg-darkgray md:py-20 py-12">
        <div className="container">
          <div
            className="lg:w-3/5 w-full mx-auto"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <h2 className="text-center sm:text-4xl text-2xl mt-8 font-bold sm:leading-[45px]!">
              Increase speed of your development and launch quickly with MatDash
            </h2>
          </div>
        </div>

        <div className="flex flex-row w-full position-relative overflow-hidden pt-8">
          <div className="slider-group">
            <Image src={"/images/landingpage/background/slider-group.png"} alt="matdash" className="max-w-max" width={3643} height={901}/>
          </div>
          <div className="slider-group">
            <Image src={"/images/landingpage/background/slider-group.png"} alt="matdash" className="max-w-max" width={3643} height={901}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Development;
