
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Play, 
  User, 
  Clock, 
  CheckCircle,
  Award,
  Circle,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VideoPlayer from '@/components/VideoPlayer';
import { 
  courses, 
  calculateCourseProgress, 
  markChapterAsCompleted, 
  isChapterCompleted 
} from '@/data/mockData';
import { toast } from '@/components/ui/use-toast';

const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  
  const course = courses.find(c => c.id === Number(courseId));
  
  useEffect(() => {
    if (course) {
      // Set the first chapter as selected by default
      if (course.chapters.length > 0 && selectedChapter === null) {
        setSelectedChapter(course.chapters[0].id);
      }
      
      // Calculate and update progress
      const currentProgress = calculateCourseProgress(course.id);
      setProgress(currentProgress);
    }
  }, [course, selectedChapter]);
  
  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Course not found</h2>
        <p className="mb-6">The course you're looking for doesn't exist or has been removed.</p>
        <Link to="/courses">
          <Button>Back to Courses</Button>
        </Link>
      </div>
    );
  }
  
  const currentChapter = course.chapters.find(ch => ch.id === selectedChapter);
  
  const handleCompleteChapter = () => {
    if (selectedChapter !== null) {
      markChapterAsCompleted(course.id, selectedChapter);
      
      // Update progress
      const newProgress = calculateCourseProgress(course.id);
      setProgress(newProgress);
      
      toast({
        title: "Chapter completed!",
        description: "Your progress has been updated.",
      });
      
      // Automatically select next chapter if available
      const currentIndex = course.chapters.findIndex(ch => ch.id === selectedChapter);
      if (currentIndex < course.chapters.length - 1) {
        setSelectedChapter(course.chapters[currentIndex + 1].id);
      }
    }
  };
  
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {currentChapter && (
            <div className="mb-6">
              <VideoPlayer 
                videoUrl={currentChapter.videoUrl} 
                title={currentChapter.title}
                onComplete={handleCompleteChapter}
              />
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <h2 className="text-2xl font-bold mb-4">{course.title}</h2>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">What you'll learn</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Understand basic principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Apply concepts to real-world examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Create your own projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>Master advanced techniques</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-semibold mb-3">Who this course is for?</h3>
              <p className="text-gray-700 mb-6">
                Beginners looking to learn in a structured environment. Intermediate learners wanting to brush up their skills.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">Requirements</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>No prior knowledge needed</li>
                <li>Basic computer skills</li>
                <li>Willingness to learn</li>
              </ul>
            </TabsContent>
            
            <TabsContent value="curriculum" className="pt-4">
              <h2 className="text-2xl font-bold mb-4">Course Content</h2>
              <p className="text-gray-500 mb-4">{course.chapters.length} chapters • {course.chapters.length * 15} minutes total</p>
              
              <div className="border rounded-lg overflow-hidden">
                {course.chapters.map((chapter, index) => {
                  const isCompleted = isChapterCompleted(course.id, chapter.id);
                  
                  return (
                    <div 
                      key={chapter.id}
                      className={`p-4 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b last:border-b-0`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="mt-1">
                            {isCompleted ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-300" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{chapter.title}</h4>
                            <p className="text-sm text-gray-500">{chapter.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 mr-3">{chapter.duration}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex items-center gap-1"
                            onClick={() => setSelectedChapter(chapter.id)}
                          >
                            <Play className="h-4 w-4" />
                            <span>Play</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="instructor" className="pt-4">
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src={course.instructor.avatar || "/placeholder.svg"} 
                  alt={course.instructor.name} 
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-semibold">{course.instructor.name}</h2>
                  <p className="text-gray-500">{course.instructor.role}</p>
                  <div className="flex items-center mt-2 gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.9 Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">1,200 Students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Play className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">12 Courses</span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                A passionate educator with over 10 years of experience in teaching and curriculum development.
                Specializing in making complex topics accessible to learners of all levels.
              </p>
            </TabsContent>
            
            <TabsContent value="reviews" className="pt-4">
              <h2 className="text-2xl font-bold mb-4">Student Reviews</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold">{course.rating.toFixed(1)}</div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.round(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{course.studentsCount} reviews</p>
                </div>
                
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = rating === 5 ? 75 : 
                                      rating === 4 ? 15 : 
                                      rating === 3 ? 7 : 
                                      rating === 2 ? 2 : 1;
                    
                    return (
                      <div key={rating} className="flex items-center gap-2 mb-1">
                        <div className="flex items-center gap-1 w-10">
                          <span className="text-sm">{rating}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full flex-1">
                          <div 
                            className="h-2 bg-yellow-400 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-10">{percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="border-t pt-6">
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-start gap-4 mb-3">
                    <img src="/placeholder.svg" alt="User" className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-medium">Ahmed</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < 5 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span>2 weeks ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    This course exceeded my expectations! The content is well-structured and the instructor explains concepts clearly.
                    I've already started applying what I learned in my own projects.
                  </p>
                </div>
                
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-start gap-4 mb-3">
                    <img src="/placeholder.svg" alt="User" className="w-10 h-10 rounded-full" />
                    <div>
                      <h4 className="font-medium">Sarah</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span>1 month ago</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Great course for beginners. The pace is perfect and the examples are practical.
                    I would have liked more advanced content toward the end, but overall very satisfied.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-6">
            <div className="p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Your progress</span>
                  <span className="text-sm font-medium">{progress}% complete</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-4">Course Content</h2>
              
              <div className="space-y-3 mb-6">
                {course.chapters.map((chapter) => {
                  const isActive = chapter.id === selectedChapter;
                  const isComplete = isChapterCompleted(course.id, chapter.id);
                  
                  return (
                    <div 
                      key={chapter.id}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        isActive ? 'bg-primary bg-opacity-10 border border-primary' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedChapter(chapter.id)}
                    >
                      <div className="flex items-center gap-3">
                        {isComplete ? (
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <Play className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{chapter.title}</h4>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{chapter.duration}</span>
                            {isComplete && (
                              <span className="text-xs text-green-500">Completed</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {currentChapter && !isChapterCompleted(course.id, currentChapter.id) && (
                <Button onClick={handleCompleteChapter} className="w-full mb-4">
                  Mark as Completed
                </Button>
              )}
              
              {progress === 100 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <Award className="h-10 w-10 text-green-500 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-800">Congratulations!</h3>
                  <p className="text-sm text-green-600">You've completed this course</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;
