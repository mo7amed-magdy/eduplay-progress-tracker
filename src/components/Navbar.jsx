
import { Link } from 'react-router-dom';
import { Bell, Search, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = ({ user = { name: 'Sara Ahmed', avatar: '/placeholder.svg', role: 'Student' } }) => {
  return (
    <header className="border-b border-gray-200 bg-white py-3 px-6">
      <div className="flex items-center justify-between">
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
          <Link to="/games" className="text-gray-700 hover:text-primary">Games</Link>
          <Link to="/courses" className="text-gray-700 font-semibold text-primary">Courses</Link>
          <Link to="/videos" className="text-gray-700 hover:text-primary">Videos</Link>
        </nav>
        
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              className="w-[280px] pl-10 pr-4 py-2 rounded-full bg-gray-100 border-none" 
              placeholder="Search"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell size={20} />
          </Button>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <Mail size={20} />
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
