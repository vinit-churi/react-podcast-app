// navbar, heroSection, testimonialSection, preview podcast section, create podcast section, example podcast section, faq ,footer
import NavBar from "@components/NavBar";
import HeroSection from "@components/HeroSection";
import OtherPlatforms from "@components/OtherPlatforms";
import PodcastStaticPreview from "@components/PodcastStaticPreview";
const LandingPage = () => {
  return (
    <div className="">
      <NavBar />
      <HeroSection />
      <OtherPlatforms />
      <PodcastStaticPreview />
    </div>
  );
};

export default LandingPage;
