import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, Calendar, Clock, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const specialties = [
  'All Specialties',
  'Primary Care',
  'Cardiology',
  'Dermatology',
  'Mental Health',
  'Pediatrics',
  'Neurology',
  'Orthopedics',
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Primary Care',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    reviews: 128,
    nextAvailable: 'Today',
    experience: '15+ years',
    education: 'Harvard Medical School',
    languages: ['English', 'Spanish'],
    about: 'Experienced primary care physician focused on preventive care and chronic disease management.',
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    reviews: 95,
    nextAvailable: 'Tomorrow',
    experience: '12+ years',
    education: 'Stanford Medical School',
    languages: ['English', 'Mandarin'],
    about: 'Board-certified cardiologist specializing in preventive cardiology and heart disease management.',
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Mental Health',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    reviews: 156,
    nextAvailable: 'Today',
    experience: '10+ years',
    education: 'Yale School of Medicine',
    languages: ['English', 'Portuguese'],
    about: 'Compassionate psychiatrist specializing in anxiety, depression, and stress management.',
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialty: 'Dermatology',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop',
    rating: 4.7,
    reviews: 89,
    nextAvailable: 'In 2 days',
    experience: '8+ years',
    education: 'Johns Hopkins Medicine',
    languages: ['English'],
    about: 'Expert dermatologist providing comprehensive skin care and treatment for various skin conditions.',
  },
  {
    id: 5,
    name: 'Dr. Lisa Thompson',
    specialty: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1623854767648-e7bb8009f0db?q=80&w=2070&auto=format&fit=crop',
    rating: 4.9,
    reviews: 178,
    nextAvailable: 'Today',
    experience: '14+ years',
    education: 'Columbia University',
    languages: ['English', 'French'],
    about: 'Dedicated pediatrician with extensive experience in child development and pediatric care.',
  },
  {
    id: 6,
    name: 'Dr. Robert Kim',
    specialty: 'Neurology',
    image: 'https://images.unsplash.com/photo-1637059824899-a441006a6875?q=80&w=2070&auto=format&fit=crop',
    rating: 4.8,
    reviews: 112,
    nextAvailable: 'Tomorrow',
    experience: '16+ years',
    education: 'UCLA Medical School',
    languages: ['English', 'Korean'],
    about: 'Experienced neurologist specializing in headache disorders and neurological conditions.',
  },
];

export default function Doctors() {
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Doctors
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with experienced healthcare professionals ready to provide quality care through our telemedicine platform.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-lg">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
              placeholder="Search doctors by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap",
                  selectedSpecialty === specialty
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                )}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
            >
              <img
                className="h-48 w-full object-cover"
                src={doctor.image}
                alt={doctor.name}
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="mt-1 text-sm text-primary">{doctor.specialty}</p>
                  <div className="mt-2 flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    <span className="ml-1 text-sm text-gray-600">
                      {doctor.rating} ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="mr-2 h-4 w-4" />
                      Next Available: {doctor.nextAvailable}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="mr-2 h-4 w-4" />
                      Experience: {doctor.experience}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-2 h-4 w-4" />
                      Education: {doctor.education}
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600">{doctor.about}</p>
                </div>
                <div className="mt-6">
                  <Link
                    to="/book-appointment"
                    className="block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
                  >
                    Book Appointment
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Book your first consultation today and experience healthcare from the comfort of your home.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
              >
                Create Account
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Contact Support <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}