interface DemoTypes {
  link: string;
  img: string | any;
  name: string;
  type: boolean;
  include: string;
}

const Demos: DemoTypes[] = [
  {
    type: true,
    img: "/images/landingpage/demos/demo-main.jpg",
    name: "Main",
    link: "https://matdash-nextjs-main.vercel.app",
    include: "Demo",
  },
  {
    type: true,
    img: "/images/landingpage/demos/demo-default.jpg",
    name: "Default Sidebar",
    link: "https://matdash-nextjs-default.vercel.app",
    include: "Demo",
  },
  {
    type: true,
    img: "/images/landingpage/demos/demo-dark.jpg",
    name: "Horizontal",
    link: "https://matdash-nextjs-horizontal.vercel.app",
    include: "Demo",
  },
  {
    type: true,
    img: "/images/landingpage/demos/demo-mini.jpg",
    name: "Minisidebar",
    link: "https://matdash-nextjs-minisidebar.vercel.app/",
    include: "Demo",
  },
  {
    type: true,
    img: "/images/landingpage/demos/demo-rtl.jpg",
    name: "RTL",
    link: "https://matdash-nextjs-rtl.vercel.app/dashboards/dashboard2",
    include: "Demo",
  },

  {
    type: true,
    img: "/images/landingpage/demos/demo-dark.jpg",
    name: "Dark",
    link: "https://matdash-nextjs-dark.vercel.app/dashboards/dashboard2",
    include: "Demo",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-calendar.jpg",
    name: "Calandar App",
    link: "/apps/calendar",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-chat.jpg",
    name: "Chat App",
    link: "/apps/chats",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-contact.jpg",
    name: "Contact App",
    link: "/apps/contacts",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-user-profile.jpg",
    name: "User Profile App",
    link: "/apps/user-profile/profile",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-note.jpg",
    name: "Notes App",
    link: "/apps/notes",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-blog.jpg",
    name: "Blog App",
    link: "/apps/blog/posts",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-blog-detail.jpg",
    name: "Blog Detail App",
    link: "/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-shop.jpg",
    name: "eCommerce Shop App",
    link: "/apps/ecommerce/shop",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-product-detail.jpg",
    name: "eCommerce Product Detail App",
    link: "/apps/ecommerce/detail/1",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-productlist.jpg",
    name: "eCommerce Product List App",
    link: "/apps/ecommerce/list",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-invoice.jpg",
    name: "Invoice App",
    link: "/apps/invoice/list",
    include: "Application",
  },
  {
    type: false,
    img: "/images/landingpage/apps/app-kanban.jpg",
    name: "Kanban App",
    link: "/apps/kanban",
    include: "Application",
  },
];

interface ListFeatureTypes {
  featureicon: string;
  title: string;
  subtitle: string;
}

