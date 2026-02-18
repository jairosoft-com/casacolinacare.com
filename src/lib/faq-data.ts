export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface FaqCategory {
  category: string;
  questions: FaqQuestion[];
}

export const faqCategories: FaqCategory[] = [
  {
    category: 'General',
    questions: [
      {
        question: 'What type of care does Casa Colina Care provide?',
        answer:
          'Casa Colina Care is a licensed residential care home providing personalized assistance with daily living activities, medication management, nutritious meals, and social engagement in a warm, family-style setting in Hawaii Kai.',
      },
      {
        question: 'Where is Casa Colina Care located?',
        answer:
          'We are located at 189 Anapalau Street (Hawaii Kai), Honolulu, HI 96825. Our home is nestled in a peaceful residential neighborhood with easy access to local amenities and scenic surroundings.',
      },
      {
        question: 'How many residents does Casa Colina Care accommodate?',
        answer:
          'We maintain a small, intimate setting to ensure each resident receives personalized attention and care. Please contact us for current availability and to learn more about our home.',
      },
    ],
  },
  {
    category: 'Admissions & Getting Started',
    questions: [
      {
        question: 'How do I begin the admissions process?',
        answer:
          'The first step is to schedule a consultation by calling us at +1 (808) 200-1840, emailing kriss@casacolinacare.com, or filling out our contact form. We\u2019ll arrange a visit so you can tour our home and meet our team.',
      },
      {
        question: 'What should I expect during a tour or consultation?',
        answer:
          'During your visit, you\u2019ll meet our staff, see our facilities, and have the opportunity to ask questions about our care approach. We\u2019ll discuss your loved one\u2019s needs and explain how we can create a personalized care plan.',
      },
      {
        question: 'Is there a waiting list?',
        answer:
          'Availability varies. We encourage families to reach out early so we can discuss timing and ensure a smooth transition when a space becomes available. Contact us to learn about current availability.',
      },
    ],
  },
  {
    category: 'Daily Life',
    questions: [
      {
        question: 'What does a typical day look like for residents?',
        answer:
          'Each day includes nutritious home-cooked meals, social activities, personal care assistance as needed, and plenty of time for relaxation and enjoyment. We tailor routines to each resident\u2019s preferences and needs.',
      },
      {
        question: 'Can residents personalize their living space?',
        answer:
          'Absolutely! We encourage residents to bring personal items, photos, and small furnishings to make their space feel like home. Our goal is to create an environment that is comfortable and familiar.',
      },
      {
        question: 'Can family members visit at any time?',
        answer:
          'We welcome family visits and believe that maintaining close family connections is essential to our residents\u2019 well-being. We have flexible visiting hours and encourage families to participate in activities and meals.',
      },
    ],
  },
  {
    category: 'Care & Services',
    questions: [
      {
        question: 'What level of medical care is available?',
        answer:
          'We provide assistance with daily living activities, medication management, and coordination with healthcare providers. For specialized medical needs, we work closely with physicians and can arrange additional services as needed.',
      },
      {
        question: 'How are care plans developed and updated?',
        answer:
          'Each resident receives an individualized care plan developed in collaboration with the resident, their family, and our care team. Plans are reviewed regularly and adjusted as needs change to ensure the best possible care.',
      },
      {
        question: 'What meals and dietary accommodations do you offer?',
        answer:
          'Our kitchen prepares nutritious, home-cooked meals daily using fresh ingredients. We accommodate dietary restrictions, cultural preferences, and special nutritional requirements. Snacks and beverages are available throughout the day.',
      },
    ],
  },
];
