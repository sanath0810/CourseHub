// Mock data for the frontend-only demo
import { generateCourses } from './videoPool';

export const MOCK_COURSES = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn React from scratch with hands-on projects and real-world examples.',
    thumbnail: null,
    price: 99.99,
    category: 'Web Development',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 150,
    createdAt: '2024-01-15T00:00:00.000Z',
    modules: [
      {
        id: 1,
        title: 'Introduction to React',
        description: 'Getting started with React',
        orderIndex: 1,
        lessons: [
          {
            id: 1,
            title: 'What is React?',
            type: 'video',
            duration: 300,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM'
          },
          {
            id: 2,
            title: 'Setting up React Environment',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk'
          },
          {
            id: 3,
            title: 'Your First React App',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8'
          },
          {
            id: 4,
            title: 'Understanding JSX',
            type: 'video',
            duration: 420,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/7fPXI_MnBOY'
          },
          {
            id: 5,
            title: 'React Development Tools',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/DLX62G4lc44'
          }
        ]
      },
      {
        id: 2,
        title: 'Components and Props',
        description: 'Understanding React components',
        orderIndex: 2,
        lessons: [
          {
            id: 6,
            title: 'Creating Components',
            type: 'video',
            duration: 450,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Y2hgEGPzTZY'
          },
          {
            id: 7,
            title: 'Props and State',
            type: 'video',
            duration: 600,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/IYvD9oBCuJI'
          },
          {
            id: 8,
            title: 'Component Lifecycle',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/Oioo0IdoEls'
          },
          {
            id: 9,
            title: 'Event Handling',
            type: 'video',
            duration: 390,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/Znqv84xi8Vs'
          },
          {
            id: 10,
            title: 'Conditional Rendering',
            type: 'video',
            duration: 330,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/7o5FPaVA9m0'
          }
        ]
      },
      {
        id: 3,
        title: 'State Management',
        description: 'Managing state in React applications',
        orderIndex: 3,
        lessons: [
          {
            id: 11,
            title: 'useState Hook',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0'
          },
          {
            id: 12,
            title: 'useEffect Hook',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/0ZJgIjIuY7U'
          },
          {
            id: 13,
            title: 'useContext Hook',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/5LrDIWkK_Bc'
          },
          {
            id: 14,
            title: 'Custom Hooks',
            type: 'video',
            duration: 510,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/6ThXsUwLWvc'
          },
          {
            id: 15,
            title: 'State Best Practices',
            type: 'video',
            duration: 390,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/1VVfMVQdx5M'
          }
        ]
      },
      {
        id: 4,
        title: 'Advanced React Concepts',
        description: 'Advanced patterns and techniques',
        orderIndex: 4,
        lessons: [
          {
            id: 16,
            title: 'React Router',
            type: 'video',
            duration: 600,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Law7wfdg_ls'
          },
          {
            id: 17,
            title: 'Form Handling',
            type: 'video',
            duration: 450,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/SdzMBWT2CDQ'
          },
          {
            id: 18,
            title: 'API Integration',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/cuEtnrL9-H0'
          },
          {
            id: 19,
            title: 'Performance Optimization',
            type: 'video',
            duration: 480,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/uojLJFt9SzY'
          },
          {
            id: 20,
            title: 'Testing React Apps',
            type: 'video',
            duration: 420,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/8Xwq35cPwYg'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Master advanced JavaScript concepts including ES6+, async programming, and design patterns.',
    thumbnail: null,
    price: 149.99,
    category: 'Web Development',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 89,
    createdAt: '2024-01-10T00:00:00.000Z',
    modules: [
      {
        id: 5,
        title: 'ES6+ Features',
        description: 'Modern JavaScript features',
        orderIndex: 1,
        lessons: [
          {
            id: 21,
            title: 'Arrow Functions',
            type: 'video',
            duration: 240,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/h33Srr5J9nY'
          },
          {
            id: 22,
            title: 'Destructuring',
            type: 'video',
            duration: 300,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/NIq3qLaHCIs'
          },
          {
            id: 23,
            title: 'Template Literals',
            type: 'video',
            duration: 180,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/NgF9-pdTDGs'
          },
          {
            id: 24,
            title: 'Spread and Rest Operators',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/iLx4ma8ZqvQ'
          },
          {
            id: 25,
            title: 'Modules Import/Export',
            type: 'video',
            duration: 420,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/cRHQNNcYf6s'
          }
        ]
      },
      {
        id: 6,
        title: 'Async Programming',
        description: 'Promises, async/await, and asynchronous patterns',
        orderIndex: 2,
        lessons: [
          {
            id: 26,
            title: 'Understanding Promises',
            type: 'video',
            duration: 480,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/DHvZLI7Db8E'
          },
          {
            id: 27,
            title: 'Async/Await',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/V_Kr9OSfDeU'
          },
          {
            id: 28,
            title: 'Fetch API',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/cuEtnrL9-H0'
          },
          {
            id: 29,
            title: 'Error Handling',
            type: 'video',
            duration: 240,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/Pv1tulWR3ck'
          },
          {
            id: 30,
            title: 'Promise Chaining',
            type: 'video',
            duration: 330,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/s6SH72uAn3Q'
          }
        ]
      },
      {
        id: 7,
        title: 'Advanced Functions',
        description: 'Closures, higher-order functions, and functional programming',
        orderIndex: 3,
        lessons: [
          {
            id: 31,
            title: 'Closures Explained',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/3a0I8ICR1Vg'
          },
          {
            id: 32,
            title: 'Higher-Order Functions',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/BMUiFMZr7vk'
          },
          {
            id: 33,
            title: 'Map, Filter, Reduce',
            type: 'video',
            duration: 480,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/rRgD1yVwIvE'
          },
          {
            id: 34,
            title: 'Function Composition',
            type: 'video',
            duration: 300,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/sFTGEs2WXQ4'
          },
          {
            id: 35,
            title: 'Currying and Partial Application',
            type: 'video',
            duration: 390,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/iZLP4qOwY8I'
          }
        ]
      },
      {
        id: 8,
        title: 'Design Patterns',
        description: 'Common JavaScript design patterns and best practices',
        orderIndex: 4,
        lessons: [
          {
            id: 36,
            title: 'Module Pattern',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/HkFlM73G-hk'
          },
          {
            id: 37,
            title: 'Observer Pattern',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/_BpmfnqjgzQ'
          },
          {
            id: 38,
            title: 'Factory Pattern',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/kuirGzhGhyw'
          },
          {
            id: 39,
            title: 'Singleton Pattern',
            type: 'video',
            duration: 240,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/sJ-c3BA-Ypo'
          },
          {
            id: 40,
            title: 'MVC Pattern',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/DUg2SWWK18I'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design.',
    thumbnail: null,
    price: 79.99,
    category: 'Design',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 203,
    createdAt: '2024-01-05T00:00:00.000Z',
    modules: [
      {
        id: 9,
        title: 'Design Fundamentals',
        description: 'Basic design principles',
        orderIndex: 1,
        lessons: [
          {
            id: 41,
            title: 'Color Theory',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Qj1FK8n7WgY'
          },
          {
            id: 42,
            title: 'Typography',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/sByzHoiYFX0'
          },
          {
            id: 43,
            title: 'Layout and Composition',
            type: 'video',
            duration: 480,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/a5KYlHNKQB8'
          },
          {
            id: 44,
            title: 'Visual Hierarchy',
            type: 'video',
            duration: 300,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/qZWDJqY27bw'
          },
          {
            id: 45,
            title: 'Design Systems',
            type: 'video',
            duration: 540,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/wc5krSHtFP4'
          }
        ]
      },
      {
        id: 10,
        title: 'User Experience Basics',
        description: 'Understanding user needs and behavior',
        orderIndex: 2,
        lessons: [
          {
            id: 46,
            title: 'User Research Methods',
            type: 'video',
            duration: 450,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Ovj4hFxko7c'
          },
          {
            id: 47,
            title: 'Creating User Personas',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/XnG4c4gXaQY'
          },
          {
            id: 48,
            title: 'User Journey Mapping',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/mSxpVRo3BLg'
          },
          {
            id: 49,
            title: 'Information Architecture',
            type: 'video',
            duration: 390,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/ka1d3YP8lVc'
          },
          {
            id: 50,
            title: 'Wireframing Basics',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/qpH7-KFWZRI'
          }
        ]
      },
      {
        id: 11,
        title: 'Interface Design',
        description: 'Creating beautiful and functional interfaces',
        orderIndex: 3,
        lessons: [
          {
            id: 51,
            title: 'UI Design Principles',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/RFv53AxxQAo'
          },
          {
            id: 52,
            title: 'Button and Form Design',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/YiLUYf4HDh4'
          },
          {
            id: 53,
            title: 'Navigation Design',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/MqQdZMhf7EU'
          },
          {
            id: 54,
            title: 'Mobile UI Patterns',
            type: 'video',
            duration: 450,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/WZQNb01oNvs'
          },
          {
            id: 55,
            title: 'Responsive Design',
            type: 'video',
            duration: 540,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/srvUrASNdxk'
          }
        ]
      },
      {
        id: 12,
        title: 'Design Tools and Prototyping',
        description: 'Using design tools and creating prototypes',
        orderIndex: 4,
        lessons: [
          {
            id: 56,
            title: 'Figma Basics',
            type: 'video',
            duration: 600,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8'
          },
          {
            id: 57,
            title: 'Creating Interactive Prototypes',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/X5qiBwqptek'
          },
          {
            id: 58,
            title: 'Design Handoff',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/LpVV_R7oh3s'
          },
          {
            id: 59,
            title: 'Usability Testing',
            type: 'video',
            duration: 420,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/v8JJrDvQDF4'
          },
          {
            id: 60,
            title: 'Design Iteration',
            type: 'video',
            duration: 360,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/XRd6Ddn4ZSY'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Data Science with Python',
    description: 'Complete guide to data science using Python, pandas, and machine learning.',
    thumbnail: null,
    price: 199.99,
    category: 'Data Science',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 67,
    createdAt: '2024-01-20T00:00:00.000Z',
    modules: [
      {
        id: 13,
        title: 'Python Basics',
        description: 'Introduction to Python for data science',
        orderIndex: 1,
        lessons: [
          {
            id: 61,
            title: 'Python Environment Setup',
            type: 'video',
            duration: 180,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw'
          },
          {
            id: 62,
            title: 'Data Types and Structures',
            type: 'video',
            duration: 300,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/khKv-8q7YmY'
          },
          {
            id: 63,
            title: 'Control Flow and Functions',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/DlkMs4ZHHr8'
          },
          {
            id: 64,
            title: 'File Handling and Modules',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/Uh2ebFW8OYM'
          },
          {
            id: 65,
            title: 'Error Handling and Debugging',
            type: 'video',
            duration: 240,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/NIWwJbo-9_8'
          }
        ]
      },
      {
        id: 14,
        title: 'Data Analysis with Pandas',
        description: 'Working with data using pandas library',
        orderIndex: 2,
        lessons: [
          {
            id: 66,
            title: 'Introduction to Pandas',
            type: 'video',
            duration: 480,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg'
          },
          {
            id: 67,
            title: 'DataFrames and Series',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/e60ItwlZTKM'
          },
          {
            id: 68,
            title: 'Data Cleaning and Preprocessing',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/bDhvCp3_lYw'
          },
          {
            id: 69,
            title: 'Data Aggregation and Grouping',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/txMdrV1Ut64'
          },
          {
            id: 70,
            title: 'Merging and Joining Data',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/h4hOPGo4UVU'
          }
        ]
      },
      {
        id: 15,
        title: 'Data Visualization',
        description: 'Creating charts and graphs with matplotlib and seaborn',
        orderIndex: 3,
        lessons: [
          {
            id: 71,
            title: 'Matplotlib Basics',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/UO98lJQ3QGI'
          },
          {
            id: 72,
            title: 'Advanced Plotting Techniques',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/a9UrKTVEeZA'
          },
          {
            id: 73,
            title: 'Seaborn for Statistical Plots',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/6GUZXDef2U0'
          },
          {
            id: 74,
            title: 'Interactive Visualizations',
            type: 'video',
            duration: 540,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/hSPmj7mK6ng'
          },
          {
            id: 75,
            title: 'Dashboard Creation',
            type: 'video',
            duration: 600,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/7yAw1nPareM'
          }
        ]
      },
      {
        id: 16,
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to machine learning with scikit-learn',
        orderIndex: 4,
        lessons: [
          {
            id: 76,
            title: 'ML Concepts and Types',
            type: 'video',
            duration: 480,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU'
          },
          {
            id: 77,
            title: 'Linear Regression',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/7ArmBVF2dCs'
          },
          {
            id: 78,
            title: 'Classification Algorithms',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/yIYKR4sgzI8'
          },
          {
            id: 79,
            title: 'Model Evaluation and Validation',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/fSytzGwwBVw'
          },
          {
            id: 80,
            title: 'Feature Engineering',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/6WDFfaYtN6s'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Digital Marketing Strategy',
    description: 'Learn how to create and execute effective digital marketing campaigns.',
    thumbnail: null,
    price: 129.99,
    category: 'Marketing',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 134,
    createdAt: '2024-01-12T00:00:00.000Z',
    modules: [
      {
        id: 17,
        title: 'Marketing Fundamentals',
        description: 'Basic marketing concepts',
        orderIndex: 1,
        lessons: [
          {
            id: 81,
            title: 'Understanding Your Audience',
            type: 'video',
            duration: 240,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/naIkpQ_cIt0'
          },
          {
            id: 82,
            title: 'Content Strategy',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/B_2_3q8A8nE'
          },
          {
            id: 83,
            title: 'Brand Development',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/iVRou3ctMxU'
          },
          {
            id: 84,
            title: 'Market Research',
            type: 'video',
            duration: 300,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/fVcQsS9x2N4'
          },
          {
            id: 85,
            title: 'Competitive Analysis',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/MqQdZMhf7EU'
          }
        ]
      },
      {
        id: 18,
        title: 'Social Media Marketing',
        description: 'Leveraging social platforms for marketing',
        orderIndex: 2,
        lessons: [
          {
            id: 86,
            title: 'Social Media Strategy',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/R1ZVZh_pvfQ'
          },
          {
            id: 87,
            title: 'Facebook and Instagram Marketing',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/ohBN2wriDyw'
          },
          {
            id: 88,
            title: 'Twitter and LinkedIn Marketing',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/BHK1uFpVy-w'
          },
          {
            id: 89,
            title: 'Content Creation for Social Media',
            type: 'video',
            duration: 540,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/8b9Xq7Dq-wM'
          },
          {
            id: 90,
            title: 'Social Media Analytics',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/gvTNl6InKss'
          }
        ]
      },
      {
        id: 19,
        title: 'Email Marketing',
        description: 'Building and managing email campaigns',
        orderIndex: 3,
        lessons: [
          {
            id: 91,
            title: 'Email Marketing Basics',
            type: 'video',
            duration: 300,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/YQiQMhJGNYE'
          },
          {
            id: 92,
            title: 'Building Email Lists',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/gEBUU6QfVzs'
          },
          {
            id: 93,
            title: 'Email Design and Templates',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/BKKcGb80MjQ'
          },
          {
            id: 94,
            title: 'Automation and Sequences',
            type: 'video',
            duration: 480,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/E_eIqGSLh6s'
          },
          {
            id: 95,
            title: 'Email Analytics and Optimization',
            type: 'video',
            duration: 240,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/wKJ9KzGQq0w'
          }
        ]
      },
      {
        id: 20,
        title: 'Digital Advertising',
        description: 'Paid advertising strategies and platforms',
        orderIndex: 4,
        lessons: [
          {
            id: 96,
            title: 'Google Ads Fundamentals',
            type: 'video',
            duration: 540,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/MvkodlMcklM'
          },
          {
            id: 97,
            title: 'Facebook Ads Manager',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/lbKRoSPlQ5c'
          },
          {
            id: 98,
            title: 'Display and Video Advertising',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/BKKcGb80MjQ'
          },
          {
            id: 99,
            title: 'Campaign Optimization',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/gvTNl6InKss'
          },
          {
            id: 100,
            title: 'ROI and Performance Tracking',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/wKJ9KzGQq0w'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Photography Masterclass',
    description: 'Professional photography techniques for beginners and intermediate photographers.',
    thumbnail: null,
    price: 89.99,
    category: 'Photography',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 98,
    createdAt: '2024-01-08T00:00:00.000Z',
    modules: [
      {
        id: 21,
        title: 'Camera Basics',
        description: 'Understanding your camera',
        orderIndex: 1,
        lessons: [
          {
            id: 101,
            title: 'Camera Settings',
            type: 'video',
            duration: 300,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/V7z7BAZdt2M'
          },
          {
            id: 102,
            title: 'Composition Rules',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/7ZVyNjKSr0M'
          },
          {
            id: 103,
            title: 'Understanding Exposure',
            type: 'video',
            duration: 480,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/F8T94sdiNjc'
          },
          {
            id: 104,
            title: 'Focus and Depth of Field',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/34HBcGjsSWs'
          },
          {
            id: 105,
            title: 'Camera Modes Explained',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/M6lGth6B8NY'
          }
        ]
      },
      {
        id: 22,
        title: 'Lighting Techniques',
        description: 'Mastering natural and artificial lighting',
        orderIndex: 2,
        lessons: [
          {
            id: 106,
            title: 'Natural Light Photography',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/1xgCoJbDPTE'
          },
          {
            id: 107,
            title: 'Golden Hour and Blue Hour',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/3_LEAey5_Ys'
          },
          {
            id: 108,
            title: 'Studio Lighting Setup',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/Qe10ExwzCqk'
          },
          {
            id: 109,
            title: 'Flash Photography',
            type: 'video',
            duration: 480,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/dmGh4yiiuSs'
          },
          {
            id: 110,
            title: 'Light Modifiers and Reflectors',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/VL6-MsZdHmA'
          }
        ]
      },
      {
        id: 23,
        title: 'Portrait Photography',
        description: 'Capturing stunning portraits',
        orderIndex: 3,
        lessons: [
          {
            id: 111,
            title: 'Portrait Composition',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/kmi9TPQ57Mo'
          },
          {
            id: 112,
            title: 'Posing Techniques',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/ff7nltdBCHs'
          },
          {
            id: 113,
            title: 'Working with Models',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/Qe10ExwzCqk'
          },
          {
            id: 114,
            title: 'Environmental Portraits',
            type: 'video',
            duration: 390,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/1xgCoJbDPTE'
          },
          {
            id: 115,
            title: 'Headshot Photography',
            type: 'video',
            duration: 540,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/dmGh4yiiuSs'
          }
        ]
      },
      {
        id: 24,
        title: 'Post-Processing and Editing',
        description: 'Enhancing your photos with editing software',
        orderIndex: 4,
        lessons: [
          {
            id: 116,
            title: 'Lightroom Basics',
            type: 'video',
            duration: 600,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/SYeqJTwZWL4'
          },
          {
            id: 117,
            title: 'Color Correction and Grading',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/rgKBBz8rGvY'
          },
          {
            id: 118,
            title: 'Photoshop for Photographers',
            type: 'video',
            duration: 720,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/IyR_uYsRdPs'
          },
          {
            id: 119,
            title: 'Retouching Techniques',
            type: 'video',
            duration: 540,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/VL6-MsZdHmA'
          },
          {
            id: 120,
            title: 'Creating Your Style',
            type: 'video',
            duration: 360,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/3_LEAey5_Ys'
          }
        ]
      }
    ]
  }
];

// Append additional auto-generated courses (10 more) with the same structure
MOCK_COURSES.push(
  ...generateCourses(7, 10, 25, 121)
);

// Fill missing thumbnails for all courses using Unsplash Source based on title/category
for (const course of MOCK_COURSES) {
  if (!course.thumbnail) {
    const toKeywords = (s) => String(s || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ',');
    const titleKw = toKeywords(course.title);
    const categoryKw = toKeywords(course.category);
    course.thumbnail = `https://source.unsplash.com/featured/640x360/?${titleKw},${categoryKw}`;
  }
}

export const MOCK_ENROLLMENTS = [
  {
    id: 1,
    courseId: 1,
    studentId: 1,
    progress: 75.5,
    enrolledAt: '2024-01-20T00:00:00.000Z',
    completedAt: null,
    title: 'React Fundamentals',
    description: 'Learn React from scratch with hands-on projects and real-world examples.',
    thumbnail: null,
    level: 'beginner',
    price: 99.99,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null
  },
  {
    id: 2,
    courseId: 3,
    studentId: 1,
    progress: 45.0,
    enrolledAt: '2024-01-25T00:00:00.000Z',
    completedAt: null,
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design.',
    thumbnail: null,
    level: 'beginner',
    price: 79.99,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null
  }
];

export const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    courseId: 1,
    title: 'Build a Todo App',
    description: 'Create a simple todo application using React components and state management.',
    dueDate: '2024-02-15T23:59:59.000Z',
    maxPoints: 100,
    createdAt: '2024-01-20T00:00:00.000Z',
    isSubmitted: true,
    submittedAt: '2024-01-28T00:00:00.000Z',
    grade: 85,
    feedback: 'Great work! Your component structure is clean and well-organized.'
  },
  {
    id: 2,
    courseId: 1,
    title: 'React Hooks Practice',
    description: 'Implement various React hooks in a practical project.',
    dueDate: '2024-02-20T23:59:59.000Z',
    maxPoints: 100,
    createdAt: '2024-01-25T00:00:00.000Z',
    isSubmitted: false,
    submittedAt: null,
    grade: null,
    feedback: null
  }
];

// Helper functions for mock data
export const getCourses = (params = {}) => {
  let filteredCourses = [...MOCK_COURSES];
  
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (params.category) {
    filteredCourses = filteredCourses.filter(course => 
      course.category === params.category
    );
  }
  
  if (params.level) {
    filteredCourses = filteredCourses.filter(course => 
      course.level === params.level
    );
  }
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    courses: filteredCourses.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: filteredCourses.length,
      pages: Math.ceil(filteredCourses.length / limit)
    }
  };
};

export const getCourseById = (id) => {
  return MOCK_COURSES.find(course => course.id == id);
};

export const getMyEnrollments = (userId, params = {}) => {
  const enrollments = MOCK_ENROLLMENTS.filter(enrollment => enrollment.studentId == userId);
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    enrollments: enrollments.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: enrollments.length,
      pages: Math.ceil(enrollments.length / limit)
    }
  };
};

export const getMyCourses = (userId, params = {}) => {
  const courses = MOCK_COURSES.filter(course => course.instructorId == userId);
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    courses: courses.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: courses.length,
      pages: Math.ceil(courses.length / limit)
    }
  };
};

export const getCourseAssignments = (courseId) => {
  return MOCK_ASSIGNMENTS.filter(assignment => assignment.courseId == courseId);
};
