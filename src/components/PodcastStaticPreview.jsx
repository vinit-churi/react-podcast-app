import previewOne from "../assets/images/static-episode-preview-01.webp";
import previewTwo from "../assets/images/static-episode-preview-02.jpg";
import previewThree from "../assets/images/static-episode-preview-03.webp";
import previewFour from "../assets/images/static-episode-preview-04.jpg";
import { useState } from "react";

const staticCards = [
  {
    topic: ["Health", "Development", "Marketing"],
    episode: "Episode 1",
    title: "How to design a website",
    time: "30 min",
    id: "123",
    img: previewOne,
  },
  {
    topic: ["Design", "Development", "Health"],
    episode: "Episode 22",
    title: "Is Newton a hacker?",
    time: "30 min",
    id: "456",
    img: previewTwo,
  },
  {
    topic: ["Design", "Development", "Marketing"],
    episode: "Episode 1",
    title: "How to design a website",
    time: "30 min",
    id: "769",
    img: previewThree,
  },
  {
    topic: ["Health", "Marketing", "Design"],
    episode: "Episode 12",
    title: "How important is sleep?",
    time: "30 min",
    id: "10112",
    img: previewFour,
  },
];
const PodcastStaticPreview = () => {
  const [currentOption, setCurrentOption] = useState("All");
  const [cardsData, setCardsData] = useState(staticCards);
  function handleOptionChange(option) {
    setCurrentOption(option);
    if (option === "All") {
      setCardsData(staticCards);
      return;
    }
    setCardsData(
      staticCards.filter(
        (data) => option === "All" || data.topic.includes(option)
      )
    );
  }

  return (
    <div className="min-h-[100px] bg-primaryLight pt-20 pb-16">
      <h2 className="text-center font-primary text-4xl text-secondary tracking-wider">
        Listen the best Podcasts on the internet
      </h2>
      <div className="flex mx-auto justify-center font-primary text-xl my-10">
        <button
          onClick={() => handleOptionChange("All")}
          className={`mx-4 px-3 py-2 ${
            currentOption === "All" && "bg-secondary rounded-md text-greenTint"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleOptionChange("Design")}
          className={`mx-4 px-3 py-2 ${
            currentOption === "Design" &&
            "bg-secondary rounded-md text-greenTint"
          }`}
        >
          Design
        </button>
        <button
          onClick={() => handleOptionChange("Development")}
          className={`mx-4 px-3 py-2 ${
            currentOption === "Development" &&
            "bg-secondary rounded-md text-greenTint"
          }`}
        >
          Development
        </button>
        <button
          onClick={() => handleOptionChange("Marketing")}
          className={`mx-4 px-3 py-2 ${
            currentOption === "Marketing" &&
            "bg-secondary rounded-md text-greenTint"
          }`}
        >
          Marketing
        </button>
        <button
          onClick={() => handleOptionChange("Health")}
          className={`mx-4 px-3 py-2 ${
            currentOption === "Health" &&
            "bg-secondary rounded-md text-greenTint"
          }`}
        >
          Health
        </button>
      </div>
      <div className="flex w-[90%] mx-auto justify-evenly">
        {cardsData.map((card) => (
          <div key={card.id} className="p-3 rounded-xl bg-white w-[300px]">
            <div className="flex justify-between">
              <p className="font-primary text-green-600 text-base">
                {card.episode}
              </p>
              <p className="font-primary text-green-600 text-base">
                {card.time}
              </p>
            </div>
            <p className="font-primary text-secondary  my-1 text-xl">
              {card.title}
            </p>
            <img
              src={card.img}
              alt="preview"
              className="w-full h-[200px] object-cover object-center rounded-xl"
            />
          </div>
        ))}
      </div>
      <button className="block mx-auto mt-12 px-4 py-2 text-xl font-primary text-greenTint bg-secondary rounded-md">
        Explore more
      </button>
    </div>
  );
};

export default PodcastStaticPreview;
