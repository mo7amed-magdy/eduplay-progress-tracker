
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import CourseCard from '@/components/CourseCard';
import CategoryCard from '@/components/CategoryCard';
import { categories, courses } from '@/data/mockData';

const CoursesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter courses based on search query and selected category
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || course.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="py-8 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Courses</h1>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="w-[280px] pl-10 pr-4 py-2 rounded-lg"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button variant="outline" size="icon">
            <Filter size={18} />
          </Button>
        </div>
      </div>
      
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedCategory === category.id ? 'bg-primary bg-opacity-10 border border-primary' : 'bg-white border border-gray-200 hover:border-primary'
              }`}
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">All Courses {selectedCategory ? `- ${selectedCategory}` : ''}</h2>
          {selectedCategory && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
              Clear filter
            </Button>
          )}
        </div>
        
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No courses found matching your criteria</p>
            <Button onClick={() => {
              setSearchQuery('');
              setSelectedCategory(null);
            }}>
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;
