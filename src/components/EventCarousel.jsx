import { useState } from "react";
import Event from "./Event";

const eventList = [
  {
    name: "Tech Conference 2024",
    date: "2024-05-15",
    place: "New York",
    owner: "John Doe",
    imgSrc: "https://via.placeholder.com/300x200?text=Tech+Conference+2024",
    description:
      "ferferferfrefberhjfbhjer nfrjeh fbnhjef bnehrjf bhje bnfjhfnhjwbfh jrebfh jkberhjk frbwhj ek",
  },
  {
    name: "Startup Pitch Night",
    date: "2024-06-10",
    place: "San Francisco",
    owner: "Jane Smith",
    imgSrc: "https://via.placeholder.com/300x200?text=Startup+Pitch+Night",
  },
  {
    name: "Art Expo",
    date: "2024-07-20",
    place: "Los Angeles",
    owner: "Alex Johnson",
    imgSrc: "https://via.placeholder.com/300x200?text=Art+Expo",
  },
  {
    name: "Music Festival",
    date: "2024-08-05",
    place: "Chicago",
    owner: "Emily Davis",
    imgSrc: "https://via.placeholder.com/300x200?text=Music+Festival",
  },
  {
    name: "Health & Wellness Fair",
    date: "2024-09-10",
    place: "Miami",
    owner: "Chris Lee",
    imgSrc: "https://via.placeholder.com/300x200?text=Wellness+Fair",
  },
  {
    name: "Food & Wine Fest",
    date: "2024-10-10",
    place: "Napa Valley",
    owner: "Olivia Green",
    imgSrc: "https://via.placeholder.com/300x200?text=Food+%26+Wine+Fest",
  },
];

// eslint-disable-next-line react/prop-types
const EventsCarousel = ({ events, handleOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(eventList.length / itemsPerSlide);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : totalSlides - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < totalSlides - 1 ? prevIndex + 1 : 0
    );
  };

  // Generate slides with 4 events each
  const slides = [];
  for (let i = 0; i < events.length; i += itemsPerSlide) {
    slides.push(events.slice(i, i + itemsPerSlide));
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex min-w-full justify-around px-2"
            onClick={handleOpen}
          >
            {slide.map((event, eventIndex) => (
              <div
                key={eventIndex}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent bubbling up
                  handleOpen(event);
                }}
              >
                <Event {...event} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white rounded-full px-2"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white rounded-full px-2"
        onClick={handleNext}
      >
        &#10095;
      </button>

      <div className="absolute bottom-[0px] left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default EventsCarousel;
