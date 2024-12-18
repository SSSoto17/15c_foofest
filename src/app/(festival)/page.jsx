import TicketCard from "@/components/TicketCard";
import Image from "next/image";
import hero from "@/assets/img/hero.png";
export default function Home() {
  return (
    <main className="full-bleed">
      <section className="grid grid-cols-subgrid col-start-1 col-span-full mb-12">
        <article className="full-bleed row-start-1 row-span-4">
          <Image className="col-start-1 col-span-full row-start-1" src={hero} alt="Image of FooFest participants. Photo by Roberto Rendon on Unsplash."></Image>
          <div className="col-start-2 row-start-1 self-center flow-space grid grid-cols-3">
            <h1 className="heading-title text-balance col-span-full">Claim your ticket for FooFest</h1>
            {/* <p className="text-balance text-desk-lg col-start-1 col-span-2">Enjoy the greatest rock music of all time and let your inner viking loose!</p> */}
          </div>
        </article>
        <footer className="col-start-2 row-start-4 row-span-2 grid grid-cols-3 gap-6">
          <div className="col-start-2 col-span-full grid grid-cols-subgrid">
            <TicketCard type="Partout" price="799" variant="single"></TicketCard>
            <TicketCard type="VIP" price="1299" variant="multiple"></TicketCard>
          </div>
        </footer>
      </section>
    </main>
  );
}
