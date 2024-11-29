import { Link } from 'react-router-dom';
import { Calendar, Video, Clock, Users, Shield, Activity, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  {
    name: 'Video Consultations',
    description: 'Connect with doctors face-to-face from the comfort of your home',
    icon: Video,
  },
  {
    name: '24/7 Availability',
    description: 'Access healthcare services around the clock',
    icon: Clock,
  },
  {
    name: 'Secure Platform',
    description: 'Your health data is protected with enterprise-grade security',
    icon: Shield,
  },
  {
    name: 'Expert Doctors',
    description: 'Consult with verified and experienced healthcare professionals',
    icon: Users,
  },
];

const services = [
  {
    name: 'General Consultation',
    description: 'Connect with general physicians for common health concerns',
    image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Specialist Care',
    description: 'Access specialized medical care from expert practitioners',
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1b89?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Mental Health',
    description: 'Professional mental health support and counseling services',
    image: 'https://images.unsplash.com/photo-1620147461831-a97b99ade1d3?q=80&w=2070&auto=format&fit=crop',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/10 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-x-16 gap-y-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Healthcare at Your Fingertips
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Connect with expert healthcare professionals from the comfort of your home. 
                Quality medical care is just a click away.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/register"
                  className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Get Started
                </Link>
                <Link to="/about" className="flex items-center text-sm font-semibold leading-6 text-gray-900">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2064&auto=format&fit=crop"
                alt="Doctor with tablet"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Why Choose Us</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for better health
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive Healthcare Solutions
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-lg"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={service.image}
                    alt={service.name}
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                    <p className="mt-3 text-base text-gray-500">{service.description}</p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/services"
                      className="flex items-center text-sm font-semibold text-primary hover:text-primary/80"
                    >
                      Learn more <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to take control of your health?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of satisfied patients who have chosen our platform for their healthcare needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/book-appointment"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Book an Appointment
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
      </section>
    </div>
  );
}