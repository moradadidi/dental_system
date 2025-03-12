import React from 'react';
import { Calendar } from 'lucide-react';

interface DentistCardProps {
  name: string;
  specialty: string;
  rating: number;
  image: string;
}

export default function DentistCard({ name, specialty, image }: DentistCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-1">{specialty}</p>
        <div className="mt-4 flex space-x-3">
          <button className="flex-1 bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors">
            View Profile
          </button>
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center">
            <Calendar size={18} className="mr-2" />
            Book
          </button>
        </div>
      </div>
    </div>
  );
}