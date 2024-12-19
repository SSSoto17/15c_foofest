import Image from "next/image";
import timelimit from "@/assets/img/timelimit.png";
import Button from "@/components/Button";

export default function Thanks() {
  return (
    <main>
      <article className="grid grid-cols-4 sm:grid-cols-10 sm:h-full sm:grid-rows-1">
        <Image className="col-start-2 col-span-full row-start-1 sm:col-start-6 sm:object-cover sm:h-full" src={timelimit} alt="Image of a forest. Photo by Sebastian Unrau on Unsplash" placeholder="blur"></Image>
        <section className="flow-space row-start-1 row-span-4 col-start-1 col-span-3 grid grid-rows-subgrid  sm:block  sm:row-start-1 sm:col-start-1 sm:col-span-7 pt-20">
          <h1 className="heading-1 uppercase self-end">Time limit exceeded...</h1>
          <p className="body-copy row-start-2">The time limit makes it fair to all our customers searching for tickets. </p>
          <p className="body-copy">You’re welcome to try again!</p>
          <Button variant="primary" size="base">
            Try again
          </Button>
        </section>
      </article>
    </main>
  );
}
