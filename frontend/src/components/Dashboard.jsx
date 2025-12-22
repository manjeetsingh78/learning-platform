import React, { useState, useRef, useEffect } from 'react';

const Dashboard = () => {
  const [user] = useState({
    username: 'Manjeet Singh',
    email: 'manjeet.singh23@lpu.in',
    createdAt: new Date(),
    enrolledCourses: 3,
    completedCourses: 1,
    totalPoints: 850
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your LearnHub AI assistant. I can help you with:\n\n🎯 Course recommendations\n📊 Learning progress insights\n💡 Study tips and strategies\n🎓 Career advice\n\nWhat would you like to know?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  const quickPrompts = [
    "Recommend a course for me",
    "How can I learn faster?",
    "Tips for staying motivated",
    "What should I learn next?"
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const handleLogout = () => {
    alert('Logout functionality - would redirect to login page');
  };

  const getAIResponse = (userMessage) => {
  const msg = userMessage.toLowerCase().trim();

  /* ------------------ Greetings ------------------ */
  if (
    msg === 'hi' ||
    msg === 'hello' ||
    msg === 'hey' ||
    msg === 'hii' ||
    msg === 'good morning' ||
    msg === 'good evening'
  ) {
    return `Hi ${user.username.split(' ')[0]} 👋  
Great to see you back on LearnHub!

How can I help you today?
• 📚 Recommend a course  
• 📊 Check your progress  
• 💡 Study tips  
• 🎓 Career guidance`;
  }

  /* ------------------ Small Talk ------------------ */
  if (msg.includes('how are you')) {
    return `I'm doing great 🤖✨  
And you? You're already doing awesome with ${user.totalPoints} points earned!

What would you like to work on today?`;
  }

  if (msg.includes('thank')) {
    return `You're welcome 😊  
I'm always here to help you learn and grow 🚀`;
  }

  /* ------------------ Course Recommendations ------------------ */
  if (
    msg.includes('recommend') ||
    msg.includes('suggest') ||
    msg.includes('what should i learn')
  ) {
    return `🎯 Based on your progress, here’s what I recommend:

✅ Finish **Web Development Bootcamp** (65% done — almost there!)
🐍 Start **Python Programming Complete** (strong foundation)
🤖 Move to **Machine Learning A-Z** after that

You already have **${user.totalPoints} points** — keep the momentum going! 💪`;
  }

  /* ------------------ Learning Tips ------------------ */
  if (msg.includes('learn faster') || msg.includes('study') || msg.includes('improve')) {
    return `⚡ Here are some proven learning tips:

• Study in 25–30 min focus blocks  
• Build projects while learning  
• Revise within 24 hours  
• Practice daily (even 30 mins helps!)

You’ve logged **47 hours** already — consistency is your strength 📈`;
  }

  /* ------------------ Motivation ------------------ */
  if (msg.includes('motivat') || msg.includes('tired') || msg.includes('give up')) {
    return `💙 I get it — learning can feel hard sometimes.

But look at this:
🏆 1 course completed  
🔥 3 courses enrolled  
⭐ 850 points earned  

You’re making real progress. Don’t stop now — future you will thank you 🚀`;
  }

  /* ------------------ Progress ------------------ */
  if (msg.includes('progress') || msg.includes('stats') || msg.includes('how am i doing')) {
    return `📊 Your current progress:

• Web Development: **65%**
• Data Science: **30%**
• UI/UX Design: **Completed 🎉**

You’re ahead of most learners. Keep going 💪`;
  }

  /* ------------------ Career ------------------ */
  if (msg.includes('career') || msg.includes('job')) {
    return `🎓 Career path suggestion:

With your skills, you can target:
• Frontend Developer  
• Full-stack Developer  
• Data Analyst (with Python + ML)

Next step → build projects + portfolio 💼`;
  }

  /* ------------------ Fallback ------------------ */
  return `🤔 I’m not fully sure what you mean, but I’m here to help!

You can ask me about:
• Courses  
• Learning tips  
• Career guidance  
• Your progress  

Try asking: *“Recommend a course for me”* 😊`;
};

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = messageText;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleQuickPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  const clearChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hi! I\'m your LearnHub AI assistant. I can help you with:\n\n🎯 Course recommendations\n📊 Learning progress insights\n💡 Study tips and strategies\n🎓 Career advice\n\nWhat would you like to know?' }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
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
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
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

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
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

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
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

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
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

      {/* Enhanced Chatbot Button with Pulse Animation */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-50 group"
      >
        {!isChatOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75"></div>
        )}
        <span className="text-3xl relative z-10">{isChatOpen ? '✕' : '🤖'}</span>
      </button>

      {/* Enhanced Chatbot Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                  🤖
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Learning Assistant</h3>
                <p className="text-xs text-blue-100">Online • Ready to help</p>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              title="Clear chat"
            >
              <span className="text-xl">🔄</span>
            </button>
          </div>
          
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 font-medium">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-full transition-colors border border-blue-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xl">{isLoading ? '⏳' : '📤'}</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">Press Enter to send</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
