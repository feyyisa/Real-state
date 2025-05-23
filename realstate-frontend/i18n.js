import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      findYourHome: "Find Your Dream Home",
      searchLocation: "Search by Location...",
      filterType: "Filter by Type",
      filterStatus: "Filter by Status",
      sortBy: "Sort By",
      rent: "Rent",
      buy: "Buy",
      status: "Status",
      priceAsc: "Price: Low to High",
      priceDesc: "Price: High to Low",
      sizeAsc: "Size: Small to Large",
      sizeDesc: "Size: Large to Small",
      featuredProperties: "Featured Properties",
      loading: "Loading properties...",
      errorLoading: "Failed to load properties.",
      noProperties: "No properties found.",
      view: "View",
      price: "Price",
      type: "Type",
      size: "Size",
      close: "Close",
      

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
  register: "Register"
}

    }
  },

  am: {
    translation: {
      findYourHome: "የሕልምዎን ቤት ያግኙ",
      searchLocation: "በአካባቢ ፍለጋ...",
      filterType: "በአይነት አጣራ",
      filterStatus: "በሁኔታ አጣራ",
      sortBy: "መለያየት በ...",
      rent: "ኪራይ",
      buy: "ግዢ",
      status: "ሁኔታ",
      priceAsc: "ዋጋ: ከታነቀ እስከ ከፍተኛ",
      priceDesc: "ዋጋ: ከፍተኛ እስከ ታች",
      sizeAsc: "መጠን: ከትንሽ እስከ ትልቅ",
      sizeDesc: "መጠን: ከትልቅ እስከ ትንሽ",
      featuredProperties: "የተለዩ ንብረቶች",
      loading: "ንብረቶችን በመጫን ላይ...",
      errorLoading: "ንብረቶችን ማግኘት አልተቻለም።",
      noProperties: "ምንም ንብረት አልተገኘም።",
      view: "ይመልከቱ",
      price: "ዋጋ",
      type: "አይነት",
      size: "መጠን",
      close: "ዝጋ",
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
  about: "ስለ እኛ",
  service: "አገልግሎት",
  pricing: "ዋጋ",
  contact: "አግኙን",
  faq: "ጥያቄዎች",
  login: "ግባ",
  register: "መመዝገብ"
}


    }
  },

  om: {
    translation: {
      findYourHome: "Mana Abjuu Kee Argadhu",
      searchLocation: "Bakkee barbaadi...",
      filterType: "Gosa Filla",
      filterStatus: "Haala Filla",
      sortBy: "Sirreeffama",
      rent: "Kira",
      buy: "Bitii",
      status: "Haala",
      priceAsc: "Gatii: Irraa gadi gara ol",
      priceDesc: "Gatii: Irraa ol gara gadi",
      sizeAsc: "Guddaa: Xixiqqaa gara guddaa",
      sizeDesc: "Guddaa: Guddaa gara xixiqqaa",
      featuredProperties: "Teessoo filatamoo",
      loading: "Teessoo fe’amaa jiru...",
      errorLoading: "Teessoo fe’uu hin dandeenye.",
      noProperties: "Teessoo hin argamne.",
      view: "Dubbisi",
      price: "Gatii",
      type: "Gosa",
      size: "Guddaa",
      close: "Cufi",

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
  register: "Galmee"
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
