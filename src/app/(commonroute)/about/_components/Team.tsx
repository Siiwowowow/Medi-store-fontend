"use client";

import { IconBrandLinkedin, IconBrandTwitter, IconMail } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Mohammad Karim",
    role: "Co-Founder & CEO",
    bio: "10+ years in healthcare logistics",
    initials: "MK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=400&auto=format&fit=crop",
    email: "m.karim@medistore.com",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Fatema Begum",
    role: "Chief Technology Officer",
    bio: "Led engineering at 3 health-tech startups",
    initials: "FB",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
    email: "f.begum@medistore.com",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Arif Hossain",
    role: "Head of Operations",
    bio: "Built nationwide delivery network",
    initials: "AH",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&auto=format&fit=crop",
    email: "a.hossain@medistore.com",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Sabrina Islam",
    role: "Head of Seller Relations",
    bio: "Manages 500+ seller partnerships",
    initials: "SI",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
    email: "s.islam@medistore.com",
    linkedin: "#",
    twitter: "#",
  },
];

export default function Team() {
  return (
    <section className="bg-[#f6f6f6] py-16 lg:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-[2px] bg-[#fb6c08]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#fb6c08]">
              Leadership
            </span>
            <div className="w-8 h-[2px] bg-[#fb6c08]" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#151515] tracking-[-0.03em]">
            The People Behind MediStore
          </h2>
          <p className="text-xs md:text-sm text-[#52525b] max-w-2xl mx-auto mt-3">
            Healthcare experts, technologists, and logistics specialists united to make quality medicine accessible.
          </p>
        </div>

        {/* Team Grid - 4 columns responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="group bg-white border-[1.5px] border-[#e5e7eb] rounded-lg overflow-hidden transition-all duration-300 hover:border-[#063c28]"
            >
              {/* Photo Zone - Full image display */}
              <div className="relative w-full bg-[#063c28] overflow-hidden">
                {member.image ? (
                  <>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[#063c28]/0 group-hover:bg-[#063c28]/20 transition-colors duration-300" />
                  </>
                ) : (
                  <div className="flex items-center justify-center aspect-square">
                    <span className="text-2xl lg:text-3xl font-bold text-white opacity-80">
                      {member.initials}
                    </span>
                  </div>
                )}
                
                {/* Contact overlay - appears on hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-[#063c28]/95 backdrop-blur-sm py-2 px-3">
                  <div className="flex items-center justify-center gap-3">
                    <Link 
                      href={`mailto:${member.email}`}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <IconMail className="w-3.5 h-3.5" />
                    </Link>
                    <Link 
                      href={member.linkedin}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <IconBrandLinkedin className="w-3.5 h-3.5" />
                    </Link>
                    <Link 
                      href={member.twitter}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      <IconBrandTwitter className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Info Zone - Compact */}
              <div className="p-3 lg:p-4">
                <h3 className="text-xs sm:text-sm lg:text-base font-bold text-[#151515] tracking-[-0.01em] line-clamp-1">
                  {member.name}
                </h3>
                <p className="text-[9px] lg:text-[10px] font-bold text-[#3b9c3c] uppercase tracking-[0.08em] mt-0.5 line-clamp-1">
                  {member.role}
                </p>
                <div className="w-6 h-[1px] bg-[#e5e7eb] my-2 lg:my-2.5" />
                <p className="text-[10px] lg:text-[11px] text-[#52525b] leading-relaxed line-clamp-2">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}