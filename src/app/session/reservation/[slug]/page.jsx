import Image from "next/image";
import ordersession from "../../../../data/ordersession.json";

export default async function Thanks({ params }) {
  const { slug, heading, text, label, btn, img } = await params;

  return (
    <main>
      <article className="grid grid-cols-10 h-full">
        <Image className="row-start-1 col-start-6 col-span-full object-cover h-full" src={`@/assets/img/${img}`} alt="Image from Foo Fest. Photo by Roberto Rendon on Unsplash"></Image>
        <section className="flow-space row-start-1 col-start-1 col-span-7 py-20">
          <h1 className="heading-1 uppercase">{heading}</h1>
          <p className="body-copy">{text}</p>
          <p className="body-copy">{label}</p>
          <div className="bg-forest-600 p-4 inline-block">{btn}</div>
        </section>
      </article>
    </main>
  );
}
