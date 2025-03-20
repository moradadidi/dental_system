import React from 'react';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import DentistCard from '../components/DentistCard';
import { ArrowRight, CheckCircle2, Calendar, UserCheck, Clock, MapPin, Phone, Mail, Clock3, Award, Users, Sparkles, HeartPulse } from 'lucide-react';
import { Head, Link, usePage } from '@inertiajs/react';
import './home.css';


const featuredDentists = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Orthodontist",
    availability: "Available Today",
    location: "Downtown Clinic",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Cosmetic Dentist",
    availability: "Next Available: Tomorrow",
    location: "North Medical Center",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Dr. Emily Martinez",
    specialty: "Pediatric Dentist",
    availability: "Available Today",
    location: "Family Dental Care",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800"
  }
];

const stats = [
  { icon: Users, value: "20+", label: "Expert Dentists" },
  { icon: HeartPulse, value: "15k+", label: "Happy Patients" },
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Sparkles, value: "25+", label: "Services Offered" },
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
         <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-[url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-600/90"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="inline-block px-4 py-1 bg-blue-500/20 rounded-full text-blue-200 mb-6">
              Book Your Appointment Today
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Smile Deserves Expert Care
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with top-rated dentists near you and schedule appointments with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#featured-dentists"
                className="btn-primary group"
              >
                Find Your Dentist
                <ArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a 
                href="#how-it-works"
                className="btn-secondary"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </section>

      <SearchSection />

      {/* About Us Section */}
      <section id="about" className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-semibold mb-4 block">About DentCare</span>
              <h2 className="text-4xl font-bold mb-6">Providing Quality Dental Care Since 2010</h2>
              <p className="text-gray-600 mb-8">
                At DentCare, we believe everyone deserves access to quality dental care. Our team of experienced professionals 
                uses the latest technology and techniques to ensure you receive the best possible treatment in a comfortable 
                and welcoming environment.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-blue-100 rounded-lg">
                    <CheckCircle2 className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Expert Dentists</h4>
                    <p className="text-sm text-gray-600">Highly qualified professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-2 bg-blue-100 rounded-lg">
                    <Clock3 className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Flexible Hours</h4>
                    <p className="text-sm text-gray-600">Open 7 days a week</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                        <Icon className="text-blue-600" size={24} />
                      </div>
                      <div className="text-2xl font-bold mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000"
                alt="Modern dental clinic"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Book Appointment</div>
                    <div className="font-semibold">Easy Online Booking</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dentists */}
      <section id="featured-dentists" className="section-padding scroll-mt-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Dentists</h2>
            <p className="text-gray-600">Connect with our top-rated dental professionals, each verified and highly recommended by patients.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDentists.map((dentist, index) => (
              <DentistCard key={index} {...dentist} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding bg-blue-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Booking Process</h2>
            <p className="text-gray-600">Book your dental appointment in three easy steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">1</div>
              <UserCheck size={48} className="mx-auto mb-6 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Choose Your Dentist</h3>
              <p className="text-gray-600">Browse through our verified dentists and read patient reviews to find your perfect match.</p>
            </div>
            <div className="card p-8 text-center relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">2</div>
              <Calendar size={48} className="mx-auto mb-6 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Pick Your Time</h3>
              <p className="text-gray-600">Choose from available time slots that best fit your schedule.</p>
            </div>
            <div className="card p-8 text-center relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">3</div>
              <CheckCircle2 size={48} className="mx-auto mb-6 text-blue-600" />
              <h3 className="text-xl font-semibold mb-3">Instant Confirmation</h3>
              <p className="text-gray-600">Receive immediate confirmation and reminders for your appointment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-blue-600 font-semibold mb-4 block">Contact Us</span>
              <h2 className="text-4xl font-bold mb-6">Get in Touch with Us</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services or need to schedule an appointment? 
                Our friendly team is here to help you with any inquiries.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Visit Us</h4>
                    <p className="text-gray-600">Casablanca Sidi Hajjaj 4005</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Phone className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Call Us</h4>
                    <p className="text-gray-600">(+212) 634728765</p>
                    <p className="text-gray-600">Mon - Sun: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email Us</h4>
                    <p className="text-gray-600">info@dentcare.com</p>
                    <p className="text-gray-600">support@dentcare.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <form className="card p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input-field"
                      placeholder="Adidi Mourad"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input-field"
                      placeholder="moradadidi@gmail.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input-field"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Your message..."
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">DentCare</h3>
              <p className="text-gray-400">Your trusted partner in dental health, making quality care accessible to everyone.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#featured-dentists" className="text-gray-400 hover:text-white transition-colors">Find a Dentist</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-400">
                  <MapPin size={18} className="mr-2" />
                  123 Dental Street
                </li>
                <li className="text-gray-400">Casablanca Morocco</li>
                <li className="text-gray-400">Phone: (+212) 634728765</li>
                <li className="text-gray-400">Email: info@dentcare.com</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.17.5C10.24.5,9.1,3.3,9.1,5.47V7.46H5.27v4.01h3.83v12.03h5.4V11.47h4.28l.58-4.01Z"/></svg>
                </a>
                <a href="https://twitter.com" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>
                </a>
                <a href="https://instagram.com" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-pink-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 DentCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;