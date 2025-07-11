import { useEffect, useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CustomHeatmap from "../components/CustomHeatmap";
import CountUp from "../components/ui/CountUp";
import NavBar from "../components/NavBar";
import RatingGraph from "../components/ui/RatingGraph";
import HorizontalBarGraph from "../components/ui/HorizontalBarGraph";

const ProfileTracker = () => {
  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for time period toggle
  const [timePeriod, setTimePeriod] = useState('month'); // 'week' or 'month'
  
  // State for contest tracking
  const [selectedPlatform, setSelectedPlatform] = useState('LeetCode');

  // Mock contest data for each platform
  const platformData = useMemo(() => ({
    'LeetCode': {
      count: 141,
      rating: 2100,
      change: '+25',
      icon: 'https://leetcode.com/favicon.ico'
    },
    'CodeChef': {
      count: 49,
      rating: 1850,
      change: '+30',
      icon: 'https://img.icons8.com/fluent/512/codechef.png'
    },
    'CodeForces': {
      count: 240,
      rating: 1950,
      change: '+50',
      icon: 'https://codeforces.org/s/0/favicon-32x32.png'
    },
    'GeeksForGeeks': {
      count: 1,
      rating: 1500,
      change: '0',
      icon: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg'
    }
  }), []);

  // Generate rating data based on selected platform
  const contestRatingData = useMemo(() => {
    const platform = platformData[selectedPlatform];
    if (!platform) return [];
    
    return [
      { month: 'Jan', rating: platform.rating - 300 },
      { month: 'Feb', rating: platform.rating - 200 },
      { month: 'Mar', rating: platform.rating - 100 },
      { month: 'Apr', rating: platform.rating - 50 },
      { month: 'May', rating: platform.rating },
    ];
  }, [selectedPlatform, platformData]);

  // Total stats (all-time)
  const totalStats = {
    totalQuestions: 7250,
    totalActiveDays: 256,
    questionsChange: 15.2,
    daysChange: 8.3,
    isPositiveQuestions: true,
    isPositiveDays: true
  };

  // Mock data for the rating graph
  const ratingData = [
    { month: 'Jan', rating: 1200, contests: 4 },
    { month: 'Feb', rating: 1350, contests: 5 },
    { month: 'Mar', rating: 1420, contests: 6 },
    { month: 'Apr', rating: 1380, contests: 4 },
    { month: 'May', rating: 1550, contests: 7 },
    { month: 'Jun', rating: 1600, contests: 6 },
  ];

  // Stats data based on time period
  const statsData = {
    week: {
      totalQuestions: 154,
      activeDays: 5,
      questionsChange: 12.5,
      daysChange: -3.2,
      isPositiveQuestions: true,
      isPositiveDays: false
    },
    month: {
      totalQuestions: 5754,
      activeDays: 1138,
      questionsChange: 8.2,
      daysChange: 5.7,
      isPositiveQuestions: true,
      isPositiveDays: true
    }
  };
  
  const currentStats = statsData[timePeriod];

  // Updated problem topics data with all the provided topics
  const [problemTopicsData] = useState([
    { topic: 'Arrays', count: 120 },
    { topic: 'Dynamic Programming', count: 110 },
    { topic: 'Graphs', count: 105 },
    { topic: 'Binary Search', count: 98 },
    { topic: 'Trees', count: 95 },
    { topic: 'Linked List', count: 90 },
    { topic: 'String Algorithms', count: 88 },
    { topic: 'Greedy Algorithms', count: 85 },
    { topic: 'Backtracking', count: 80 },
    { topic: 'Stack', count: 78 },
    { topic: 'Queue', count: 75 },
    { topic: 'Heap', count: 72 },
    { topic: 'Hash Table', count: 70 },
    { topic: 'Sorting', count: 68 },
    { topic: 'Bit Manipulation', count: 65 },
    { topic: 'Two Pointers', count: 62 },
    { topic: 'Sliding Window', count: 60 },
    { topic: 'Divide and Conquer', count: 58 },
    { topic: 'Recursion', count: 55 },
    { topic: 'Memoization', count: 52 },
    { topic: 'Binary Tree', count: 50 },
    { topic: 'Breadth-First Search', count: 48 },
    { topic: 'Depth-First Search', count: 45 },
    { topic: 'Topological Sort', count: 42 },
    { topic: 'Shortest Path', count: 40 },
    { topic: 'Minimum Spanning Tree', count: 38 },
    { topic: 'Suffix Array', count: 35 },
    { topic: 'Trie', count: 32 },
    { topic: 'Union Find', count: 30 },
    { topic: 'Segment Tree', count: 28 },
    { topic: 'Binary Indexed Tree', count: 25 },
    { topic: 'Matrix', count: 22 },
    { topic: 'Design', count: 20 },
    { topic: 'Simulation', count: 18 },
    { topic: 'Bitmask', count: 15 },
    { topic: 'Game Theory', count: 12 },
    { topic: 'Number Theory', count: 10 },
    { topic: 'Combinatorics', count: 8 },
    { topic: 'Geometry', count: 5 },
    { topic: 'Advanced Data Structure', count: 3 }
  ].sort((a, b) => b.count - a.count)); // Sort by count in descending order

  return (
    <div className="bg-black min-h-screen">
      <NavBar />
      <div className="pt-14 px-2 sm:px-3 pb-2 overflow-x-hidden">
        <div className="relative z-10 max-w-7xl mx-auto space-y-4">
          {/* Top Row: Profile, Stats Card, and Heatmap */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
            {/* Profile Card - 3 columns on lg+ */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-2xl p-4 shadow-md">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#3F0071] to-[#610094] flex items-center justify-center text-lg sm:text-xl font-bold mb-2 sm:mb-3 border-2 border-[#610094]/50 text-white">
                    RJ
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white text-center">Rajat Joshi</h2>
                  <p className="text-[#610094] text-xs sm:text-sm text-center mb-1 sm:mb-2 flex items-center justify-center gap-1">
                    @Rajat.18
                    <span className="text-green-400">✓</span>
                  </p>
                  <p className="text-gray-300 text-xs sm:text-sm text-center mb-3 sm:mb-4">Optimistic</p>
                </div>

                {/* Social Links */}
                <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-3 sm:mb-4 px-2">
                  {/* Email */}
                  <a 
                    href="mailto:rajat@example.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative w-8 h-8 bg-[#3F0071]/40 hover:bg-[#610094]/60 rounded flex items-center justify-center border border-[#610094]/30 transition-all duration-200"
                    title="Email"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">rajat@example.com</span>
                  </a>
                  
                  {/* LinkedIn */}
                  <a 
                    href="https://linkedin.com/in/rajatjoshi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative w-8 h-8 bg-[#3F0071]/40 hover:bg-[#0A66C2] rounded flex items-center justify-center border border-[#610094]/30 transition-all duration-200"
                    title="LinkedIn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">linkedin.com/in/rajatjoshi</span>
                  </a>
                  
                  {/* Twitter/X */}
                  <a 
                    href="https://twitter.com/rajatjoshi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative w-8 h-8 bg-[#3F0071]/40 hover:bg-[#000000] rounded flex items-center justify-center border border-[#610094]/30 transition-all duration-200"
                    title="X (Twitter)"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
                    </svg>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">@rajatjoshi</span>
                  </a>
                  
                  {/* Portfolio */}
                  <a 
                    href="https://rajatjoshi.dev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative w-8 h-8 bg-[#3F0071]/40 hover:bg-[#6e40c9] rounded flex items-center justify-center border border-[#610094]/30 transition-all duration-200"
                    title="Portfolio"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">rajatjoshi.dev</span>
                  </a>
                  
                  {/* Resume */}
                  <a 
                    href="/resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative w-8 h-8 bg-[#3F0071]/40 hover:bg-[#e74c3c] rounded flex items-center justify-center border border-[#610094]/30 transition-all duration-200"
                    title="Resume"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">View Resume</span>
                  </a>
                </div>

                {/* Education Section */}
                <div className="border-t border-[#2a2a42]/40 pt-3 mt-2">
                  <h4 className="text-xs font-semibold text-gray-400 mb-2 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5 text-[#9F7AEA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    EDUCATION
                  </h4>
                  
                  {/* Education Item */}
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-white">B.Tech in Computer Science</h5>
                        <p className="text-xs text-gray-400">Indian Institute of Technology (IIT)</p>
                      </div>
                      <span className="text-xs bg-[#3F0071]/30 text-[#9F7AEA] px-2 py-0.5 rounded-full">2021-2025</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">CGPA: 8.9/10.0</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="text-[10px] bg-[#3F0071]/20 text-[#9F7AEA] px-2 py-0.5 rounded-full">Data Structures</span>
                      <span className="text-[10px] bg-[#3F0071]/20 text-[#9F7AEA] px-2 py-0.5 rounded-full">Algorithms</span>
                      <span className="text-[10px] bg-[#3F0071]/20 text-[#9F7AEA] px-2 py-0.5 rounded-full">ML/AI</span>
                    </div>
                  </div>
                </div>

                {/* Coding Profiles Section */}
                <div className="border-t border-[#2a2a42]/40 pt-4 mt-4">
                  <div className="relative mb-4">
                    <h4 className="text-xs font-semibold text-white mb-3 flex items-center relative z-10">
                      <span className="bg-gradient-to-r from-[#9F7AEA] to-[#6B46C1] p-1.5 rounded-md mr-2.5 shadow-md flex items-center justify-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-3.5 w-3.5 text-white" 
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                          <path d="M12 12v5" />
                          <path d="M12 22v-5" />
                          <path d="M12 12V7" />
                          <circle cx="12" cy="7" r="1" fill="currentColor" />
                          <circle cx="12" cy="17" r="1" fill="currentColor" />
                        </svg>
                      </span>
                      CODING PROFILES
                    </h4>
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#9F7AEA]/30 to-transparent rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {/* Profile items with consistent styling */}
                    {[
                      {
                        name: 'GitHub',
                        username: 'rajatjoshi',
                        icon: 'https://img.icons8.com/ios-glyphs/30/github.png',
                        stats: '24 repos',
                        color: '#BFBBBB',
                        url: 'https://github.com/rajatjoshi'
                      },
                      {
                        name: 'LeetCode',
                        username: 'rajatjoshi',
                        icon: 'https://leetcode.com/favicon.ico',
                        stats: '2,450 problems',
                        color: '#FFA116',
                        url: 'https://leetcode.com/rajatjoshi'
                      },
                      {
                        name: 'CodeChef',
                        username: 'rajatjoshi',
                        icon: 'https://img.icons8.com/fluent/512/codechef.png',
                        stats: '1,850 rating',
                        color: '#5B4638',
                        url: 'https://www.codechef.com/users/rajatjoshi'
                      },
                      {
                        name: 'CodeForces',
                        username: 'rajatjoshi',
                        icon: 'https://codeforces.org/s/0/favicon-32x32.png',
                        stats: '1,950 rating',
                        color: '#1F8ACB',
                        url: 'https://codeforces.com/profile/rajatjoshi'
                      },
                      {
                        name: 'GeeksforGeeks',
                        username: 'rajatjoshi',
                        icon: 'https://media.geeksforgeeks.org/gfg-gg-logo.svg',
                        stats: '1,500 rating',
                        color: '#2F8D46',
                        url: 'https://auth.geeksforgeeks.org/user/rajatjoshi'
                      },
                      {
                        name: 'HackerRank',
                        username: 'rajatjoshi',
                        icon: 'https://www.hackerrank.com/wp-content/uploads/2020/05/hackerrank_cursor_favicon_480px-150x150.png',
                        stats: '5⭐ Gold',
                        color: '#00EA64',
                        url: 'https://www.hackerrank.com/rajatjoshi'
                      },
                      {
                        name: 'CodeStudio',
                        username: 'rajatjoshi',
                        icon: 'https://www.codingninjas.com/favicon.ico',
                        stats: '500+ problems',
                        color: '#F78C40',
                        fallback: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiBmaWxsPSJub25lIi8+PHBhdGggZmlsbD0iI0Y3OEM0MCIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LTggOCAzLjU5IDggOC0zLjU5IDgtOCA4eiIvPjxwYXRoIGZpbGw9IiNGNzhDNDAiIGQ9Ik0xMiA2Yy0zLjMxIDAtNiAyLjY5LTYgNnMyLjY5IDYgNiA2IDYtMi42OSA2LTYtMi42OS02LTYtNnptMCAxMGMtMi4yMSAwLTQtMS43OS00LTRzMS43OS00IDQtNCA0IDEuNzkgNCA0LTEuNzkgNC00IDR6Ii8+PHBhdGggZmlsbD0iI0Y3OEM0MCIgZD0iTTEyIDhjLTIuMjEgMC00IDEuNzktNCA0czEuNzkgNCA0IDQgNC0xLjc5IDQtNC0xLjc5LTQtNC00eiIvPjwvc3ZnPg==',
                        url: 'https://www.codingninjas.com/studio/profile/rajatjoshi'
                      }
                    ].map((profile, index) => (
                      <a 
                        key={index}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center p-2.5 rounded-xl transition-all duration-300 bg-[#1a1a2e] hover:bg-[#2a2a42] border border-[#2a2a42] hover:border-[#3F0071]/60 hover:shadow-lg hover:shadow-[#3F0071]/10`}
                      >
                        <div 
                          className={`w-9 h-9 flex items-center justify-center rounded-lg mr-3 overflow-hidden ${!profile.isSvg ? 'bg-white/5' : ''}`}
                          style={!profile.isSvg ? { backgroundColor: `${profile.color}15` } : {}}
                        >
                          {profile.isSvg ? (
                            <div className="w-5 h-5">
                              {profile.icon}
                            </div>
                          ) : (
                            <img 
                              src={profile.icon} 
                              alt={profile.name}
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                if (profile.fallback) {
                                  e.target.src = profile.fallback;
                                }
                                e.target.onerror = null;
                              }}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">{profile.name}</p>
                          <p className="text-xs text-gray-400 truncate">@{profile.username}</p>
                        </div>
                        <div className="ml-2 text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                          {profile.stats}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card - 4 columns on lg+ */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-2xl p-4 shadow-md">
                {/* Time Period Toggle */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
                    {timePeriod === 'week' ? 'Weekly Stats' : 'Monthly Stats'}
                  </h3>
                  <div className="inline-flex items-center bg-[#3F0071]/30 rounded-lg p-1">
                    <button
                      onClick={() => setTimePeriod('week')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timePeriod === 'week' ? 'bg-[#610094] text-white' : 'text-gray-300 hover:bg-[#3F0071]/50'}`}
                    >
                      Week
                    </button>
                    <button
                      onClick={() => setTimePeriod('month')}
                      className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${timePeriod === 'month' ? 'bg-[#610094] text-white' : 'text-gray-300 hover:bg-[#3F0071]/50'}`}
                    >
                      Month
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-2">
                  {/* Current Period Stats */}
                  <div className="space-y-4">
                    {/* Total Questions */}
                    <div className="bg-[#3F0071]/20 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs text-gray-300 mb-1">{timePeriod === 'week' ? 'THIS WEEK' : 'THIS MONTH'}</div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            <CountUp to={currentStats.totalQuestions} duration={2} />
                          </div>
                          <div className="text-xs text-gray-400">Questions</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${currentStats.isPositiveQuestions ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                          {currentStats.isPositiveQuestions ? '↑' : '↓'} {currentStats.questionsChange}%
                        </span>
                      </div>
                    </div>

                    {/* Active Days */}
                    <div className="bg-[#3F0071]/20 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs text-gray-300 mb-1">ACTIVE DAYS</div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            <CountUp to={currentStats.activeDays} duration={2} />
                          </div>
                          <div className="text-xs text-gray-400">Days Active</div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${currentStats.isPositiveDays ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                          {currentStats.isPositiveDays ? '↑' : '↓'} {currentStats.daysChange}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* All-time Stats */}
                  <div className="space-y-4">
                    {/* Total Questions All-time */}
                    <div className="bg-[#3F0071]/20 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs text-gray-300 mb-1">TOTAL</div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            <CountUp to={totalStats.totalQuestions} duration={2} />
                          </div>
                          <div className="text-xs text-gray-400">Questions</div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400">
                          All Time
                        </span>
                      </div>
                    </div>

                    {/* Total Active Days All-time */}
                    <div className="bg-[#3F0071]/20 p-2 sm:p-3 rounded-lg">
                      <div className="text-xs text-gray-300 mb-1">TOTAL</div>
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            <CountUp to={totalStats.totalActiveDays} duration={2} />
                          </div>
                          <div className="text-xs text-gray-400">Active Days</div>
                        </div>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-900/30 text-blue-400">
                          All Time
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contest Tracker */}
              <div className="mt-4">
                <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-2xl p-5 shadow-md">
                  <div className="flex flex-col md:flex-row">
                    {/* Total Contests - Left side */}
                    <div className="w-full md:w-[45%] md:pr-6 md:border-r border-[#610094]/30 flex flex-col items-center justify-center py-2">
                      <h3 className="text-[#610094] text-base font-semibold mb-2 text-center">Total Contests</h3>
                      <div className="text-4xl md:text-5xl font-bold text-white">
                        <CountUp to={431} duration={2.5} separator="," />
                      </div>
                    </div>

                    {/* Contest Platforms - Right side */}
                    <div className="w-full md:w-[55%] md:pl-6 mt-5 md:mt-0">
                      <h4 className="text-sm text-gray-300 mb-3 uppercase tracking-wider font-medium">Platforms</h4>
                      <div className="space-y-2">
                        {Object.entries(platformData).map(([name, data]) => (
                          <div 
                            key={name}
                            onClick={() => setSelectedPlatform(name)}
                            className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                              selectedPlatform === name 
                                ? 'bg-[#610094]/50' 
                                : 'bg-[#3F0071]/20 hover:bg-[#3F0071]/30'
                            }`}
                          >
                            <img src={data.icon} alt={name} className="w-5 h-5 rounded-sm flex-shrink-0" />
                            <span className="text-sm text-gray-300">{name}</span>
                            <span className="ml-auto text-sm font-bold text-white">{data.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Graph */}
              <div className="mt-4">
                <RatingGraph 
                  data={contestRatingData}
                  platform={selectedPlatform}
                  currentRating={platformData[selectedPlatform]?.rating}
                  ratingChange={platformData[selectedPlatform]?.change}
                />
              </div>
            </div>

            {/* Heatmap - 5 columns on lg+ */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-2xl p-4 shadow-md">
                <CustomHeatmap />
              </div>
              
              {/* Problems Solved */}
              <div className="mt-2">
                <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-xl p-2 shadow-md">
                  <h3 className="text-base font-semibold text-white mb-2">Problems Solved</h3>
                  
                  {/* Pie Charts Grid */}
                  <div className="flex flex-col gap-2 w-full">
                    {/* Fundamentals */}
                    <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-lg p-1.5 w-full shadow-md">
                      <div className="mb-1.5 text-center">
                        <h3 className="text-base font-semibold text-white">Fundamentals</h3>
                        <div className="h-0.5 w-10 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full mt-0.5"></div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center justify-between gap-1">
                        {/* Left Side - Pie Chart */}
                        <div className="w-full md:w-2/5 max-w-[150px]">
                          <div className="w-full h-32 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">2,450</div>
                                <div className="text-sm text-gray-400">Total</div>
                              </div>
                            </div>
                            
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <defs>
                                  <linearGradient id="gfgGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#059669" />
                                  </linearGradient>
                                  <linearGradient id="cnGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F78C40" />
                                    <stop offset="100%" stopColor="#E67E22" />
                                  </linearGradient>
                                </defs>
                                
                                <Pie
                                  data={[
                                    { name: 'GFG', value: 1500, color: '#10B981' },
                                    { name: 'Coding Ninjas', value: 950, color: '#F78C40' },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={55}
                                  paddingAngle={2}
                                  cornerRadius={4}
                                  dataKey="value"
                                  animationBegin={0}
                                  animationDuration={800}
                                  animationEasing="ease-out"
                                >
                                  <Cell fill="url(#gfgGradient)" stroke="#1F1A30" strokeWidth={1} />
                                  <Cell fill="url(#cnGradient)" stroke="#1F1A30" strokeWidth={1} />
                                </Pie>
                                
                                <Tooltip 
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-gray-800 p-1.5 rounded border border-gray-700 text-xs">
                                          <p className="font-medium text-white">{payload[0].name}</p>
                                          <p className="text-gray-300">{payload[0].value} problems</p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        {/* Right Side - Stats */}
                        <div className="w-full md:w-3/5 space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                              <span className="text-gray-300">GFG</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-white">1,500</span>
                              <span className="text-gray-400 text-sm">(61.2%)</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#F78C40]"></div>
                              <span className="text-gray-300">Coding Ninjas</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-white">950</span>
                              <span className="text-gray-400 text-sm">(38.8%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data Structures */}
                    <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-lg p-1.5 w-full shadow-md">
                      <div className="mb-1.5 text-center">
                        <h3 className="text-base font-semibold text-white">Data Structures</h3>
                        <div className="h-0.5 w-10 bg-gradient-to-r from-green-400 to-teal-400 mx-auto rounded-full mt-0.5"></div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center justify-between gap-1">
                        {/* Left Side - Pie Chart */}
                        <div className="w-full md:w-2/5 max-w-[150px]">
                          <div className="w-full h-32 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">1,850</div>
                                <div className="text-sm text-gray-400">Total</div>
                              </div>
                            </div>
                            
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <defs>
                                  <linearGradient id="easyGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#10B981" />
                                    <stop offset="100%" stopColor="#059669" />
                                  </linearGradient>
                                  <linearGradient id="mediumGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F59E0B" />
                                    <stop offset="100%" stopColor="#D97706" />
                                  </linearGradient>
                                  <linearGradient id="hardGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#EF4444" />
                                    <stop offset="100%" stopColor="#DC2626" />
                                  </linearGradient>
                                </defs>
                                
                                <Pie
                                  data={[
                                    { name: 'Easy', value: 1000, color: '#10B981' },
                                    { name: 'Medium', value: 700, color: '#F59E0B' },
                                    { name: 'Hard', value: 150, color: '#EF4444' },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={55}
                                  paddingAngle={2}
                                  cornerRadius={4}
                                  dataKey="value"
                                  animationBegin={0}
                                  animationDuration={800}
                                  animationEasing="ease-out"
                                >
                                  <Cell fill="url(#easyGradient)" stroke="#1F1A30" strokeWidth={1} />
                                  <Cell fill="url(#mediumGradient)" stroke="#1F1A30" strokeWidth={1} />
                                  <Cell fill="url(#hardGradient)" stroke="#1F1A30" strokeWidth={1} />
                                </Pie>
                                
                                <Tooltip 
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-gray-800 p-1.5 rounded border border-gray-700 text-xs">
                                          <p className="font-medium text-white">{payload[0].name}</p>
                                          <p className="text-gray-300">{payload[0].value} problems</p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        {/* Right Side - Stats */}
                        <div className="w-full md:w-3/5 space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                              <span className="text-gray-300">Easy</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-white">1,000</span>
                              <span className="text-gray-400 text-sm">(53.8%)</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                              <span className="text-gray-300">Medium</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-white">700</span>
                              <span className="text-gray-400 text-sm">(37.8%)</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                              <span className="text-gray-300">Hard</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-white">150</span>
                              <span className="text-gray-400 text-sm">(8.1%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Competitive Programming */}
                    <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-lg p-1.5 w-full shadow-md">
                      <div className="mb-1.5 text-center">
                        <h3 className="text-base font-semibold text-white">Competitive Programming</h3>
                        <div className="h-0.5 w-10 bg-gradient-to-r from-pink-400 to-rose-500 mx-auto rounded-full mt-0.5"></div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-center justify-between gap-1">
                        {/* Left Side - Pie Chart */}
                        <div className="w-full md:w-2/5 max-w-[150px]">
                          <div className="w-full h-32 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">1,200</div>
                                <div className="text-sm text-gray-400">Total</div>
                              </div>
                            </div>
                            
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <defs>
                                  <linearGradient id="codechefGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F472B6" />
                                    <stop offset="100%" stopColor="#DB2777" />
                                  </linearGradient>
                                  <linearGradient id="codeforcesGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#F97316" />
                                    <stop offset="100%" stopColor="#EA580C" />
                                  </linearGradient>
                                </defs>
                                
                                <Pie
                                  data={[
                                    { name: 'CodeChef', value: 700, color: '#DB2777' },
                                    { name: 'CodeForces', value: 500, color: '#F97316' },
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={40}
                                  outerRadius={55}
                                  paddingAngle={2}
                                  cornerRadius={4}
                                  dataKey="value"
                                  animationBegin={0}
                                  animationDuration={800}
                                  animationEasing="ease-out"
                                >
                                  <Cell fill="url(#codechefGradient)" stroke="#1F1A30" strokeWidth={1} />
                                  <Cell fill="url(#codeforcesGradient)" stroke="#1F1A30" strokeWidth={1} />
                                </Pie>
                                
                                <Tooltip 
                                  content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                      return (
                                        <div className="bg-gray-800 p-1.5 rounded border border-gray-700 text-xs">
                                          <p className="font-medium text-white">{payload[0].name}</p>
                                          <p className="text-gray-300">{payload[0].value} problems</p>
                                        </div>
                                      );
                                    }
                                    return null;
                                  }}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        {/* Right Side - Stats */}
                        <div className="w-full md:w-3/5 space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-pink-500"></div>
                              <span className="text-gray-300">CodeChef</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-white">700</span>
                              <span className="text-gray-400 text-sm">(58.3%)</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div>
                              <span className="text-gray-300">CodeForces</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium text-white">500</span>
                              <span className="text-gray-400 text-sm">(41.7%)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Questions Solved by Topic */}
              <div className="mt-4">
                <div className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] backdrop-blur-sm border border-[#2a2a42]/40 rounded-2xl p-5 shadow-md">
                  <h3 className="text-white text-lg font-semibold mb-4">Questions Solved by Topic</h3>
                  <div className="h-[400px] -mx-2 -mb-2">
                    <HorizontalBarGraph 
                      data={problemTopicsData}
                      title=""
                      xAxisKey="topic"
                      barKey="count"
                      barColor="#9F7AEA"
                      maxItems={10}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              {/* ... existing left column content ... */}
            </div>
            
            {/* Right Column */}
            <div className="lg:col-span-5 space-y-4">
              {/* ... existing right column content ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTracker;
