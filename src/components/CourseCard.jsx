
import { Link } from 'react-router-dom';

const CourseCard = ({ course, showProgress = false, progress = 0 }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/courses/${course.id}`}>
        <div className="relative h-40 w-full overflow-hidden">
          <img
            src={course.coverImage}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {course.chapters.length} lessons
          </div>
          <div className="absolute top-2 left-2 bg-white rounded-full p-1">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="w-6 h-6 rounded-full"
            />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg truncate">{course.title}</h3>
          <p className="text-sm text-gray-500 mb-2">{course.category}</p>
          
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <span className="text-xs">{course.studentsCount} students</span>
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">
                  {i < Math.floor(course.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
          </div>
          
          {showProgress && (
            <div className="mt-3">
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium">{progress}%</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
