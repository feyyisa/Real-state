import React from 'react';

const FAQPage = () => {
  // Static FAQ data
  const faqs = [
    {
      question: 'What is this project about?',
      answer: 'This project is a platform where users can manage their profiles, interact with the system, and access different services offered by the platform.',
    },
    {
      question: 'How can I create an account?',
      answer: 'To create an account, simply click the "Sign Up" button on the homepage and provide your name, email, and password.',
    },
    {
      question: 'How can I update my profile?',
      answer: 'You can update your profile by visiting the Profile page and modifying your name, email, phone number, and password.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'If you have forgotten your password, you can click the "Forgot Password" link on the login page and follow the instructions to reset your password.',
    },
    {
      question: 'Who can access the FAQ page?',
      answer: 'Anyone can access the FAQ page to learn more about the platform. There is no restriction based on user roles.',
    },
    {
      question: 'How can I contact support?',
      answer: 'For support, you can reach out via the "Contact Us" page or email us at support@yourproject.com.',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-bold text-gray-800">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FAQPage;
