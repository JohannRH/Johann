import { HiOutlineMail } from 'react-icons/hi';
import { SheepScene } from '../../scene/SheepScene';

export const HomeSection: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 py-24 pt-32"
    >
      <div className="max-w-4xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* 3D Sheep Space - Circular container */}
        <div className="flex justify-center md:justify-start">
          <div className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center overflow-hidden relative">
            {/* 3D Sheep Canvas */}
            <div className="absolute inset-0">
              <SheepScene />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-100">
            Hi, I'm{' '}
            <span className="text-orange-500">Johann</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 leading-relaxed">
            I am a software developer based in Colombia. Fascinated by exploring
            new things.
          </p>
          <div className="pt-4">
            <a
              href="mailto:your.email@example.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 hover:bg-orange-500/10 text-orange-500 border border-orange-500 font-medium rounded transition-colors text-sm"
            >
              <HiOutlineMail className="w-4 h-4" />
              Say hi!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};