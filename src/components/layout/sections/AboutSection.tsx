import meImage from '../../../assets/images/me.jpg';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary flex items-center gap-3">
          <span>/</span>
          <span>about me</span>
          <span className="flex-1 h-px bg-neutral"></span>
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Text Content */}
          <div className="space-y-4 text-secondary leading-relaxed text-sm md:text-base">
            <p>
              I am currently studying Computer Science at ITM Colombia for 3
              years and there are other 2 years waiting for me to graduate D:
            </p>
            <p className="mb-2">Some technologies i have been working with:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">▸</span>
                <span>React.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">▸</span>
                <span>Vue.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">▸</span>
                <span>Typescript</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">▸</span>
                <span>Javascript</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">▸</span>
                <span>Node.js</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent-primary">▸</span>
                <span>Python</span>
              </div>
            </div>
            <p className="mt-4">
              Still learning from all of them. Outside studying, love seeing new
              tech gadgets, watching anime and playing videogames
            </p>
          </div>

          {/* Photo */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[280px] aspect-square rounded-lg overflow-hidden">
              <img
                src={meImage}
                alt="Johann Restrepo"
                className="w-full h-full object-cover scale-[1.2]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
