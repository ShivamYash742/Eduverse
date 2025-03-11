import { useRef } from "react";
import { Play, Clock, Star, Users } from "lucide-react";
import { useTilt } from "../lib/animations";
import { Link } from "react-router-dom";
interface CourseCardProps {
  title: string;
  category: string;
  image: string;
  instructor: string;
  rating: number;
  studentsCount: number;
  duration: string;
  progress?: number;
  featured?: boolean;
  id?: number;
}

const CourseCard = ({
  title,
  category,
  image,
  instructor,
  rating,
  studentsCount,
  duration,
  progress = 0,
  featured = false,
  id: courseid,
}: CourseCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  useTilt(cardRef);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 glass-panel border-white/5 hover:border-white/10 hover:shadow-lg ${
        featured ? "border-neon-purple/20" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {featured && (
        <div className="absolute top-3 right-3 px-2 py-1 bg-neon-purple text-white text-xs font-medium rounded-full z-20">
          Featured
        </div>
      )}

      {/* Course image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-12 h-12 rounded-full bg-neon-purple/90 text-white flex items-center justify-center transform hover:scale-110 transition-transform">
            <Play className="w-5 h-5 ml-1" />
          </button>
        </div>

        {/* Category label */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-dark-card/70 backdrop-blur-md text-white text-xs font-medium rounded-full">
          {category}
        </div>
      </div>

      {/* Course content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 text-white line-clamp-2 group-hover:text-neon-purple transition-colors">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4">
          by <span className="text-white">{instructor}</span>
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1 fill-yellow-400" />
            <span className="text-white text-sm font-medium mr-1">
              {rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground text-xs">
              ({studentsCount})
            </span>
          </div>

          <div className="flex items-center text-muted-foreground text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {duration}
          </div>
        </div>

        {/* Progress bar */}
        {progress > 0 && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-white">{progress}%</span>
            </div>
            <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Card footer */}
      <div className="p-4 border-t border-white/5 flex items-center justify-between">
        <Link
          to={`/courses/${courseid}`}
          className="text-white text-sm font-medium hover:text-neon-purple transition-colors"
        >
          View Course
        </Link>

        <div className="flex items-center text-muted-foreground text-xs">
          <Users className="w-3 h-3 mr-1" />
          {studentsCount.toLocaleString()} students
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
