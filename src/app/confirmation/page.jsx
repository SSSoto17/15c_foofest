import Image from "next/image";
import succes from "@/assets/img/succes.png";
import Button from "@/components/Button";

export default function Thanks() {
  return (
    <main>
      <article className="grid grid-cols-4 sm:grid-cols-10 sm:h-full sm:grid-rows-1">
        <Image
          className="w-full col-start-2 col-span-full row-start-1 sm:col-start-6 sm:object-cover sm:h-full"
          src={succes}
          alt="Image from Foo Fest. Photo by Roberto Rendon on Unsplash"
          placeholder="blur"
        ></Image>
        <section className="flow-space row-start-1 row-span-4 col-start-1 col-span-3 grid grid-rows-subgrid  sm:block  sm:row-start-1 sm:col-start-1 sm:col-span-7 pt-20">
          <h1 className="heading-1 uppercase self-end">
            Yes! You’re ready for FooFest
          </h1>
          <p className="body-copy row-start-2">
            You have succesfully purchased tickets for FooFest 2025. <br />{" "}
            We’ll send you an e-mail with the tickets shortly.{" "}
          </p>
          <p className="body-copy">Meanwhile check out the schedule!</p>
          <Button variant="primary" size="base">
            Lineup 2025
          </Button>
        </section>
      </article>
    </main>
  );
}
