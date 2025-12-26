import { Button } from "@/components/ui/button";
import CardBox from "../../shared/CardBox";
import Link from "next/link";

const Ticket = () => {
  return (
    <>
      <div className="bg-white dark:bg-dark">
        <div className="container">
          <div
            className="lg:w-2/4 w-full mx-auto"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-duration="1000"
          >
            <CardBox className="bg-no-repeat bg-center bg-[url('/images/landingpage/shape/line-bg.svg')]">
              <div className="pb-4 text-center">
                <h3 className="text-2xl">
                  Haven't found an answer to your question?
                </h3>
                <p className="text-ld mt-2">
                  Connect with us either on discord or email us
                </p>
                <div className="sm:flex justify-center gap-4 mt-8">
                  <Button
                    asChild
                    size={"lg"}
                    className="mb-3 sm:mb-0 px-4"
                  >
                    <Link href="https://discord.com/invite/XujgB8ww4n" target="_blank">Ask on Discord</Link>
                  </Button>
                  <Button
                    asChild
                    size={"lg"}
                    variant={"outlinesecondary"}
                    className="px-4"
                  >
                    <Link href="https://adminmart.com/support" target="_blank">Submit Ticket</Link>
                  </Button>
                </div>
              </div>
            </CardBox>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ticket;
