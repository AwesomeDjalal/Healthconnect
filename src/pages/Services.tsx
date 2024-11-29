import { Link } from 'react-router-dom';
import { Video, Calendar, MessageSquare, Activity, Brain, Heart, Stethoscope, ArrowRight } from 'lucide-react';

const mainServices = [
  {
    name: 'Primary Care',
    description: 'Comprehensive healthcare for your everyday medical needs, from common illnesses to preventive care.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop',
  },
  {
    name: 'Mental Health',
    description: 'Professional counseling and psychiatric services to support your mental well-being.',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Chronic Care',
    description: 'Ongoing support and management for chronic conditions like diabetes, hypertension, and more.',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop',
  },
  {
    name: 'Urgent Care',
    description: 'Quick medical attention for non-emergency conditions that need immediate care.',
    icon: Stethoscope,
    image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=2070&auto=format&fit=crop',
  },
];

const features = [
  {
    name: 'Video Consultations',
    description: 'Face-to-face virtual appointments with healthcare providers',
    icon: Video,
  },
  {
    name: 'Easy Scheduling',
    description: 'Book appointments at your convenience, 24/7',
    icon: Calendar,
  },
  {
    name: 'Secure Messaging',
    description: 'Direct communication with your healthcare team',
    icon: MessageSquare,
  },
  {
    name: 'Health Monitoring',
    description: 'Track your progress and vital signs remotely',
    icon: Activity,
  },
];

export default function Services() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Our Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Comprehensive healthcare services delivered through our advanced telemedicine platform.
              Access quality care from the comfort of your home.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/book-appointment"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
              >
                Book Appointment
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Contact Us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Services Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Healthcare Services
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We offer a wide range of medical services through our telemedicine platform,
              ensuring you get the care you need, when you need it.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {mainServices.map((service) => (
              <div
                key={service.name}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-56 w-full object-cover"
                    src={service.image}
                    alt={service.name}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-x-4">
                      <service.icon className="h-6 w-6 text-primary" />
                      <h3 className="text-2xl font-semibold text-gray-900">{service.name}</h3>
                    </div>
                    <p className="mt-4 text-base text-gray-600">{service.description}</p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/book-appointment"
                      className="flex items-center text-sm font-semibold text-primary hover:text-primary/80"
                    >
                      Book Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Platform Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for virtual care
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our platform provides all the tools necessary for a seamless telemedicine experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col items-center text-center">
                  <dt className="flex flex-col items-center gap-y-4 text-base font-semibold leading-7 text-gray-900">
                    <div className="rounded-lg bg-primary/10 p-4">
                      <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Experience healthcare reimagined. Book your first consultation today and take control of your health journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90"
              >
                Sign Up Now
              </Link>
              <Link
                to="/doctors"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                View Our Doctors <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}