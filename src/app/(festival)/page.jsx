import TicketCard from "@/components/TicketCard";

export default function Home() {
  return (
    <main>
      <section className="grid grid-cols-2 gap-6">
        <TicketCard type="Partout" price="799" variant="single"></TicketCard>
        <TicketCard type="VIP" price="1299" variant="multiple"></TicketCard>
      </section>
    </main>
  );
}
