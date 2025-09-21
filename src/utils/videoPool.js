// Utility to generate additional mock courses with YouTube videos

const YT_POOL = [
  'Tn6-PIqc4UM','SqcY0GlETPk','w7ejDZ8SWv8','7fPXI_MnBOY','DLX62G4lc44',
  'Y2hgEGPzTZY','IYvD9oBCuJI','Oioo0IdoEls','Znqv84xi8Vs','7o5FPaVA9m0',
  'O6P86uwfdR0','0ZJgIjIuY7U','5LrDIWkK_Bc','6ThXsUwLWvc','1VVfMVQdx5M',
  'Law7wfdg_ls','SdzMBWT2CDQ','cuEtnrL9-H0','uojLJFt9SzY','8Xwq35cPwYg',
  'h33Srr5J9nY','NIq3qLaHCIs','NgF9-pdTDGs','iLx4ma8ZqvQ','cRHQNNcYf6s',
  'DHvZLI7Db8E','V_Kr9OSfDeU','rfscVS0vtbw','khKv-8q7YmY','vmEHCJofslg',
  'e60ItwlZTKM','UO98lJQ3QGI','a9UrKTVEeZA','6GUZXDef2U0','hSPmj7mK6ng'
];

const categories = ['Web Development','Design','Data Science','Marketing','Photography','Mobile','DevOps','Cloud','AI','Security'];
const levels = ['beginner','intermediate','advanced'];

export function generateCourses(startCourseId = 7, count = 10, startModuleId = 25, startLessonId = 121) {
  const courses = [];
  let moduleId = startModuleId;
  let lessonId = startLessonId;
  let ytIndex = 0;

  for (let i = 0; i < count; i++) {
    const id = startCourseId + i;
    const title = `Sample Course ${id}`;
    const category = categories[i % categories.length];
    const level = levels[i % levels.length];
    const price = 49.99 + (i % 5) * 25;

    const modules = [];
    for (let m = 0; m < 4; m++) {
      const lessons = [];
      for (let l = 0; l < 5; l++) {
        const ytId = YT_POOL[ytIndex % YT_POOL.length];
        ytIndex++;
        lessons.push({
          id: lessonId++,
          title: `Lesson ${m + 1}.${l + 1}`,
          type: 'video',
          duration: 240 + ((m + l) % 5) * 60,
          orderIndex: l + 1,
          videoUrl: `https://www.youtube.com/embed/${ytId}`
        });
      }
      modules.push({
        id: moduleId++,
        title: `Module ${m + 1}`,
        description: `Auto-generated module ${m + 1}`,
        orderIndex: m + 1,
        lessons
      });
    }

    // Build a keyword string for Unsplash Source
    const toKeywords = (s) => String(s || '')
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim()
      .replace(/\s+/g, ',');

    courses.push({
      id,
      title,
      description: 'Auto-generated sample course with YouTube video lessons.',
      // Use Unsplash Source to fetch a relevant image based on title and category keywords
      thumbnail: `https://source.unsplash.com/featured/640x360/?${toKeywords(title)},${toKeywords(category)}`,
      price,
      category,
      level,
      status: 'published',
      instructorId: 2,
      firstName: 'Jane',
      lastName: 'Educator',
      instructorAvatar: null,
      enrollmentCount: 50 + (i * 7) % 200,
      createdAt: '2024-02-01T00:00:00.000Z',
      modules
    });
  }

  return courses;
}