const listFeature: ListFeatureTypes[] = [
  {
    featureicon: "solar:filters-bold-duotone",
    title: "6 Theme Colors",
    subtitle: "matdash Admin comes with 6 pre-defined theme colors.",
  },
  {
    featureicon: "solar:text-field-bold-duotone",
    title: "3400+ Font Icons",
    subtitle: "The matdash Admin package includes numerous icon fonts.",
  },
  {
    featureicon: "solar:calendar-mark-bold-duotone",
    title: "Calendar Design",
    subtitle: "Our package includes a well-designed calendar.",
  },
  {
    featureicon: "solar:presentation-graph-broken",
    title: "4+ Frontend Pages",
    subtitle: "We have added useful frontend pages with Matdash Admin",
  },
  {
    featureicon: "solar:refresh-circle-bold-duotone",
    title: "Regular Updates",
    subtitle: "We continuously enhance our pack with new features.",
  },
  {
    featureicon: "solar:widget-4-bold-duotone",
    title: "90+ Page Templates",
    subtitle:
      "Indeed, we offer 6 demos, each featuring over 90+ pages, to simplify the process.",
  },
  {
    featureicon: "solar:widget-6-bold-duotone",
    title: "45+ UI Components",
    subtitle: "The matdash Admin Pack includes nearly 45 UI components.",
  },
  {
    featureicon: "solar:text-underline-circle-bold",
    title: "Tailwind",
    subtitle: "It is built using Tailwind, a robust UI component framework.",
  },
  {
    featureicon: "solar:smartphone-rotate-angle-bold",
    title: "Flowbite React",
    subtitle:
      "A utility-first CSS framework and UI component library for React applications.",
  },

  {
    featureicon: "solar:fire-square-bold-duotone",
    title: "Firebase",
    subtitle:
      "offer robust real-time database capabilities, authentication, and additional features.",
  },
  {
    featureicon: "solar:database-bold-duotone",
    title: "SWR",
    subtitle:
      "Swr provides a highly optimized way to fetch, cache, and update data in real-time applications.",
  },
  {
    featureicon: "solar:tag-bold-duotone",
    title: "i18 React",
    subtitle:
      "react-i18 is a robust framework for internationalization in React applications.",
  },

  {
    featureicon: "solar:lock-keyhole-minimalistic-unlocked-bold",
    title: "Next-Auth",
    subtitle:
      "We have integrated Google, GitHub, and Credential providers with NextAuth.",
  },

  {
    featureicon: "solar:layers-bold-duotone",
    title: "Lots of Table Examples",
    subtitle: "Tables are a fundamental requirement, and we've included them",
  },

  {
    featureicon: "solar:notes-minimalistic-bold-duotone",
    title: "Detailed Documentation",
    subtitle:
      "We have created comprehensive documentation to make usage straightforward.",
  },

  {
    featureicon: "solar:users-group-two-rounded-bold",
    title: "Dedicated Support",
    subtitle:
      "We believe that exceptional support is essential, and we provide it.",
  },
  {
    featureicon: "solar:chart-square-bold-duotone",
    title: "Lots of Chart Options",
    subtitle:
      "With ApexCharts, we offer a wide variety of chart options if you can name it, we likely have it.",
  },
];

/*User Review Section*/

interface UserReviewTypes {
  img: any;
  review: string;
  title: string;
  subtitle: string;
}
const userReview: UserReviewTypes[] = [
  {
    img: "/images/profile/user-4.jpg",
    title: "Eminson Mendoza",
    subtitle: "Features avaibility",
    review:
      "This template is great, UI-rich and up-to-date. Although it is pretty much complete, I suggest to improve a bit of documentation. Thanks & Highly recomended!",
  },
  {
    img: "/images/profile/user-2.jpg",
    title: "Jenny Wilson",
    subtitle: "Features avaibility",
    review:
      "The dashboard template from adminmart has helped me provide a clean and sleek look to my dashboard and made it look exactly the way I wanted it to, mainly without having.",
  },
  {
    img: "/images/profile/user-3.jpg",
    title: "Minshan Cui",
    subtitle: "Features avaibility",
    review:
      "The quality of design is excellent, customizability and flexibility much better than the other products available in the market.I strongly recommend the AdminMart to other.",
  },
  {
    img: "/images/profile/user-4.jpg",
    title: "Eminson Mendoza",
    subtitle: "Features avaibility",
    review:
      "This template is great, UI-rich and up-to-date. Although it is pretty much complete, I suggest to improve a bit of documentation. Thanks & Highly recomended!",
  },
  {
    img: "/images/profile/user-2.jpg",
    title: "Jenny Wilson",
    subtitle: "Features avaibility",
    review:
      "The dashboard template from adminmart has helped me provide a clean and sleek look to my dashboard and made it look exactly the way I wanted it to, mainly without having.",
  },
  {
    img: "/images/profile/user-3.jpg",
    title: "Minshan Cui",
    subtitle: "Features avaibility",
    review:
      "The quality of design is excellent, customizability and flexibility much better than the other products available in the market.I strongly recommend the AdminMart to other.",
  },
  {
    img: "/images/profile/user-4.jpg",
    title: "Eminson Mendoza",
    subtitle: "Features avaibility",
    review:
      "This template is great, UI-rich and up-to-date. Although it is pretty much complete, I suggest to improve a bit of documentation. Thanks & Highly recomended!",
  },
  {
    img: "/images/profile/user-2.jpg",
    title: "Jenny Wilson",
    subtitle: "Features avaibility",
    review:
      "The dashboard template from adminmart has helped me provide a clean and sleek look to my dashboard and made it look exactly the way I wanted it to, mainly without having.",
  },
];

