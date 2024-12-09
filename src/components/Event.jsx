// eslint-disable-next-line react/prop-types
const Event = ({ title, startDateTime, location, appUser, fileUrl }) => {
  const formattedDate = new Date(startDateTime).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  
  return (
    <div className="flex flex-col gap-1">
      <img referrerPolicy="no-referrer" src={fileUrl} alt={title} className="rounded-2xl w-[300px] h-[200px] " />
      <h2 className="font-semibold">{title}</h2>
      <p>{formattedDate}</p>
      <p>Place: {location}</p>
      <p className="text-blue-700">{appUser.username}</p>
    </div>
  );
};
export default Event;