import React, { useState } from 'react';
import { Search, MapPin, Calendar, Filter, ChevronDown } from 'lucide-react';

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [specialty, setSpecialty] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ searchQuery, location, availability, specialty });
  };

  const specialties = [
    'General Dentistry',
    'Orthodontics',
    'Periodontics',
    'Endodontics',
    'Pediatric Dentistry',
    'Cosmetic Dentistry'
  ];

  return (
    <div className="container">
      <div className="bg-white -mt-24 rounded-2xl shadow-xl p-6 md:p-8 relative z-20 border border-gray-100">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Find Your Perfect Dentist</h3>
          <p className="text-gray-600">Search by name, specialty, or location</p>
        </div>
        
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dentists or procedures..."
                className="input-field pl-12"
              />
            </div>
            
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden btn-secondary py-2 flex items-center justify-center gap-2"
            >
              <Filter size={20} />
              Filters
              <ChevronDown 
                size={16} 
                className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`${showFilters ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 md:w-auto`}>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <MapPin size={20} />
                </div>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="select-field pl-12 pr-10"
                >
                  <option value="">Select Location</option>
                  <option value="downtown">Downtown</option>
                  <option value="north">North</option>
                  <option value="south">South</option>
                  <option value="east">East</option>
                  <option value="west">West</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Calendar size={20} />
                </div>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="select-field pl-12 pr-10"
                >
                  <option value="">Select Time</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="this-week">This Week</option>
                  <option value="next-week">Next Week</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown size={16} className="text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="border-t border-gray-100 pt-4 mt-4">
              <h4 className="font-medium mb-3">Specialty</h4>
              <div className="flex flex-wrap gap-2">
                {specialties.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSpecialty(specialty === item ? '' : item)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      specialty === item
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="btn-primary w-full md:w-auto flex items-center justify-center gap-2"
            >
              <Search size={20} />
              Search Dentists
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}