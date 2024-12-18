import Image from "next/image";
import succes from "@/assets/img/timelimit.png";
import Button from "@/components/Button";

export default function Thanks() {
  return (
    <main>
      <article className="grid grid-cols-10 h-full">
        <Image className="row-start-1 col-start-6 col-span-full object-cover h-full" src={succes} alt="Image from Foo Fest. Photo by Roberto Rendon on Unsplash"></Image>
        <section className="flow-space row-start-1 col-start-1 col-span-7 py-20">
          <h1 className="heading-1 uppercase">Time limit exceeded...</h1>
          <p className="body-copy">The time limit makes it fair to all our customers searching for tickets.</p>
          <p className="body-copy">You’re welcome to try again!</p>
          <Button variant="primary" size="base">
            Try again
          </Button>
        </section>
      </article>
    </main>
  );
}
