import { aboutUs } from "@/lib/data/footerData";

const AboutUs = () => {
  return (
    <div className="mx-auto w-full max-w-7xl my-8 md:my-16 px-4 sm:px-6 md:px-8 py-6 md:py-8 bg-white/10 rounded-xl ">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-black/70">
        {aboutUs.title}
      </h1>

      <h2 className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed">
        {aboutUs.description}
      </h2>
    </div>
  );
};

export default AboutUs;
