import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Clock, BookOpen, AlertCircle } from "lucide-react";
import Navbar from "../../custom/Navbar";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants";

const CourseSelection = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const navigate = useNavigate();

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cbepdf/questions`); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data); // Ensure API returns an array of courses
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter courses based on search term and difficulty
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "All" || course.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  // Get difficulty color
  const getDifficultyColor = (difficulty: any) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <Navbar />
      <div className="w-full bg-white rounded-2xl p-8 mb-8 mt-[9.5%]">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Computer-Based Examination Simulation
        </h1>
        <p className="text-gray-600 mb-6">
          Select a course to begin your examination
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by course name or code..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Loading/Error Handling */}
        {loading && (
          <p className="text-center text-gray-600">Loading courses...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {/* Course Cards */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {course.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {course.courseCode}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex justify-between flex-wrap gap-2 mt-2">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock size={14} className="mr-1" />
                        90 min
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(
                          course.difficulty
                        )}`}
                      >
                        {course.difficulty}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3 text-sm font-medium text-blue-600 hover:bg-gray-100">
                    Take Exam →
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 flex flex-col items-center justify-center py-8 text-gray-500">
                <AlertCircle size={48} className="mb-2 text-gray-400" />
                <p>No courses match your search criteria</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Exam Instructions Dialog */}
      <Dialog
        open={!!selectedCourse}
        onOpenChange={(open) => !open && setSelectedCourse(null)}
      >
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BookOpen size={20} />
              {selectedCourse?.title} ({selectedCourse?.courseCode})
            </DialogTitle>
            <DialogDescription>
              Please read the following exam instructions carefully.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">
                Exam Guidelines
              </h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-sm">
                <li>Ensure you have a stable internet connection.</li>
                <li>Do not refresh or leave the page during the exam.</li>
                <li>Each question has a time limit, answer carefully.</li>
                <li>Once submitted, answers cannot be changed.</li>
                <li>Use of external resources is not permitted.</li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setSelectedCourse(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                navigate(`/cbe/examination?courseId=${selectedCourse?._id}`)
              }
            >
              Start Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseSelection;
