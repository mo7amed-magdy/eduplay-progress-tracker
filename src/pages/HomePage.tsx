
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CourseCard from '@/components/CourseCard';
import CategoryCard from '@/components/CategoryCard';
import { categories, courses, featuredCourses, recommendedCourses, calculateCourseProgress } from '@/data/mockData';

const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  return (
    <div className="py-8 px-6">
      <section className="mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Courses Category</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.slice(0, 4).map((category) => (
            <CategoryCard 
              key={category.id}
              category={category}
              isHighlighted={category.id === 'sports'}
            />
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Published courses</h2>
          <Link to="/courses" className="text-sm text-primary hover:underline">
            See all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.slice(0, 6).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="mb-12 bg-gray-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome back, ready for your next lesson?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.slice(0, 2).map((course) => (
            <div key={course.id} className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex gap-4">
                <img 
                  src="/placeholder.svg" 
                  alt="Course thumbnail" 
                  className="w-24 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    <span className="inline-block mr-2">
                      <img 
                        src="/placeholder.svg" 
                        alt="Instructor" 
                        className="w-4 h-4 rounded-full inline-block mr-1"
                      />
                      Lina
                    </span>
                  </p>
                  
                  <div className="progress-bar h-1.5">
                    <div 
                      className="progress-bar-fill bg-teal-500" 
                      style={{ width: `${calculateCourseProgress(course.id)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-1">
                    <span className="text-xs">Lesson 5 of 7</span>
                    <span className="text-xs">{calculateCourseProgress(course.id)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4 gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
      
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((course, idx) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 flex flex-col h-full">
                <img 
                  src={idx === 0 ? "/lovable-uploads/8d3eb5b5-23ef-4045-9111-f35ca340b661.png" : "/placeholder.svg"} 
                  alt={course.title} 
                  className="w-12 h-12 mb-3"
                />
                <h3 className="font-bold text-lg">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow">
                  {course.description.substring(0, 80)}...
                </p>
                <div className="flex items-center mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center overflow-hidden">
                        <img src="/placeholder.svg" alt="Student" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">+{course.studentsCount} students</span>
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button className="w-full" variant="secondary">
                    View Course
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Recommended for you</h2>
          <Link to="/courses" className="text-sm text-primary hover:underline">
            See all
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt={course.title} 
                className="w-full h-40 object-cover"
              />
              
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="text-xs bg-gray-100 rounded px-2 py-1">Design</span>
                  <div className="flex items-center ml-auto">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-xs ml-1">4 lessons</span>
                  </div>
                </div>
                
                <h3 className="font-medium text-lg mb-2">{course.title}</h3>
                
                <p className="text-sm text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src="/placeholder.svg" 
                      alt="Instructor" 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm">Lina</span>
                  </div>
                  
                  <div className="text-lg font-bold text-primary">$50</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
