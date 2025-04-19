import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, role, content, rating, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 relative">
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <Quote className="w-4 h-4 text-white" />
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://randomuser.me/api/portraits/men/1.jpg';
            }}
          />
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
          />
        ))}
      </div>
      
      <p className="text-gray-600 italic">{content}</p>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Patient",
      content: "MedConnect made it so easy to find the right specialist for my condition. The booking process was simple, and I received excellent care.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "Michael Brown",
      role: "Regular Patient",
      content: "I've been using MedConnect for all my family's healthcare needs. The platform is intuitive, and we always get appointments quickly.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Emily Davis",
      role: "New Patient",
      content: "As someone new to the area, MedConnect helped me find the best hospitals and doctors near me. Highly recommended!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/67.jpg"
    },
    {
      name: "Robert Wilson",
      role: "Patient",
      content: "The convenience of booking appointments online and the quality of care I received exceeded my expectations.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/men/52.jpg"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read about the experiences of our patients and how MedConnect has helped them access quality healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              content={testimonial.content}
              rating={testimonial.rating}
              image={testimonial.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;