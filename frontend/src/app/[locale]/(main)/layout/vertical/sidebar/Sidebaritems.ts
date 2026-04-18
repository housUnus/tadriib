export interface ChildItem {
  disabled?: any;
  badge?: boolean;
  badgeType?: string;
  badgeContent?: string;
  id?: number | string;
  name?: string;
  icon?: any;
  children?: ChildItem[];
  item?: any;
  url?: any;
  color?: string;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: any;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: any;
  isHidden?: boolean;
}

import { uniqueId } from "lodash";

const SidebarContent: MenuItem[] = [
  {
    id: 1,
    name: "Instructor",
    items: [
      {
        heading: "Instructor",
        children: [
          {
            name: "Dashboard",
            icon: "solar:home-2-line-duotone",
            id: uniqueId(),
            url: "/instructor/dashboard",
          },
          {
            name: "Courses",
            icon: "solar:book-2-line-duotone",
            id: uniqueId(),
            url: "/instructor/courses",
          },
          {
            name: "Add New Course",
            icon: "solar:add-circle-line-duotone",
            id: uniqueId(),
            url: "/instructor/create-course",
          },
          {
            name: "Performance",
            icon: "solar:chart-2-line-duotone",
            id: uniqueId(),
            url: "instructor/performance",
          },
          {
            name: "Students",
            icon: "solar:users-group-rounded-line-duotone",
            id: uniqueId(),
            url: "instructor/students",
          },
          {
            name: "Sales",
            icon: "solar:wallet-money-line-duotone",
            id: uniqueId(),
            url: "instructor/sales",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "Learner",
    items: [
      {
        heading: "Learner",
        children: [
          {
            name: "Performance",
            id: uniqueId(),
            url: "/account/performance",
            icon: "solar:chart-2-line-duotone",
          },
          {
            name: "My Courses",
            id: uniqueId(),
            url: "/account/my-courses",
            icon: "solar:book-bookmark-line-duotone",
          },
          {
            name: "Suggested Courses",
            id: uniqueId(),
            url: "/account/suggested-courses",
            icon: "solar:lightbulb-line-duotone",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "Tools",
    items: [
      {
        heading: "Tools",
        children: [
          {
            name: "Settings",
            id: uniqueId(),
            url: "/account/settings",
            icon: "solar:settings-line-duotone",
          },
          {
            name: "Help",
            id: uniqueId(),
            url: "/help",
            icon: "solar:question-circle-line-duotone",
          },
          {
            name: "Blog",
            id: uniqueId(),
            url: "blog",
            icon: "solar:document-text-line-duotone",
          },
        ],
      },
    ],
  },
];
export default SidebarContent;


export const STUDENT_SECTIONS = ['Learner', 'Tools']
export const TEACHER_SECTIONS = ['Instructor', 'Tools']