interface DemosMegaMenuTypes {
  img: any;
  name: string;
  link: string;
  include: string;
}

/*Demos Megamenu*/
const demosMegamenu: DemosMegaMenuTypes[] = [
  {
    img: "/images/landingpage/demos/demo-main.jpg",
    name: "Main",
    link: "https://matdash-nextjs-main.vercel.app/dashboards/dashboard1",
    include: "",
  },
  {
    img: "/images/landingpage/demos/demo-default.jpg",
    name: "Default",
    link: "https://matdash-nextjs-default.vercel.app/dashboards/dashboard1",
    include: "",
  },
  {
    img: "/images/landingpage/demos/demo-dark.jpg",
    name: "Horizontal",
    link: "https://matdash-nextjs-horizontal.vercel.app/dashboards/dashboard1",
    include: "",
  },
  {
    img: "/images/landingpage/demos/demo-mini.jpg",
    name: "Minisidebar",
    link: "https://matdash-nextjs-minisidebar.vercel.app/dashboards/dashboard1",
    include: "",
  },
  {
    img: "/images/landingpage/demos/demo-rtl.jpg",
    name: "RTL",
    link: "https://matdash-nextjs-rtl.vercel.app/dashboards/dashboard2",
    include: "",
  },
];

const FrontMenu: DemosMegaMenuTypes[] = [
  {
    img: "/images/landingpage/front-pages/front-homepage.jpg",
    name: "Homepage",
    link: "/frontend-pages/homepage",
    include: "Frontend Pages",
  },
  {
    img: "/images/landingpage/front-pages/front-aboutus.jpg",
    name: "About Us",
    link: "/frontend-pages/aboutus",
    include: "Frontend Pages",
  },
  {
    img: "/images/landingpage/front-pages/front-contactus.jpg",
    name: "Contact Us",
    link: "/frontend-pages/contact",
    include: "Frontend Pages",
  },
  {
    img: "/images/landingpage/front-pages/front-portfolio.jpg",
    name: "Portfolio",
    link: "/frontend-pages/portfolio",
    include: "Frontend Pages",
  },
  {
    img: "/images/landingpage/front-pages/front-pricing.jpg",
    name: "Pricing",
    link: "/frontend-pages/pricing",
    include: "Frontend Pages",
  },
  {
    img: "/images/landingpage/front-pages/front-blog.jpg",
    name: "Blog",
    link: "/frontend-pages/blog",
    include: "Frontend Pages",
  },
];

const appsMegamenu: DemosMegaMenuTypes[] = [
  {
    img: "/images/landingpage/apps/app-calendar.jpg",
    name: "Calandar App",
    link: "/apps/calendar",
    include: "",
  },
  {
    img: "/images/landingpage/apps/app-chat.jpg",
    name: "Chat App",
    link: "/apps/chats",
    include: "",
  },
  {
    img: "/images/landingpage/apps/app-contact.jpg",
    name: "Contact App",
    link: "/apps/contacts",
    include: "",
  },
  {
    img: "/images/landingpage/apps/app-user-profile.jpg",
    name: "User Profile App",
    link: "/apps/user-profile/profile",
    include: "",
  },
  {
    img: "/images/landingpage/apps/app-note.jpg",
    name: "Notes App",
    link: "/apps/notes",
    include: "",
  },
];

export {
  Demos,
  listFeature,
  userReview,
  demosMegamenu,
  appsMegamenu,
  FrontMenu,
};
