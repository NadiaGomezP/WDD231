const currentYear = document.querySelector('#currentyear');
const lastModified = document.querySelector('#lastModified');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');
const courseList = document.querySelector('#course-list');
const courseSummary = document.querySelector('#course-summary');
const courseFilters = document.querySelectorAll('.course-filter');

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = document.lastModified;

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
  primaryNav.classList.toggle('is-open', !isExpanded);
});

function renderCourses(filter = 'all') {
  const visibleCourses = courses.filter(course => filter === 'all' || course.subject === filter);
  const visibleCredits = visibleCourses.reduce((total, course) => total + course.credits, 0);

  courseList.replaceChildren();
  visibleCourses.forEach(course => {
    const card = document.createElement('li');
    card.classList.add('course-card');
    if (course.completed) card.classList.add('is-completed');

    const cardTop = document.createElement('div');
    cardTop.classList.add('course-card-top');

    const courseCode = document.createElement('span');
    courseCode.classList.add('course-code');
    courseCode.textContent = `${course.subject} ${course.number}`;

    const courseTitle = document.createElement('span');
    courseTitle.classList.add('course-title');
    courseTitle.textContent = course.title;

    const status = document.createElement('span');
    status.classList.add('course-status');
    status.textContent = course.completed ? '\u2713' : '';
    status.setAttribute('aria-label', course.completed ? 'Completed' : 'Not completed');
    cardTop.append(courseCode, status);
    card.append(cardTop, courseTitle);
    courseList.append(card);
  });

  courseSummary.textContent = `The total credits for courses listed above is ${visibleCredits}.`;
}

courseFilters.forEach(button => {
  button.addEventListener('click', () => {
    courseFilters.forEach(filterButton => {
      filterButton.setAttribute('aria-pressed', String(filterButton === button));
    });
    renderCourses(button.dataset.filter);
  });
});

renderCourses();