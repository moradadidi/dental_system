import React from 'react';
import { Calendar, MapPin, Clock, Star, Shield, ThumbsUp } from 'lucide-react';

interface DentistCardProps {
  name: string;
  specialty: string;
  availability: string;
  location: string;
  image: string;
}

export default function DentistCard({ name, specialty, availability, location, image }: DentistCardProps) {
  return (
    <div className="card overflow-hidden group">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className="badge badge-success">
            Available Today
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <p className="text-blue-600 font-medium">{specialty}</p>
          </div>
          <div className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-blue-700">4.9</span>
          </div>
        </div>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600">
            <Clock size={18} className="mr-2 text-gray-400" />
            <span>{availability}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin size={18} className="mr-2 text-gray-400" />
            <span>{location}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-gray-600">
            <Shield size={16} className="text-blue-600" />
            <span className="text-sm">Verified</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <ThumbsUp size={16} className="text-blue-600" />
            <span className="text-sm">98% Satisfied</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="btn-secondary flex-1 py-2.5 text-sm">
            View Profile
          </button>
          <button className="btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2">
            <Calendar size={16} />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}