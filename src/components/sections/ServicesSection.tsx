import React from 'react';
import Card from '../ui/Card';
import { 
  CalendarClock, 
  Stethoscope, 
  Building2, 
  FileClock,
  ClipboardCheck,
  HeartPulse,
  BookOpen,
  BadgeHelp
} from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="p-6 hover:bg-blue-50 transition-colors group">
      <div className="mb-4 w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <CalendarClock className="w-7 h-7 text-blue-600" />,
      title: "Online Appointment",
      description: "Book appointments with top doctors instantly without waiting on phone calls."
    },
    {
      icon: <Stethoscope className="w-7 h-7 text-blue-600" />,
      title: "Expert Doctors",
      description: "Connect with experienced specialists across all medical fields."
    },
    {
      icon: <Building2 className="w-7 h-7 text-blue-600" />,
      title: "Multiple Hospitals",
      description: "Access healthcare services from various partner hospitals in your area."
    },
    {
      icon: <FileClock className="w-7 h-7 text-blue-600" />,
      title: "Medical History",
      description: "Securely store and access your medical records all in one place."
    },
    {
      icon: <ClipboardCheck className="w-7 h-7 text-blue-600" />,
      title: "Lab Results",
      description: "View and download your lab test results directly from your account."
    },
    {
      icon: <HeartPulse className="w-7 h-7 text-blue-600" />,
      title: "Health Monitoring",
      description: "Track your health metrics and receive personalized recommendations."
    },
    {
      icon: <BookOpen className="w-7 h-7 text-blue-600" />,
      title: "Health Library",
      description: "Access educational resources on various health topics and conditions."
    },
    {
      icon: <BadgeHelp className="w-7 h-7 text-blue-600" />,
      title: "24/7 Support",
      description: "Get assistance from our dedicated customer support team anytime."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare services to meet all your medical needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;