// App.js
import React from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import DentistCard from '../components/DentistCard';
import { ArrowRight, CheckCircle, CalendarDays, UserCheck, Star, MapPin, Mail, ArrowUpCircle } from 'lucide-react';

const featuredDentists = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Orthodontist",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Cosmetic Dentist",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dr. Emily Martinez",
    specialty: "Pediatric Dentist",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
  }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-36 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09')] bg-cover bg-center bg-blend-overlay bg-gradient-to-r from-blue-800/60 to-cyan-600/60">
        <div className="container mx-auto px-4 pt-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Perfect Smile, Perfect Care
            </h1>
            <p className="text-xl md:text-2xl mb-10 drop-shadow-md">
              Find your ideal dentist and book appointments in minutes
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
              <a 
                href="#featured-dentists"
                className="bg-white text-blue-600 px-8 py-5 rounded-full font-semibold 
                hover:bg-blue-50 transition-all group transform hover:scale-105 shadow-lg
                flex items-center gap-3"
              >
                Find Dentists
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a 
                href="#"
                className="bg-blue-700 bg-opacity-20 text-white px-8 py-5 rounded-full font-semibold 
                hover:bg-opacity-30 transition-colors flex items-center gap-3"
              >
                Virtual Consultation
                <Video className="text-white" size={20} />
              </a>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <SearchSection />
              <div className="absolute inset-0 border-2 border-white rounded-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dentists */}
      <section id="featured-dentists" className="py-20 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800">Top Rated Dentists</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2 
            transition-colors group">
              View All
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredDentists.map((dentist, index) => (
              <DentistCard key={index} {...dentist} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">How It Works</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-100 -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
              {[1, 2, 3].map(step => (
                <div key={step} className="text-center relative z-10 group">
                  <div className="inline-flex items-center justify-center mb-8">
                    <div className="bg-white rounded-full p-5 shadow-xl group-hover:scale-110 transition-transform">
                      {step === 1 && <UserCheck size={40} className="text-blue-600" />}
                      {step === 2 && <CalendarDays size={40} className="text-blue-600" />}
                      {step === 3 && <CheckCircle size={40} className="text-blue-600" />}
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{step === 1 ? 'Search' : step === 2 ? 'Book' : 'Relax'}</h3>
                  <p className="text-gray-600">{step === 1 ? 'Find your perfect match' : step === 2 ? 'Schedule at your convenience' : 'We handle the rest'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Happy Patients</h2>
          <div className="max-w-5xl mx-auto">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="swiper-slide p-6">
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                      <p className="text-lg text-gray-600 italic mb-6">
                        "The booking process was seamless! I got an appointment the very next day. Highly recommend this service!"
                      </p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={`https://randomuser.me/api/portraits/women/${i+20}.jpg`} 
                          alt="Patient" 
                          className="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">Jessica Williams</p>
                          <p className="text-sm text-gray-500">Orthodontic Patient</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="swiper-pagination mt-8"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">DentCare</h3>
              <p className="text-gray-300">Your trusted partner for dental health solutions</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Find Dentists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <MapPin size={16} />
                  1234 Dental St, Cityville
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  contact@dentcare.com
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  (555) 123-4567
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-200">Newsletter</h4>
              <div className="flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="bg-blue-950/50 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full md:w-auto">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-blue-800 text-center text-gray-400">
            <p>&copy; 2025 DentCare. All rights reserved.</p>
          </div>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-10 right-10 bg-blue-600 p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowUpCircle size={28} />
        </button>
      </footer>
    </div>
  );
}

export default App;