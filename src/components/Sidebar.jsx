
import { Link, useLocation } from 'react-router-dom';
import { Book, Video, Library, User, FileText } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-[200px] bg-white shadow-md min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <span className="font-bold text-xl text-gray-800">EduPlay</span>
        </Link>
      </div>
      
      <div className="mt-2 mb-4">
        <p className="text-secondary font-semibold text-sm">courses</p>
      </div>

      <nav className="flex flex-col gap-2">
        <Link to="/library" className={`p-2 rounded-md flex items-center gap-3 hover:bg-gray-100 ${isActive('/library') ? 'bg-gray-100' : ''}`}>
          <Library size={20} className="text-gray-600" />
          <span className="text-gray-700">Library</span>
        </Link>
        
        <Link to="/courses" className={`p-2 rounded-md flex items-center gap-3 hover:bg-gray-100 ${isActive('/courses') ? 'bg-gray-100' : ''}`}>
          <Book size={20} className="text-gray-600" />
          <span className="text-gray-700">Courses</span>
        </Link>
        
        <Link to="/exams" className={`p-2 rounded-md flex items-center gap-3 hover:bg-gray-100 ${isActive('/exams') ? 'bg-gray-100' : ''}`}>
          <FileText size={20} className="text-gray-600" />
          <span className="text-gray-700">Exams</span>
        </Link>
        
        <Link to="/assignments" className={`p-2 rounded-md flex items-center gap-3 hover:bg-gray-100 ${isActive('/assignments') ? 'bg-gray-100' : ''}`}>
          <User size={20} className="text-gray-600" />
          <span className="text-gray-700">Assignment</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
