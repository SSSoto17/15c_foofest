import Image from "next/image";
import succes from "@/assets/img/succes.png";
import Button from "@/components/Button";

export default function Thanks() {
  return (
    <main>
      <article className="grid grid-cols-10 h-full">
        <Image className="row-start-1 col-start-6 col-span-full object-cover h-full" src={succes} alt="Image from Foo Fest. Photo by Roberto Rendon on Unsplash"></Image>
        <section className="flow-space row-start-1 col-start-1 col-span-7 py-20">
          <h1 className="heading-1 uppercase">Yes! You’re ready for FooFest</h1>
          <p className="body-copy">
            You have succesfully purchased tickets for FooFest 2025. <br /> We’ll send you an e-mail with the tickets shortly.{" "}
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
