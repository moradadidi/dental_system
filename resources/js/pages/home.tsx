import React from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import DentistCard from '../components/DentistCard';
import { ArrowRight, CheckCircle2, Calendar, UserCheck } from 'lucide-react';

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
      <section className="relative pt-20 pb-32 bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-400/90"></div>
        <div className="container mx-auto px-4 pt-16 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Health, Our Priority – Book a Dentist Appointment Today!
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Find the best dentists near you and schedule your appointment in seconds.
            </p>
            <a 
              href="#featured-dentists"
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors inline-flex items-center"
            >
              Find a Dentist
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </section>

      <SearchSection />

      {/* Featured Dentists */}
      <section id="featured-dentists" className="py-16 scroll-mt-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Dentists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDentists.map((dentist, index) => (
              <DentistCard key={index} {...dentist} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <UserCheck size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Choose a Dentist</h3>
              <p className="text-gray-600">Browse our list of expert dentists and find the perfect match for your needs.</p>
            </div>
            <div className="text-center p-6">
              <Calendar size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Select a Time</h3>
              <p className="text-gray-600">Pick a convenient time slot that works best with your schedule.</p>
            </div>
            <div className="text-center p-6">
              <CheckCircle2 size={48} className="mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Confirm Booking</h3>
              <p className="text-gray-600">Get instant confirmation and reminders for your appointment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Patients Say</h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <p className="text-xl text-gray-600 italic mb-6">
                "The booking process was incredibly smooth. I found a great dentist and got an appointment for the next day. Highly recommended!"
              </p>
              <div className="flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
                  alt="Patient"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4 text-left">
                  <p className="font-semibold">Jessica Williams</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">DentCare</h3>
              <p className="text-gray-400">Your trusted partner in dental health.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#featured-dentists" className="text-gray-400 hover:text-white">Find a Dentist</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>1234 Dental Street</li>
                <li>City, State 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: contact@dentcare.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-400 hover:text-white">Facebook</a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-white">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 DentCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;