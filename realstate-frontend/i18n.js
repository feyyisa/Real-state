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
