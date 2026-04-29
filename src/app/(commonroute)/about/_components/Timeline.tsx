"use client";

const events = [
  {
    year: "2020",
    title: "MediStore Founded",
    description: "Started with 12 verified sellers and 500 products in Dhaka.",
  },
  {
    year: "2021",
    title: "Nationwide Expansion",
    description: "Expanded delivery to all 64 districts of Bangladesh.",
  },
  {
    year: "2022",
    title: "10,000 Medicines Milestone",
    description: "Crossed 10,000 listed OTC medicines from 200+ sellers.",
  },
  {
    year: "2023",
    title: "Mobile-First Upgrade",
    description: "Launched full mobile experience serving 30,000+ monthly users.",
  },
  {
    year: "2024",
    title: "50,000 Customers",
    description: "Reached 50,000+ satisfied customers with 4.8/5 average rating.",
  },
];

export default function Timeline() {
  return (
    <section className="bg-[#f6f6f6] py-24">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        {/* Section Header - Left Aligned */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[2px] bg-[#fb6c08]" />
            <span className="text-[10px] font-bold uppercase tracking-[.15em] text-[#fb6c08] Poppins">
              OUR JOURNEY
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#151515] tracking-[-.03em] Poppins">
            How We Got Here
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[19px] top-0 w-[2px] h-full bg-[#e5e7eb] hidden md:block" />

          <div className="space-y-8">
            {events.map((event, idx) => (
              <div key={idx} className="relative flex gap-6 md:gap-8">
                {/* Year Dot */}
                <div className="flex-shrink-0 z-10">
                  <div className="w-10 h-10 rounded-full bg-[#063c28] flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white Poppins">{event.year}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="inline-block bg-[#fcf0e4] text-[#063c28] text-xs font-bold rounded-full px-3 py-1">
                    {event.year}
                  </div>
                  <h3 className="text-lg font-bold text-[#151515] mt-2 Poppins">{event.title}</h3>
                  <p className="text-sm text-[#52525b] leading-relaxed mt-2 max-w-[480px] Poppins">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}