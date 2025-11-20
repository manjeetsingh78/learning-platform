import React, { useState } from 'react';

const Dashboard = () => {
  const [user] = useState({
    username: 'Abhishek Yadav',
    email: 'abhishekyadav@gmail.com',
    createdAt: new Date(),
    enrolledCourses: 3,
    completedCourses: 1,
    totalPoints: 850
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const courses = [
    {
      id: 1,
      title: 'Web Development Bootcamp',
      category: 'Development',
      instructor: 'Sarah Johnson',
      duration: '12 weeks',
      level: 'Beginner',
      rating: 4.8,
      students: 15420,
      progress: 65,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop',
      enrolled: true
    },
    {
      id: 2,
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      instructor: 'Dr. Michael Chen',
      duration: '10 weeks',
      level: 'Intermediate',
      rating: 4.9,
      students: 12350,
      progress: 30,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
      enrolled: true
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      category: 'Design',
      instructor: 'Emily Rodriguez',
      duration: '8 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: 9870,
      progress: 100,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
      enrolled: true
    },
    {
      id: 4,
      title: 'Python Programming Complete',
      category: 'Development',
      instructor: 'David Kumar',
      duration: '14 weeks',
      level: 'Beginner',
      rating: 4.6,
      students: 20100,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
      enrolled: false
    },
    {
      id: 5,
      title: 'Machine Learning A-Z',
      category: 'Data Science',
      instructor: 'Prof. Anna Martinez',
      duration: '16 weeks',
      level: 'Advanced',
      rating: 4.9,
      students: 18500,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400&h=250&fit=crop',
      enrolled: false
    },
    {
      id: 6,
      title: 'Digital Marketing Strategy',
      category: 'Marketing',
      instructor: 'James Wilson',
      duration: '6 weeks',
      level: 'Beginner',
      rating: 4.5,
      students: 11200,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
      enrolled: false
    },
    {
      id: 7,
      title: 'Mobile App Development',
      category: 'Development',
      instructor: 'Lisa Thompson',
      duration: '12 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: 14300,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop',
      enrolled: false
    },
    {
      id: 8,
      title: 'Graphic Design Essentials',
      category: 'Design',
      instructor: 'Carlos Mendez',
      duration: '8 weeks',
      level: 'Beginner',
      rating: 4.6,
      students: 10500,
      progress: 0,
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=250&fit=crop',
      enrolled: false
    }
  ];

  const categories = ['All', 'Development', 'Data Science', 'Design', 'Marketing'];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleLogout = () => {
    alert('Logout functionality - would redirect to login page');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <span className="text-white text-2xl">📚</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                LearnHub
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                <span className="text-gray-600">👤</span>
                <span className="font-medium text-gray-700">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition-colors"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Enrolled Courses</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{user.enrolledCourses}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-blue-600 text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Completed</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{user.completedCourses}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-green-600 text-2xl">🏆</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Points</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{user.totalPoints}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <span className="text-purple-600 text-2xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Learning Hours</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">47h</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <span className="text-orange-600 text-2xl">⏱️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Search for courses, instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            {selectedCategory === 'All' ? 'All Courses' : `${selectedCategory} Courses`}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  {course.enrolled && (
                    <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Enrolled
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">By {course.instructor}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <span>⏱️</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>👥</span>
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                  {course.enrolled && course.progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  <button
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      course.enrolled
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {course.enrolled ? 'Continue Learning' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;