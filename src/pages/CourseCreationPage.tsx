
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Upload, 
  Plus,
  Trash2,
  Bell,
  Mail,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { categories } from '@/data/mockData';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Chapter {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
}

const CourseCreationPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, title: '', description: '', videoUrl: '' },
    { id: 2, title: '', description: '', videoUrl: '' }
  ]);
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleChapterChange = (id: number, field: keyof Chapter, value: string) => {
    setChapters(prevChapters => 
      prevChapters.map(chapter => 
        chapter.id === id ? { ...chapter, [field]: value } : chapter
      )
    );
  };
  
  const handleAddChapter = () => {
    const newId = chapters.length > 0 ? Math.max(...chapters.map(ch => ch.id)) + 1 : 1;
    setChapters(prev => [...prev, { id: newId, title: '', description: '', videoUrl: '' }]);
  };
  
  const handleRemoveChapter = (id: number) => {
    if (chapters.length > 1) {
      setChapters(prevChapters => prevChapters.filter(chapter => chapter.id !== id));
    } else {
      toast({
        title: "Cannot remove chapter",
        description: "A course must have at least one chapter.",
        variant: "destructive"
      });
    }
  };
  
  const handlePublish = () => {
    // Validate form
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please enter a course title.",
        variant: "destructive"
      });
      return;
    }
    
    if (!description.trim()) {
      toast({
        title: "Missing description",
        description: "Please enter a course description.",
        variant: "destructive"
      });
      return;
    }
    
    if (!category) {
      toast({
        title: "Missing category",
        description: "Please select a course category.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate chapters
    const invalidChapters = chapters.filter(ch => !ch.title.trim());
    if (invalidChapters.length > 0) {
      toast({
        title: "Invalid chapters",
        description: `Chapter ${invalidChapters[0].id} is missing a title.`,
        variant: "destructive"
      });
      return;
    }
    
    // Success
    toast({
      title: "Course created!",
      description: "Your course has been successfully published.",
    });
    
    setTimeout(() => {
      navigate('/courses');
    }, 1500);
  };
  
  return (
    <div className="py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Course Creation</h1>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mail size={20} />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src="/placeholder.svg" 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Swetha shankaresh</p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Upload New Course</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input 
                id="title" 
                placeholder="Type here" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea 
                id="description" 
                placeholder="Type here" 
                className="h-[150px] resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload cover image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {coverImagePreview ? (
                <div className="relative">
                  <img 
                    src={coverImagePreview} 
                    alt="Cover preview" 
                    className="w-full h-[200px] object-contain mb-3"
                  />
                  <Button
                    variant="destructive" 
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setCoverImage(null);
                      setCoverImagePreview('');
                    }}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mx-auto h-12 w-12 text-gray-400 mb-2">
                    <Upload size={48} className="mx-auto text-gray-400" />
                  </div>
                  <p className="text-primary font-medium mb-1">Upload cover image</p>
                  <p className="text-sm text-gray-500 mb-4">Drop your file here</p>
                  <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto">
                    <Upload size={24} className="text-primary" />
                  </div>
                </>
              )}
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                className="hidden"
                onChange={handleCoverImageChange}
              />
              <label htmlFor="coverImage">
                <Button variant="outline" className="mt-4">
                  Browse Files
                </Button>
              </label>
            </div>
          </div>
        </div>
      </section>
      
      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Course Content</h2>
        
        {chapters.map((chapter, index) => (
          <div 
            key={chapter.id} 
            className="mb-6 p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Chapter {index + 1}</h3>
              <Button
                variant="ghost" 
                size="sm"
                onClick={() => handleRemoveChapter(chapter.id)}
              >
                <Trash2 size={16} className="text-gray-500" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`title-${chapter.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <Input 
                  id={`title-${chapter.id}`}
                  placeholder="Type here"
                  value={chapter.title}
                  onChange={(e) => handleChapterChange(chapter.id, 'title', e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor={`video-${chapter.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Video URL
                </label>
                <Input 
                  id={`video-${chapter.id}`}
                  placeholder="Type here"
                  value={chapter.videoUrl}
                  onChange={(e) => handleChapterChange(chapter.id, 'videoUrl', e.target.value)}
                />
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor={`desc-${chapter.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea 
                  id={`desc-${chapter.id}`}
                  placeholder="Type here"
                  value={chapter.description}
                  onChange={(e) => handleChapterChange(chapter.id, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
        
        <Button 
          variant="outline" 
          className="flex items-center gap-1"
          onClick={handleAddChapter}
        >
          <Plus size={16} />
          <span>Add Chapter</span>
        </Button>
      </section>
      
      <section className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Course Schedule</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </section>
      
      <div className="flex justify-end">
        <Button className="px-8" onClick={handlePublish}>
          Publish Course
        </Button>
      </div>
    </div>
  );
};

export default CourseCreationPage;
