
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CategoryCard = ({ category, isHighlighted = false }) => {
  return (
    <div className={`category-card ${isHighlighted ? 'ring-2 ring-secondary' : ''}`}>
      <div className={`category-icon ${isHighlighted ? 'bg-secondary bg-opacity-10' : 'bg-blue-50'}`}>
        <span className="text-2xl">{category.icon}</span>
      </div>
      <h3 className="font-medium text-base mb-1">{category.name}</h3>
      <p className="text-xs text-gray-500 text-center mb-3">{category.description}</p>
      <Link to={`/courses/category/${category.id}`}>
        <Button
          variant={isHighlighted ? "secondary" : "outline"}
          size="sm"
          className="mt-2"
        >
          {isHighlighted ? 'Explore courses' : 'more'}
        </Button>
      </Link>
    </div>
  );
};

export default CategoryCard;
