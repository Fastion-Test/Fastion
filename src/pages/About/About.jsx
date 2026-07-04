const VALUES = [
  { title: 'Considered Design', desc: 'Every piece is chosen for how it fits into a wardrobe over years, not weeks.' },
  { title: 'Honest Pricing', desc: 'Premium materials and construction, priced without the traditional markup.' },
  { title: 'Slower Fashion', desc: 'Smaller runs, better fabrics, and fewer things that end up in landfill.' },
];

export default function About() {
  return (
    <div>
      <div className="relative h-72 sm:h-96">
        <img src="https://picsum.photos/seed/about-hero/1600/700" alt="LUXE studio" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center">
          <div className="container-x">
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white">About LUXE</h1>
          </div>
        </div>
      </div>

      <div className="container-x py-14 max-w-3xl mx-auto">
        <p className="text-sm sm:text-base text-brand-gray-600 dark:text-brand-gray-300 font-body leading-relaxed mb-6">
          LUXE started as a small studio with one idea: fashion should be minimal, considered, and built to last.
          What began as a handful of essential pieces has grown into a full wardrobe — women's, men's, and kids' —
          without losing the same quiet, premium feel we started with.
        </p>
        <p className="text-sm sm:text-base text-brand-gray-600 dark:text-brand-gray-300 font-body leading-relaxed mb-12">
          We work directly with a small group of manufacturers we trust, keep our supply chain short, and put
          our energy into fewer, better products rather than chasing every passing trend.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-brand-gray-200 dark:border-brand-gray-800 rounded-2xl p-6">
              <h3 className="font-heading font-semibold mb-2 text-brand-black dark:text-white">{v.title}</h3>
              <p className="text-sm text-brand-gray-500 font-body">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
