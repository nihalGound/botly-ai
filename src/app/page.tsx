import NavBar from "@/components/navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingCards } from "@/constants/pricing";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <NavBar />
      <section>
        <div className="flex items-center justify-center flex-col mt-[80px] gap-4 ">
          <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm">
            An AI powered sales assistant chatbot
          </span>

          <Image
            src="/images/corinna-ai-logo.png"
            width={500}
            height={100}
            alt="Logo"
            className="max-w-lg object-contain max-md:w-[250px]"
          />

          <p className="text-black font-normal text-sm text-center w-11/12 dark:text-white">
            Your AI powered sales assistant! Embed Corinna AI into any website with just a snippet of code!
          </p>

          <Link href="/dashboard" className="bg-orange text-white  text-sm font-semibold px-4 py-2 my-auto text-center rounded-md tracking-normal max-md:text-sm">
            Get Started For Free
          </Link>
          <Image
            src="/images/iphonecorinna.png"
            alt="bot-ui"
            width={400}
            height={100}
            className="max-w-lg object-contain max-md:w-[200px]"
          />
        </div>
      </section>
      <section className="border-t border-zinc-100 mt-10 flex flex-col">
        <div className="flex flex-col gap-2 items-center w-11/12">
          <h2 className="text-black text-lg font-semibold text-center dark:text-white">
            Choose what fits you right
          </h2>
          <p className="text-black font-normal text-sm text-center w-11/12 dark:text-white">
            Our straightforward pricing plans are tailored to meet your needs. If you're not ready to commit you can get started for free.
          </p>
        </div>

        <div className="flex justify-center mt-7 gap-x-3 shadow-lg max-md:flex-wrap max-md:gap-x-0 max-md:gap-y-3">
            {pricingCards.map((card)=>(
              <Card
              key={card.title}
              className={clsx("w-[300px] flex flex-col justify-between",{
                "border-2 border-primary": card.title === "Ultimate",
              })}
              >
                <CardHeader>
                  <CardTitle className="text-orange">{card.title}</CardTitle>
                  <CardDescription>
                    {/* {pricingCards.find((c)=>c.title === card.title)?.description} */}
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-4xl font-bold">{card.price}</span>
                  <span className="text-muted-foreground">
                    <span>/ month</span>
                  </span>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-y-2">
                  <div>
                    {card.features.map((feature)=>(
                      <div
                      key={feature}
                      className="flex gap-2">
                        <Check />
                        <p className="text-black font-semibold text-sm">{feature}</p>
                      </div>
                    ))

                    }
                  </div>
                  <Link href={`/dashboard?plan=${card.title}`}
                  className="rounded-md bg-[#f3d299] text-white font-bold text-lg text-center p-2 border-orange border-2 "
                  >
                    Get Started
                  </Link>
                </CardFooter>
              </Card>
            ))

            }
        </div>
      </section>
    </main>
  );
}