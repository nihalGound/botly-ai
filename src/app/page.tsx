import NavBar from "@/components/navbar";
import FeatureShowcase from "@/components/table/feature-showcase";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { pricingCards } from "@/constants/pricing";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-black bg-grid-white/[0.2] relative">
      <NavBar />
      <section>
        <div className="flex flex-col overflow-hidden">
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="bg-gradient-to-t from-[#FFBA68] to-[#FF5D00] text-transparent bg-clip-text text-7xl md:text-9xl text-center font-bold mb-20">Botly AI</h1>
                <h1 className="text-4xl font-semibold text-white mb-10">
                AI Chatbots and Marketing Automation - The Future of Sales
                </h1>
              </>
            }
          >
            <Image
              src={"/images/ui.png"}
              alt="hero"
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-cover h-full object-left-top"
              draggable={false}
            />
          </ContainerScroll>
        </div>
      </section>
      <section className="border-t border-zinc-100 mt-10 flex flex-col">
          <div id="features">
            <FeatureShowcase />
          </div>
              
        <div className="flex flex-col gap-2 items-center w-11/12 mt-2">
          <h2 className="text-black text-lg font-semibold text-center dark:text-white">
            Choose what fits you right
          </h2>
          <p className="text-black font-normal text-sm text-center w-11/12 dark:text-white">
            Our straightforward pricing plans are tailored to meet your needs. If you&apos;re not ready to commit you can get started for free.
          </p>
        </div>
        <div className=" w-full px-5 flex justify-center mt-7 gap-x-3 shadow-lg max-md:flex-wrap max-md:gap-x-0 max-md:gap-y-3" id="pricing">
            {pricingCards.map((card)=>(
              <CardSpotlight key={card.title}  className="text-white flex flex-col gap-y-2 max-md:min-w-full">
                <div className="relative z-20">
                    <h2 className="text-2xl font-bold">{card.title}</h2>
                    <p>{card.description}</p>
                </div>
                <div className="relative">
                  <span>{card.price}</span>
                  <span className="text-muted-foreground">
                  <span>/month</span>
                </span>
                </div>
                <div className="flex flex-col items-start gap-y-2 relative">
                  <div>
                    {card.features.map((feature) => (
                      <div key={feature}
                      className="flex gap-2"
                      >
                        <Check/>
                        <p className="font-semibold text-sm">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={"/sign-up"}
                  className="rounded-md bg-[#ff5e00e9] font-bold text-lg text-center p-2 border-gray-700 border-2">
                    Get Started
                  </Link>
                </div>
              </CardSpotlight>
            ))}
        </div>
      </section>
    </main>
  );
}
