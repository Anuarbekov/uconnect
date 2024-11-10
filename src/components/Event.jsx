// eslint-disable-next-line react/prop-types
const Event = ({ name, date, place, owner, imgSrc }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="flex flex-col gap-1">
      <img src={imgSrc} alt={name} className="rounded-2xl" />
      <h2 className="font-semibold">{name}</h2>
      <p>{formattedDate}</p>
      <p>Place: {place}</p>
      <p className="text-blue-700">{owner}</p>
    </div>
  );
};
export default Event;