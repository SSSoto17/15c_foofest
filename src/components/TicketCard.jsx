const TicketCard = ({ type, description, price, variant }) => {
  const variants = {
    single: "bg-[url('../assets/svg/diamond.svg')] bg-[right_0.5rem_bottom_-3.5rem]",
    multiple: "bg-[url('../assets/svg/diamonds.svg')] bg-[right_-5rem_bottom_-3.5rem]",
  };

  return (
    <article className={`flow-space px-8 pt-6 pb-2 bg-aztec-900 ${variants[variant]} bg-no-repeat 	`}>
      <h2 className="heading-2 text-desk-xl">{type} ticket</h2>
      <p className="text-balance">Lorem ipsum ipsa expedita facilis eius fugiat hic nostrum dicta, suscipit ad odio. Eum?</p>
      <p className="text-right heading-2 text-desk-lg">{price} ,-</p>
    </article>
  );
};

export default TicketCard;
