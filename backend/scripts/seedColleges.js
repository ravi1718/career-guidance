const mongoose = require('mongoose');
const College = require('../models/College');

const sampleColleges = [
  // Indian Colleges
  {
    name: "Indian Institute of Technology Delhi",
    email: "iitd@example.com",
    password: "password123",
    location: "New Delhi, India",
    description: "One of India's premier engineering institutions.",
    courses: [
      {
        name: "Computer Science Engineering",
        duration: "4 years",
        eligibility: "JEE Advanced",
        fees: 200000
      },
      {
        name: "Electrical Engineering",
        duration: "4 years",
        eligibility: "JEE Advanced",
        fees: 200000
      }
    ],
    facilities: ["Library", "Sports Complex", "Labs", "Hostels"],
    placement: {
      averagePackage: 1600000,
      topCompanies: ["Google", "Microsoft", "Amazon"],
      placementPercentage: 95
    },
    admissionProcess: "Through JEE Advanced and GATE for PG courses",
    contactInfo: {
      email: "admissions@iitd.ac.in",
      phone: "011-2659-1000",
      website: "www.iitd.ac.in",
      address: "IIT Delhi, Hauz Khas, New Delhi-110016"
    },
    images: ["https://images.unsplash.com/photo-1562774053-701939374585"],
    ratings: 4.8
  },
  {
    name: "Indian Institute of Management Bangalore",
    email: "iimb@example.com",
    password: "password123",
    location: "Bangalore, India",
    description: "Leading management institution in India.",
    courses: [
      {
        name: "Post Graduate Programme in Management",
        duration: "2 years",
        eligibility: "CAT",
        fees: 2500000
      },
      {
        name: "Executive MBA",
        duration: "1 year",
        eligibility: "CAT/GMAT",
        fees: 2800000
      }
    ],
    facilities: ["Library", "Sports Complex", "Computer Center", "Hostels"],
    placement: {
      averagePackage: 2800000,
      topCompanies: ["McKinsey", "BCG", "Goldman Sachs"],
      placementPercentage: 100
    },
    admissionProcess: "Through CAT/GMAT scores and interview",
    contactInfo: {
      email: "admissions@iimb.ac.in",
      phone: "080-2658-2450",
      website: "www.iimb.ac.in",
      address: "Bannerghatta Road, Bangalore-560076"
    },
    images: ["https://images.unsplash.com/photo-1607237138185-eedd9c632b0b"],
    ratings: 4.9
  },
  {
    name: "All India Institute of Medical Sciences",
    email: "aiims@example.com",
    password: "password123",
    location: "New Delhi, India",
    description: "Premier medical institution of India offering world-class healthcare education.",
    courses: [
      {
        name: "MBBS",
        duration: "5.5 years",
        eligibility: "NEET",
        fees: 150000
      },
      {
        name: "MD/MS",
        duration: "3 years",
        eligibility: "NEET PG",
        fees: 250000
      }
    ],
    facilities: ["Hospital", "Research Labs", "Library", "Hostels"],
    placement: {
      averagePackage: 1200000,
      topCompanies: ["AIIMS", "Fortis", "Apollo"],
      placementPercentage: 100
    },
    admissionProcess: "Through NEET examination",
    contactInfo: {
      email: "admissions@aiims.edu",
      phone: "011-2658-8500",
      website: "www.aiims.edu",
      address: "Ansari Nagar, New Delhi-110029"
    },
    images: ["https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"],
    ratings: 4.9
  },
  {
    name: "National Institute of Design",
    email: "nid@example.com",
    password: "password123",
    location: "Ahmedabad, India",
    description: "India's premier design institute offering innovative programs in design.",
    courses: [
      {
        name: "Industrial Design",
        duration: "4 years",
        eligibility: "NID DAT",
        fees: 400000
      },
      {
        name: "Communication Design",
        duration: "4 years",
        eligibility: "NID DAT",
        fees: 400000
      }
    ],
    facilities: ["Design Studios", "Workshops", "Library", "Exhibition Spaces"],
    placement: {
      averagePackage: 800000,
      topCompanies: ["Apple", "Samsung", "Titan"],
      placementPercentage: 90
    },
    admissionProcess: "Through NID Design Aptitude Test",
    contactInfo: {
      email: "admissions@nid.edu",
      phone: "079-2662-3692",
      website: "www.nid.edu",
      address: "Paldi, Ahmedabad-380007"
    },
    images: ["https://images.unsplash.com/photo-1535957998253-26ae1ef295b6"],
    ratings: 4.7
  },
  {
    name: "St. Stephen's College",
    email: "stephens@example.com",
    password: "password123",
    location: "Delhi, India",
    description: "One of India's oldest and most prestigious liberal arts colleges.",
    courses: [
      {
        name: "English Honours",
        duration: "3 years",
        eligibility: "Class 12",
        fees: 30000
      },
      {
        name: "Economics Honours",
        duration: "3 years",
        eligibility: "Class 12",
        fees: 35000
      }
    ],
    facilities: ["Library", "Sports Ground", "Chapel", "Cafeteria"],
    placement: {
      averagePackage: 600000,
      topCompanies: ["Deloitte", "EY", "Times of India"],
      placementPercentage: 85
    },
    admissionProcess: "Merit-based and interview",
    contactInfo: {
      email: "admissions@ststephens.edu",
      phone: "011-2766-7271",
      website: "www.ststephens.edu",
      address: "University Enclave, Delhi-110007"
    },
    images: ["https://images.unsplash.com/photo-1541339907198-e08756dedf3f"],
    ratings: 4.6
  },

  // International Colleges
  {
    name: "Harvard University",
    email: "harvard@example.com",
    password: "password123",
    location: "Cambridge, USA",
    description: "One of the world's most prestigious universities, known for excellence in education and research.",
    courses: [
      {
        name: "Computer Science",
        duration: "4 years",
        eligibility: "SAT/ACT",
        fees: 5500000
      },
      {
        name: "Business Administration",
        duration: "4 years",
        eligibility: "SAT/ACT",
        fees: 6000000
      }
    ],
    facilities: ["Research Centers", "Libraries", "Museums", "Sports Facilities"],
    placement: {
      averagePackage: 8500000,
      topCompanies: ["Google", "Goldman Sachs", "McKinsey"],
      placementPercentage: 98
    },
    admissionProcess: "SAT/ACT scores, essays, and recommendations",
    contactInfo: {
      email: "admissions@harvard.edu",
      phone: "+1-617-495-1551",
      website: "www.harvard.edu",
      address: "Cambridge, MA 02138, USA"
    },
    images: ["https://images.unsplash.com/photo-1559135197-8a45e5797e31"],
    ratings: 5.0
  },
  {
    name: "University of Oxford",
    email: "oxford@example.com",
    password: "password123",
    location: "Oxford, UK",
    description: "The oldest university in the English-speaking world with a rich history of academic excellence.",
    courses: [
      {
        name: "Philosophy, Politics and Economics",
        duration: "3 years",
        eligibility: "A-Levels/IB",
        fees: 4500000
      },
      {
        name: "Mathematics",
        duration: "3 years",
        eligibility: "A-Levels/IB",
        fees: 4200000
      }
    ],
    facilities: ["Historic Libraries", "Research Labs", "College System", "Sports Facilities"],
    placement: {
      averagePackage: 7500000,
      topCompanies: ["JP Morgan", "BBC", "Civil Service"],
      placementPercentage: 95
    },
    admissionProcess: "UCAS application, interviews, and academic requirements",
    contactInfo: {
      email: "admissions@ox.ac.uk",
      phone: "+44-1865-270000",
      website: "www.ox.ac.uk",
      address: "Oxford OX1 2JD, UK"
    },
    images: ["https://images.unsplash.com/photo-1548793977-f3a9fbd1e80a"],
    ratings: 5.0
  },
  {
    name: "University of Tokyo",
    email: "utokyo@example.com",
    password: "password123",
    location: "Tokyo, Japan",
    description: "Japan's most prestigious university, leading in research and innovation.",
    courses: [
      {
        name: "Engineering",
        duration: "4 years",
        eligibility: "EJU",
        fees: 3500000
      },
      {
        name: "Science",
        duration: "4 years",
        eligibility: "EJU",
        fees: 3200000
      }
    ],
    facilities: ["Research Centers", "Libraries", "Language Support", "Cultural Centers"],
    placement: {
      averagePackage: 6500000,
      topCompanies: ["Toyota", "Sony", "Mitsubishi"],
      placementPercentage: 92
    },
    admissionProcess: "EJU examination and TOEFL scores",
    contactInfo: {
      email: "admissions@u-tokyo.ac.jp",
      phone: "+81-3-3812-2111",
      website: "www.u-tokyo.ac.jp",
      address: "7-3-1 Hongo, Bunkyo, Tokyo"
    },
    images: ["https://images.unsplash.com/photo-1565451c5c449-a1ed3c383894"],
    ratings: 4.9
  },
  {
    name: "ETH Zurich",
    email: "ethz@example.com",
    password: "password123",
    location: "Zurich, Switzerland",
    description: "Switzerland's leading technical and engineering university.",
    courses: [
      {
        name: "Mechanical Engineering",
        duration: "3 years",
        eligibility: "Swiss Matura",
        fees: 3000000
      },
      {
        name: "Computer Science",
        duration: "3 years",
        eligibility: "Swiss Matura",
        fees: 3000000
      }
    ],
    facilities: ["Research Labs", "Innovation Hub", "Student Housing", "Sports Center"],
    placement: {
      averagePackage: 7000000,
      topCompanies: ["Google Switzerland", "ABB", "Novartis"],
      placementPercentage: 94
    },
    admissionProcess: "Academic credentials and language proficiency",
    contactInfo: {
      email: "admissions@ethz.ch",
      phone: "+41-44-632-11-11",
      website: "www.ethz.ch",
      address: "Rämistrasse 101, 8092 Zürich"
    },
    images: ["https://images.unsplash.com/photo-1564517945244-d371c925640b"],
    ratings: 4.9
  },
  {
    name: "National University of Singapore",
    email: "nus@example.com",
    password: "password123",
    location: "Singapore",
    description: "Singapore's flagship university, known for research and innovation.",
    courses: [
      {
        name: "Business Analytics",
        duration: "4 years",
        eligibility: "A-Levels/IB",
        fees: 4000000
      },
      {
        name: "Medicine",
        duration: "5 years",
        eligibility: "A-Levels/IB",
        fees: 5500000
      }
    ],
    facilities: ["Smart Campus", "Research Centers", "Sports Facilities", "Libraries"],
    placement: {
      averagePackage: 7200000,
      topCompanies: ["DBS Bank", "Singapore Airlines", "P&G"],
      placementPercentage: 96
    },
    admissionProcess: "Academic credentials and interviews",
    contactInfo: {
      email: "admissions@nus.edu.sg",
      phone: "+65-6516-6666",
      website: "www.nus.edu.sg",
      address: "21 Lower Kent Ridge Rd, Singapore"
    },
    images: ["https://images.unsplash.com/photo-1564981797816-1043664bf78d"],
    ratings: 4.8
  }
];

async function seedColleges() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/career-guidance', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing colleges
    await College.deleteMany({});

    // Hash passwords before inserting
    for (let college of sampleColleges) {
      const newCollege = new College(college);
      await newCollege.save();
    }

    console.log('Sample colleges have been seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding colleges:', error);
    process.exit(1);
  }
}

seedColleges(); 