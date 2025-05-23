import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {     
    home: {
      findYourHome: "Find Your Dream Home",
      filterType: "Filter by Type",
      rent: "Rent",
      buy: "Buy",
      sortBy: "Sort By",
      priceAsc: "Price: Low to High",
      priceDesc: "Price: High to Low",
      sizeAsc: "Size: Small to Large",
      sizeDesc: "Size: Large to Small",
      featuredProperties: "Featured Properties",
      errorLoading: "Error loading properties. Please try again later.",
      viewDetails: "View Details",
      propertyImages: "Property Images",
      description: "Description",
      propertyDetails: "Property Details",
      featuresAmenities: "Features & Amenities",
      contactBooking: "Contact & Booking",
      status: "Status",
      available: "Available",
      booked: "Booked",
      availableFrom: "Available From",
      bookNow: "Book Now",
      currentlyBooked: "Currently Booked",
      close: "Close",
      noProperties: "No properties found matching your criteria",
      clearFilters: "Clear all filters",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
      forRent: "For Rent",
      forSale: "For Sale",
      beds: "Beds",
      baths: "Baths",
      price: "Price",
      size: "Size",
      yearBuilt: "Year Built",
      condition: "Condition",
      features: "Features",
      amenities: "Amenities",
      filterByRegion: "Filter by Region",
      filterByCity: "Filter by City",
      minPrice: "Min Price",
      maxPrice: "Max Price",
      sqm: "sqm",
      property: "Property"
    },
      contact: {
        title: "Contact Us",
        subtitle: "Have any questions? Feel free to reach out to us. We're here to help you with all your real estate needs.",
        name: "Name",
        email: "Email",
        message: "Message",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "Enter your email",
        messagePlaceholder: "Write your message here...",
        submit: "Send Message",
        processing: "Processing...",
        submitStatus: {
          success: "Your message has been sent successfully!",
          fail: "Failed to submit form",
          error: "An error occurred. Please try again later."
        },
        errors: {
          name: "Name is required",
          emailRequired: "Email is required",
          emailInvalid: "Please enter a valid email",
          message: "Message is required"
        },
        emailLabel: "Email:",
        phoneLabel: "Phone:",
        addressLabel: "Address:"
      },
      services: {
      heading: 'Our Services',
      description: 'We provide a wide range of real estate services to help buyers, sellers, and property owners manage their transactions efficiently.',
      propertyListings: {
        title: 'Property Listings',
        desc: 'Browse thousands of verified property listings with detailed descriptions and images.'
      },
      propertyManagement: {
        title: 'Property Management',
        desc: 'Manage your property listings, update details, and track bookings easily.'
      },
      advancedSearch: {
        title: 'Advanced Search & Filters',
        desc: 'Use powerful filters to search properties based on location, price, and amenities.'
      },
      securePayment: {
        title: 'Secure Payment Processing',
        desc: 'Make hassle-free transactions with our secure and reliable payment gateway.'
      },
      customerSupport: {
        title: 'Customer Support',
        desc: 'Get assistance anytime with our dedicated 24/7 customer support team.'
      }
    },
dashboard: {
        title: "Admin Dashboard",
        totalUsers: "Total Users",
        totalProperties: "Total Properties",
        totalBookings: "Total Bookings",
        totalEarnings: "Total Earnings",
        pendingApprovals: "Pending Approvals",
      },
      about: {
        title: "About Us",
        intro: "Welcome to our Real Estate Management System, a platform designed to simplify property transactions for buyers, sellers, and real estate agents...",
        missionTitle: "Our Mission",
        mission: "To make real estate transactions smooth, transparent, and efficient using modern technology...",
        whyTitle: "Why Choose Us?",
        why: {
          advancedSearch: "Advanced property search with detailed filters.",
          securePayment: "Secure payment processing.",
          virtualTours: "Virtual property tours.",
          notifications: "Real-time notifications.",
          customerSupport: "Dedicated support and tailored recommendations."
        }
      },
      faq: {
  title: "Frequently Asked Questions",
  q1: {
    question: "What is this project about?",
    answer: "This project is a platform where users can manage their profiles, interact with the system, and access different services offered by the platform. This platform is open access for all users."
  },
  q2: {
    question: "How can I create an account?",
    answer: "To create an account, simply click the \"Sign Up\" button on the homepage and provide your name, email, and password."
  },
  q3: {
    question: "How can I update my profile?",
    answer: "You can update your profile by visiting the Profile page and modifying your name, email, phone number, and password."
  },
  q4: {
    question: "How do I reset my password?",
    answer: "If you have forgotten your password, you can click the \"Forgot Password\" link on the login page and follow the instructions to reset your password."
  },
  q5: {
    question: "Who can access the FAQ page?",
    answer: "Anyone can access the FAQ page to learn more about the platform. There is no restriction based on user roles."
  },
  q6: {
    question: "How can I contact support?",
    answer: "For support, you can reach out via the \"Contact Us\" page or email us at support@yourproject.com."
  }
},
login: {
  title: "Login",
  email: "Email",
  password: "Password",
  submit: "Login",
  noAccount: "Don't have an account?",
  register: "Register here",
  errors: {
    failed: "Login failed",
    unknownRole: "Unknown role, cannot navigate.",
    generic: "Something went wrong. Try again later."
  }
},
 register: {
        title: "Register",
        name: "Name",
        email: "Email",
        phone: "Phone",
        password: "Password",
        role: "Role",
        customer: "Customer",
        owner: "Owner",
        admin: "Admin",
        submit: "Register",
        errors: {
          failed: "Registration failed",
          generic: "Something went wrong. Try again later."
        },
        success: "Registration successful!"
      },
      navbar: {
  home: "Home",
  about: "About",
  service: "Service",
  pricing: "Pricing",
  contact: "Contact",
  faq: "FAQ",
  login: "Login",
  register: "Register",
title: "Real Estate",
}

    }
  },

  am: {
    translation: {
    home: {
      findYourHome: "የምትፈልጉትን ቤት �ግኙ",
      filterType: "በዓይነት አጣራ",
      rent: "መከራየት",
      buy: "መግዛት",
      sortBy: "በማዘጋጀት",
      priceAsc: "ዋጋ: ከዝቅ ወደ ከፍታ",
      priceDesc: "ዋጋ: ከከፍታ ወደ ዝቅታ",
      sizeAsc: "መጠን: ከትንሽ ወደ ትልቅ",
      sizeDesc: "መጠን: ከትልቅ ወደ ትንሽ",
      featuredProperties: "የተለዩ ቤቶች",
      errorLoading: "ቤቶችን በማምጣት ላይ ስህተት ተፈጥሯል። እባክዎ ቆይተው ይሞክሩ።",
      viewDetails: "ዝርዝሮችን ይመልከቱ",
      propertyImages: "የቤቱ ፎቶዎች",
      description: "መግለጫ",
      propertyDetails: "የቤቱ ዝርዝሮች",
      featuresAmenities: "መለያ ባህሪያት & አገልግሎቶች",
      contactBooking: "አግኙን & ማስያዝ",
      status: "ሁኔታ",
      available: "የሚገኝ",
      booked: "ተያይዟል",
      availableFrom: "ከዚህ ቀን ጀምሮ ይገኛል",
      bookNow: "አሁን ያስያዙ",
      currentlyBooked: "ተያይዟል",
      close: "ዝጋ",
      noProperties: "ከምትፈልጉት ጋር የሚመጣጠን ቤት አልተገኘም",
      clearFilters: "ሁሉንም አጣራዎች አጥፋ",
      bedrooms: "ክፍሎች",
      bathrooms: "መታጠቢያ ቤቶች",
      forRent: "ለኪራይ",
      forSale: "ለመሸጥ",
      beds: "አልጋዎች",
      baths: "መታጠቢያዎች",
      price: "ዋጋ",
      size: "መጠን",
      yearBuilt: "የተገነባበት �መት",
      condition: "ሁኔታ",
      features: "መለያ ባህሪያት",
      amenities: "አገልግሎቶች",
      filterByRegion: "በክልል አጣራ",
      filterByCity: "በከተማ አጣራ",
      minPrice: "ከፍተኛ ዋጋ",
      maxPrice: "ፍፁም ዋጋ",
      sqm: "ሜ²",
      property: "ቤት"
    },
      contact: {
        title: "አግኙን",
        subtitle: "ጥያቄ ካለዎት እባክዎ ያግኙን።...",
        name: "ስም",
        email: "ኢሜይል",
        message: "መልእክት",
        namePlaceholder: "ስምዎን ያስገቡ",
        emailPlaceholder: "ኢሜይልዎን ያስገቡ",
        messagePlaceholder: "መልእክትዎን እዚህ ይጻፉ...",
        submit: "መልእክት ላክ",
        processing: "በማስኬድ ላይ...",
        submitStatus: {
          success: "መልእክትዎ በተሳካ ሁኔታ ተልኳል!",
          fail: "ቅጽ ማቅረብ አልተሳካም።",
          error: "ስህተት ተከስቷል።"
        },
        errors: {
          name: "ስም አስፈላጊ ነው",
          emailRequired: "ኢሜይል አስፈላጊ ነው",
          emailInvalid: "እባክዎ ትክክለኛ ኢሜይል ያስገቡ",
          message: "መልእክት አስፈላጊ ነው"
        },
        emailLabel: "ኢሜይል:",
        phoneLabel: "ስልክ:",
        addressLabel: "አድራሻ:"
      }, 
       services: {
      heading: 'አገልግሎቶቻችን',
      description: 'እኛ ገዢዎችን፣ ሻጮችን እና ንብረት ባለቤቶችን ለሚረዱ የንብረት አገልግሎቶች አሰፋሰፋ እንሰጣለን።',
      propertyListings: {
        title: 'የንብረት ዝርዝሮች',
        desc: 'በዝርዝር መግለጫዎችና ምስሎች የተሞላ ተረጋጋ የንብረት ዝርዝሮችን እይታ ያድርጉ።'
      },
      propertyManagement: {
        title: 'የንብረት አስተዳደር',
        desc: 'የንብረት ዝርዝሮችዎን አስተዳደር ያድርጉ፣ ዝርዝሮችን ያዘምኑ እና ቦታዎችን ቀጥታ ተከታትሉ።'
      },
      advancedSearch: {
        title: 'የበለጠ ፍለጋ እና አማራጮች',
        desc: 'በአካባቢ፣ ዋጋ እና ተጨማሪ ማዕከላዊ አማራጮች የንብረት ፍለጋ አጠቃቀም።'
      },
      securePayment: {
        title: 'ደህንነታማ ክፍያ ሂደት',
        desc: 'በደህንነታማና ታማኝ የክፍያ መንገድ ቀላል ግብይቶችን አከናውን።'
      },
      customerSupport: {
        title: 'የደንበኞች ድጋፍ',
        desc: 'በቀን 24/7 በቅድሚያ ተዘጋጅቷ ያለ የደንበኞች ድጋፍ ቡድን እርዳታ ያግኙ።'
      }
    },
      dashboard: {
        title: "የአስተዳዳሪ ዳሽቦርድ",
        totalUsers: "ጠቅላላ ተጠቃሚዎች",
        totalProperties: "ጠቅላላ ንብረቶች",
        totalBookings: "ጠቅላላ ቦታ መያዣዎች",
        totalEarnings: "ጠቅላላ ገቢዎች",
        pendingApprovals: "በመጠባበቅ ላይ ያሉ እውዓቶች",
      },
      about: {
        title: "ስለ እኛ",
        intro: "...",
        missionTitle: "ተልዕኮች እኛ",
        mission: "...",
        whyTitle: "ለምን እኛን ይመርጣሉ?",
        why: {
          advancedSearch: "...",
          securePayment: "...",
          virtualTours: "...",
          notifications: "...",
          customerSupport: "..."
        }
      },

      faq: {
  title: "በተደጋጋሚ የሚጠየቁ ጥያቄዎች",
  q1: {
    question: "ይህ ፕሮጀክት ስለ ምንድን ነው?",
    answer: "ይህ ፕሮጀክት ተጠቃሚዎች መገለጫቸውን ማቆጣጠር፣ ከስርዓቱ ጋር መስተባበር፣ እና የተለያዩ አገልግሎቶችን ማግኘት የሚችሉበት መድረክ ነው። ይህ መድረክ ለሁሉም ተጠቃሚዎች ክፍት ነው።"
  },
  q2: {
    question: "መለያ እንዴት ማፍራት እችላለሁ?",
    answer: "መለያ ለመፍጠር በመነሻ ገፅ \"ይመዝገቡ\" የሚለውን ቁልፍ ይጫኑ እና ስምዎን፣ ኢሜይልዎን፣ እና የይለፍ ቃልዎን ያስገቡ።"
  },
  q3: {
    question: "መገለጫዬን እንዴት ማዘመን እችላለሁ?",
    answer: "የመገለጫ ገፅ በመጎብኘት ስም፣ ኢሜይል፣ ስልክ ቁጥር፣ እና የይለፍ ቃልዎን በማሻሻል መገለጫዎን ማዘመን ይችላሉ።"
  },
  q4: {
    question: "የይለፍ ቃል ረስቼዋለሁ፤ እንዴት እመለሳለሁ?",
    answer: "የይለፍ ቃልዎን ከረሱ ከሆነ \"የይለፍ ቃል ረስቼዋለሁ\" በሚለው አገናኝ ይጫኑ እና መመሪያውን ይከተሉ።"
  },
  q5: {
    question: "የFAQ ገፅን ማግኘት ማን ይችላል?",
    answer: "ማንም ተጠቃሚ የFAQ ገፅን ማግኘት ይችላል። የተለያዩ የተጠቃሚ ሚናዎች ላይ መገደብ የለም።"
  },
  q6: {
    question: "ድጋፍ ለማግኘት እንዴት እንችላለን?",
    answer: "\"አግኙን\" የሚለውን ገፅ በመጎብኘት ወይም support@yourproject.com በመላክ ድጋፍ ማግኘት ይችላሉ።"
  }
},
login: {
  title: "መግቢያ",
  email: "ኢሜይል",
  password: "የይለፍ ቃል",
  submit: "ግባ",
  noAccount: "መለያ የለዎትም?",
  register: "እዚህ ይመዝገቡ",
  errors: {
    failed: "መግቢያ አልተሳካም",
    unknownRole: "ያልታወቀ ሚና፣ መቅደም አይቻልም።",
    generic: "የተሳሳተ ነገር ተከስቷል። እባክዎ እንደገና ይሞክሩ።"
  }
},
register: {
  title: "መመዝገብ",
  name: "ስም",
  email: "ኢሜይል",
  phone: "ስልክ",
  password: "ፓስዎርድ",
  role: "አገልግሎት",
  customer: "ደንበኛ",
  owner: "ባለቤት",
  admin: "አስተዳዳሪ",
  submit: "መመዝገብ",
  errors: {
    failed: "መመዝገብ አልተቻለም",
    generic: "ስህተት ተከስቷል። እባኮትን እንደገና ሞክሩ።"
  },
  success: "መመዝገብ ተሳካ!"
},
navbar: {
  home: "መነሻ",
   title: "እንቅስቃሴ ንብረት",
  about: "ስለ እኛ",
  service: "አገልግሎት",
  pricing: "ዋጋ",
  contact: "አግኙን",
  faq: "ጥያቄዎች",
  login: "ግባ",
  register: "መመዝገብ",
  Realestate: "የንብረት አስተዳደር"
}


    }
  },

  om: {
    translation: {
      home: {
      findYourHome: "Mana Jaalalaa Kee Argadhu",
      filterType: "Filta Gosa",
      rent: "Qabaachuu",
      buy: "Bitachuu",
      sortBy: "Filadhu",
      priceAsc: "Gatii: Gadi irraa Olatti",
      priceDesc: "Gatii: Ol irraa Gadiitti",
      sizeAsc: "Guddaa: Xiqqoo irraa Guddatti",
      sizeDesc: "Guddaa: Guddaa irraa Xiqqootti",
      featuredProperties: "Mannoon Agarsiifamoo",
      errorLoading: "Mannoon hin argamne. Irra deebi'ii yeroo booda yaali.",
      viewDetails: "Daqiiqaa Ilaaluu",
      propertyImages: "Suura Mannoo",
      description: "Ibsa",
      propertyDetails: "Daqiiqaa Mannoo",
      featuresAmenities: "Qabiyyee & Qulqullina",
      contactBooking: "Qunnamtii & Qabachuu",
      status: "Haala",
      available: "Jiru",
      booked: "Qabame",
      availableFrom: "Jiru Eegalu",
      bookNow: "Amma Qabachuu",
      currentlyBooked: "Amma Qabame",
      close: "Cufuu",
      noProperties: "Mannoon filannoo keetii waliin walqabatu hin argamne",
      clearFilters: "Filannoo hunda haquu",
      bedrooms: "Warra Mana",
      bathrooms: "Mana Fincaanii",
      forRent: "Qabaachuuf",
      forSale: "Bitamuuf",
      beds: "Siree",
      baths: "Fincaanii",
      price: "Gatii",
      size: "Guddaa",
      yearBuilt: "Waggaa Ijaarame",
      condition: "Haala",
      features: "Qabiyyee",
      amenities: "Qulqullina",
      filterByRegion: "Filta Naannoo",
      filterByCity: "Filta Magaalaa",
      minPrice: "Gatii Xiqqaa",
      maxPrice: "Gatii Guddaa",
      sqm: "m²",
      property: "Mana"
    },
      contact: {
        title: "Nu qunnamaa",
        subtitle: "Gaaffii qabduu? Nuti isin gargaarruuf jirra.",
        name: "Maqaa",
        email: "Imeelii",
        message: "Ergaa",
        namePlaceholder: "Maqaa kee galchi",
        emailPlaceholder: "Imeelii kee galchi",
        messagePlaceholder: "Ergaa kee asitti barreessi...",
        submit: "Ergaa Ergi",
        processing: "Hojii irra jira...",
        submitStatus: {
          success: "Ergaan kee milkaa'inaan ergameera!",
          fail: "Ergaan hin ergamne.",
          error: "Dogoggorri uumame. Itti deebi’i yaali."
        },
        errors: {
          name: "Maqaan barbaachisaa dha",
          emailRequired: "Imeelii barbaachisaa dha",
          emailInvalid: "Imeelii sirrii galchi",
          message: "Ergaan barbaachisaa dha"
        },
        emailLabel: "Imeelii:",
        phoneLabel: "Bilbila:",
        addressLabel: "Teessoo:"
      }, 
      services: {
      heading: 'Tajaajiloota Keenya',
      description: 'Bittaa fi gurgurtaa fi abbootii qabeenyaaf tajaajiloota lafaaf bal’inaan kennina.',
      propertyListings: {
        title: 'Galmeewwan Qabeenya',
        desc: 'Galmeewwan qabeenya ragga’aan hedduu ibsa bal’aan fi suuraawwan waliin ilaali.'
      },
      propertyManagement: {
        title: 'Bulchiinsa Qabeenya',
        desc: 'Galmeewwan qabeenya kee too’achuuf, odeeffannoo haaraa galchuu fi hojiiwwan hordofuu salphisi.'
      },
      advancedSearch: {
        title: 'Barbaacha Olaanaa fi Filannoo',
        desc: 'Filannoon jabaa bakka, gatii fi dandeettiwwan irratti hundaa’uun qabeenya barbaadi.'
      },
      securePayment: {
        title: 'Galii Nagaa fi Amansiisaa',
        desc: 'Kufaatii malee gatii kaffaluuf karaa nageenya qabu fayyadami.'
      },
      customerSupport: {
        title: 'Deeggarsa Maamilaa',
        desc: 'Tajaajila maamilaa guyyaa guutuu sa’atii 24/7 argadhu.'
      }
    },

dashboard: {
        title: "Daashiboordii Adminii",
        totalUsers: "Waliigala Hirmaattota",
        totalProperties: "Waliigala Manoota",
        totalBookings: "Waliigala Fuudhamee",
        totalEarnings: "Waliigala Argannoo",
        pendingApprovals: "Hayyama Eeggataa",
      },
      about: {
        title: "Waa’ee Keenya",
        intro: "Sirna Bulchiinsa Teessoo keenyaaf baga nagaan dhuftan...",
        missionTitle: "Kaayyoo keenya",
        mission: "Waliigaltee qabeenya garaa garaa saffisaan, ifatti, fi sirriitti raawwachuu dha.",
        whyTitle: "Maaliif nu filatta?",
        why: {
          advancedSearch: "Barbaacha ciccimoo fi filannoo bal’oo.",
          securePayment: "Karoora kaffaltii nagaa fi salphaa.",
          virtualTours: "Daawwanna fageenyaa sirrii.",
          notifications: "Odeeffannoo yeroo dhugaa.",
          customerSupport: "Deeggarsa dhuunfaa fi gorsa filatamaa."
        }
      },
      faq: {
  title: "Gaaffilee Barbaachisoo Yeroo Hedduu Gaafataman",
  q1: {
    question: "Projektiin kun maal irratti hojjetaa jira?",
    answer: "Projektiin kun marsariitii itti fayyadamaan odeeffannoo isaa to’achuu, sirna waliin hojjechuu fi tajaajiloota garagaraa argachuu danda’u dha. Kun marsariitii itti namni kamiyyuu fayyadamu danda’u dha."
  },
  q2: {
    question: "Akkaataa itti account uumuu danda’u?",
    answer: "\"Sign Up\" jedhu tuqaa, maqaa, imeelii fi jecha iccitii kee galchi.",
  },
  q3: {
    question: "Akkaataa itti profile koo haaromsu danda’u?",
    answer: "Fuula profile dhaquun maqaa, imeelii, lakkoofsa bilbila fi jecha iccitii haaromsuu ni dandeessa.",
  },
  q4: {
    question: "Jecha iccitii koo irra deebi’uuf maal godha?",
    answer: "\"Jecha iccitii irra irra deebi'i\" jedhu cuqaasaa, gorsa hordofaa.",
  },
  q5: {
    question: "Fuula Gaaffii fi Deebii argachuu danda’u eenyu?",
    answer: "Namni kamiyyuu fuula kana daawwachuu danda’a. Ulaagaa hin jiru.",
  },
  q6: {
    question: "Tumsaa akkamitti argachuu danda’a?",
    answer: "Fuula \"Nu qunnamaa\" dhaquun ykn support@yourproject.com irratti barreessuun tumsaa ni argattu.",
  }
},
login: {
  title: "Seeni",
  email: "Imeelii",
  password: "Jecha iccitii",
  submit: "Seeni",
  noAccount: "Herregi hin jiru?",
  register: "Asitti galmaa’i",
  errors: {
    failed: "Seenuu hin dandeenye",
    unknownRole: "Gahee hin beekamne, gara fuula deemuu hin danda’u.",
    generic: "Dogoggorri uumame. Itti deebi’i yaali."
  }
},
register: {
  title: "galmee",
  name: "Maqaa",
  email: "imeelii",
  phone: "Bilbila",
  password: "lakkofsa icciitii",
  role: "Gahee",
  customer: "Maqaa",
  owner: "Abbaa qabeenyaa",
  admin: "Bulchaa",
  submit: "Ergaa",
  errors: {
    failed: "Galmeen hin milkoofne",
    generic: "Dogoggora ta'ee jira. Mee irra deebiin yaali."
  },
  success: "Galmee milkaa'eera!"
},

navbar: {
  home: "Mana",
  about: "Waa'ee",
  service: "Tajaajila",
  pricing: "Gatii",
  contact: "Nu qunnamaa",
  faq: "Gaaffii",
  login: "Seeni",
  register: "Galmee",
   title: "mannen jirenya walini",
}

    }
  }
};


i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
