
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  category: string;
  instructor: {
    name: string;
    avatar: string;
    role: string;
  };
  chapters: Chapter[];
  studentsCount: number;
  rating: number;
}

export interface UserProgress {
  userId: number;
  completedChapters: {
    [courseId: string]: number[];
  };
}

export const categories: Category[] = [
  {
    id: "beauty",
    name: "Beauty",
    description: "One powerful online software suite that combines",
    icon: "💅",
  },
  {
    id: "medical",
    name: "Medical",
    description: "One powerful online software suite that combines",
    icon: "🩺",
  },
  {
    id: "sports",
    name: "Sports",
    description: "One powerful online software suite that combines",
    icon: "⚽",
  },
  {
    id: "nutrition",
    name: "Nutrition",
    description: "One powerful online software suite that combines",
    icon: "🥗",
  },
  {
    id: "computer-science",
    name: "Computer Science",
    description: "One powerful online software suite that combines",
    icon: "💻",
  },
  {
    id: "english",
    name: "English",
    description: "One powerful online software suite that combines",
    icon: "📚",
  },
  {
    id: "social-science",
    name: "Social Science",
    description: "One powerful online software suite that combines",
    icon: "🌍",
  },
];

export const courses: Course[] = [
  {
    id: 1,
    title: "Math for Kids",
    description: "A fun and interactive course teaching basic math concepts to children in an engaging way.",
    coverImage: "/lovable-uploads/8d3eb5b5-23ef-4045-9111-f35ca340b661.png",
    category: "Computer Science",
    instructor: {
      name: "Lina",
      avatar: "/placeholder.svg",
      role: "Math Teacher"
    },
    chapters: [
      {
        id: 1,
        title: "Introduction to Numbers",
        description: "Learn about numbers and counting in a fun way.",
        videoUrl: "https://example.com/math-intro.mp4",
        duration: "10:30 mins"
      },
      {
        id: 2,
        title: "Addition Basics",
        description: "Learn how to add numbers together.",
        videoUrl: "https://example.com/math-addition.mp4",
        duration: "12:20 mins"
      },
      {
        id: 3,
        title: "Subtraction Basics",
        description: "Learn how to subtract numbers.",
        videoUrl: "https://example.com/math-subtraction.mp4",
        duration: "11:15 mins"
      }
    ],
    studentsCount: 120,
    rating: 4.8
  },
  {
    id: 2,
    title: "BM Data Science Professional Certificate",
    description: "A comprehensive data science course for beginners to professionals.",
    coverImage: "/placeholder.svg",
    category: "Computer Science",
    instructor: {
      name: "Ahmed",
      avatar: "/placeholder.svg",
      role: "Data Scientist"
    },
    chapters: [
      {
        id: 1,
        title: "Introduction to Data Science",
        description: "Learn the basics of data science.",
        videoUrl: "https://example.com/data-intro.mp4",
        duration: "15:30 mins"
      },
      {
        id: 2,
        title: "Python for Data Science",
        description: "Learn to use Python for data analysis.",
        videoUrl: "https://example.com/python-data.mp4",
        duration: "20:15 mins"
      }
    ],
    studentsCount: 530,
    rating: 4.9
  },
  {
    id: 3,
    title: "Simple Science",
    description: "Introduction to basic scientific concepts for beginners.",
    coverImage: "/placeholder.svg",
    category: "Science",
    instructor: {
      name: "Sara",
      avatar: "/placeholder.svg",
      role: "Science Teacher"
    },
    chapters: [
      {
        id: 1,
        title: "Matter and Energy",
        description: "Learn about the building blocks of our universe.",
        videoUrl: "https://example.com/science-matter.mp4",
        duration: "12:30 mins"
      }
    ],
    studentsCount: 210,
    rating: 4.7
  },
  {
    id: 4,
    title: "Python for Kids",
    description: "A fun introduction to Python programming for young learners.",
    coverImage: "/placeholder.svg",
    category: "Computer Science",
    instructor: {
      name: "Michael",
      avatar: "/placeholder.svg",
      role: "Programming Instructor"
    },
    chapters: [
      {
        id: 1,
        title: "Introduction to Python",
        description: "Learn the basics of Python programming.",
        videoUrl: "https://example.com/python-intro.mp4",
        duration: "10:45 mins"
      },
      {
        id: 2,
        title: "Variables and Data Types",
        description: "Understanding variables and types in Python.",
        videoUrl: "https://example.com/python-variables.mp4",
        duration: "13:20 mins"
      },
      {
        id: 3,
        title: "Control Structures",
        description: "Learn about if-else statements and loops.",
        videoUrl: "https://example.com/python-control.mp4",
        duration: "14:15 mins"
      }
    ],
    studentsCount: 345,
    rating: 4.9
  }
];

export const userProgress: UserProgress = {
  userId: 101,
  completedChapters: {
    "1": [1],
    "4": [1, 2]
  }
};

export const featuredCourses = courses.slice(0, 3);
export const recommendedCourses = [courses[0], courses[3], courses[2]];

// Helper function to calculate course progress
export const calculateCourseProgress = (courseId: number, userId: number = 101): number => {
  const course = courses.find(c => c.id === courseId);
  if (!course) return 0;
  
  const completedChapters = userProgress.completedChapters[courseId.toString()] || [];
  return Math.round((completedChapters.length / course.chapters.length) * 100);
};

// Helper function to mark a chapter as completed
export const markChapterAsCompleted = (courseId: number, chapterId: number, userId: number = 101): void => {
  if (!userProgress.completedChapters[courseId.toString()]) {
    userProgress.completedChapters[courseId.toString()] = [];
  }
  
  if (!userProgress.completedChapters[courseId.toString()].includes(chapterId)) {
    userProgress.completedChapters[courseId.toString()].push(chapterId);
  }
};

// Helper function to check if a chapter is completed
export const isChapterCompleted = (courseId: number, chapterId: number, userId: number = 101): boolean => {
  return (userProgress.completedChapters[courseId.toString()] || []).includes(chapterId);
};
