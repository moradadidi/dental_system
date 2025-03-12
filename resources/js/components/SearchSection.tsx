import React, { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';

export default function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [availability, setAvailability] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ searchQuery, location, availability });
  };

  return (
    <div className="bg-white py-8 shadow-md rounded-lg mx-4 -mt-8 relative z-10">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a dentist by name or specialty"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:w-auto">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Location</option>
                <option value="downtown">Downtown</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Availability</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="this-week">This Week</option>
                <option value="next-week">Next Week</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}