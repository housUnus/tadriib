import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Image from "next/image"

const floatingCerts = [
  {
    name: "PMP",
    image: "pmp.png",
    position: "top-[10%] left-[5%]",
    rotate: "-rotate-6",
    animation: "animate-float-slow",
    delay: "0s",
  },
  {
    name: "CPA",
    image: "cpa.png",
    position: "top-[5%] left-[25%]",
    rotate: "rotate-3",
    animation: "animate-float-medium",
    delay: "0.5s",
  },
  {
    name: "6 Sigma",
    image: "6sigma.png",
    position: "top-[8%] right-[20%]",
    rotate: "rotate-6",
    delay: "0,7s",
  },
  {
    
    name: "CMA",
    image: "cma.png",
    position: "bottom-[25%] left-[3%]",
    rotate: "-rotate-3",
    animation: "animate-float-slow",
    delay: "1s",
  },
  {
    name: "ACCA",
    image: "acca.png",
    position: "top-[15%] right-[3%]",
    rotate: "rotate-0",
    animation: "animate-float-medium",
    delay: "1.5s",
  },
  {
    name: "FMAA",
    image: "fmaa.png",
    position: "bottom-[10%] left-[20%]",
    rotate: "-rotate-3",
    animation: "animate-float-fast",
    delay: "0.3s",
  },
  {
    name: "CFM",
    image: "cfm.png",
    position: "bottom-[20%] right-[5%]",
    rotate: "rotate-3",
    animation: "animate-float-medium",
    delay: "0.8s",
  },
  {
    name: "SOCPA",
    image: "socpa.png",
    position: "bottom-[5%] right-[25%]",
    rotate: "-rotate-6",
    animation: "animate-float-slow",
    delay: "1.2s",
  },
]

export default function CtaSection() {
  const t = useTranslations("home")
  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ backgroundColor: "#635bff" }}>
      {floatingCerts.map((cert, index) => (
        <div key={index} className={`absolute ${cert.position} ${cert.rotate} scale-[0.6] sm:scale-[0.8] md:scale-100 z-0`}>
          <div className="animate-bounce" style={{ animationDuration: "3s", animationDelay: cert.delay }}>
            <Image
            src={`/images/front-pages/certifications/${cert.image}` || "/placeholder.svg"}
              alt={cert.name}
              width={80}
              height={80}
              className="opacity-40 grayscale brightness-150"
            />
          </div>
        </div>
      ))}

      {/* Center content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
         {t('advanceYourCareer')}
        </h2>
        <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          {t('joinThousandsOfProfessionals')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white bg-transparent hover:bg-white hover:text-[#635bff] px-8 py-6 text-lg rounded-lg"
          >
            {t('getStarted')}
          </Button>
          <Button size="lg" className="bg-white text-[#635bff] hover:bg-white/90 px-8 py-6 text-lg rounded-lg">
            {t('startTeaching')}
          </Button>
        </div>
      </div>
    </section>
  )
}
