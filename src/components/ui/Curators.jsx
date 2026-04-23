
import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const teamMembers = [
  {
    id: 1,
    name: 'Marcus Sterling',
    title: 'Chief Investment Strategist',
    bio: 'Former hedge fund quantitative analyst, Marcus with 20+ years on trading systems.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Elena Rossi',
    title: 'Managing Editor',
    bio: 'Award-winning financial journalist. Previously at Wall Street Journal and Bloomberg.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Julien Chen',
    title: 'Head of Research',
    bio: 'Specializing in algorithmic trading and systematic alpha generation. PhD in Economics.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Sarah Vance',
    title: 'Data Science Lead',
    bio: 'ML specialist. Developing data-driven predictive models for global markets.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
  },
];
export default function Curators() {
  return (
   <>
     <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="team-heading">
                The Curators
              </h2>
              <p className="text-gray-600">
                Led by veterans from some of the most prestigious financial institutions and technology firms.
              </p>
            </div>
            <Link
              to="#"
              className="hidden md:flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
              data-testid="join-team-link"
            >
              Join the team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group cursor-pointer"
                data-testid={`team-member-${member.id}`}
              >
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                  
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-teal-600 mb-2">{member.title}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
          <div className="md:hidden text-center mt-8">
            <Link
              to="#"
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Join the team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
   </>
  )
}
