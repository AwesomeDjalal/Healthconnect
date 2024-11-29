import { Users, Heart, Trophy, Target } from 'lucide-react';

const stats = [
  { name: 'Active Patients', value: '10,000+' },
  { name: 'Expert Doctors', value: '100+' },
  { name: 'Years Experience', value: '15+' },
  { name: 'Success Rate', value: '99%' },
];

const values = [
  {
    name: 'Patient-Centered Care',
    description: 'We put our patients first, ensuring personalized care that meets individual needs.',
    icon: Heart,
  },
  {
    name: 'Excellence',
    description: 'We strive for excellence in everything we do, from patient care to technological innovation.',
    icon: Trophy,
  },
  {
    name: 'Accessibility',
    description: 'Making quality healthcare accessible to everyone, anywhere, anytime.',
    icon: Target,
  },
  {
    name: 'Collaboration',
    description: 'Working together with patients and healthcare providers for better outcomes.',
    icon: Users,
  },
];

const team = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop',
    bio: 'Leading our medical team with over 15 years of experience in telemedicine and healthcare innovation.',
  },
  {
    name: 'Dr. Michael Chen',
    role: 'Head of Specialist Care',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    bio: 'Specialized in coordinating comprehensive care across multiple medical disciplines.',
  },
  {
    name: 'Dr. Emily Rodriguez',
    role: 'Mental Health Director',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=2070&auto=format&fit=crop',
    bio: 'Passionate about making mental healthcare accessible through innovative telehealth solutions.',
  },
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-primary/10 to-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              About HealthConnect
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              We're revolutionizing healthcare delivery through innovative telemedicine solutions. 
              Our mission is to make quality healthcare accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What drives us forward
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our core values shape everything we do, from how we develop our platform to how we interact with our patients.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <value.icon className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                    {value.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Our Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our leadership
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our experienced team of healthcare professionals is dedicated to providing the highest quality of care.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.name} className="flex flex-col items-start">
                <img
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  src={person.image}
                  alt={person.name}
                />
                <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                  {person.name}
                </h3>
                <p className="text-base leading-7 text-primary">{person.role}</p>
                <p className="mt-4 text-base leading-7 text-gray-600">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}