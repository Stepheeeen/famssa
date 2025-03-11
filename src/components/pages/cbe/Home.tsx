import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Flag,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Eye,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../../constants";

const CBEInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("courseId");
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!courseId) return; // Ensure courseId exists
      setLoading(true);
      try {
        const response = await fetch(
          `${BASE_URL}/cbepdf/questions/${courseId}`
        );
        if (!response.ok) throw new Error("Failed to fetch questions");

        const data = await response.json();
        // Transform API response to match expected structure
        const formattedQuestions = data.questions
          .sort(() => Math.random() - 0.5) // Shuffle the questions randomly
          .slice(0, 20) // Select the first 20 questions
          .map((q: any) => ({
            id: q._id,
            text: q.question,
            options: q.options.map((opt: string, index: number) => ({
              id: String.fromCharCode(65 + index), // "A", "B", "C", "D"
              text: opt,
            })),
            correctAnswer: q.correctAnswer,
          }));

        setQuestions(formattedQuestions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [courseId]);

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !examSubmitted) {
      const timer = setTimeout(
        () => setTimeRemaining((prev) => prev - 1),
        1000
      );
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !examSubmitted) {
      // Auto-submit when time runs out
      handleSubmitExam(true);
    }
  }, [timeRemaining, examSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const goToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId });
  };

  const toggleFlagged = (questionId: string) => {
    setFlaggedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const calculateScore = () => {
    let correctCount = 0;
    const correct: string[] = [];
    const incorrect: string[] = [];

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.correctAnswer) {
        correctCount++;
        correct.push(question.id);
      } else if (userAnswer) {
        // Only count as incorrect if an answer was provided
        incorrect.push(question.id);
      }
    });

    setCorrectAnswers(correct);
    setIncorrectAnswers(incorrect);

    return Math.round((correctCount / questions.length) * 100);
  };

  const handleSubmitExam = (isAutoSubmit = false) => {
    if (
      isAutoSubmit ||
      window.confirm("Are you sure you want to submit the exam?")
    ) {
      const score = calculateScore();
      setExamScore(score);
      setExamSubmitted(true);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading exam questions...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (questions.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">No Questions Available</h2>
          <p className="text-gray-700 mb-4">
            Please select a different course or try again later.
          </p>
          <button
            onClick={() => navigate("/cbe")}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with timer */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold">Computer-Based Examination</h1>
        {!examSubmitted && (
          <div
            className={`flex items-center space-x-2 ${
              timeRemaining < 300 ? "text-red-600 animate-pulse" : ""
            }`}
          >
            <Clock
              className={`h-5 w-5 ${
                timeRemaining < 300 ? "text-red-600" : "text-gray-600"
              }`}
            />
            <span className="font-medium">{formatTime(timeRemaining)}</span>
          </div>
        )}
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main exam area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {examSubmitted ? (
            showResults ? (
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-6">
                  <button
                    onClick={() => setShowResults(false)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Summary
                  </button>
                </div>

                <h2 className="text-xl font-bold mb-6">
                  Exam Results Analysis
                </h2>

                {correctAnswers.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Correctly Answered ({correctAnswers.length})
                    </h3>
                    <div className="space-y-6">
                      {questions
                        .filter((q) => correctAnswers.includes(q.id))
                        .map((question, idx) => (
                          <div
                            key={question.id}
                            className="border border-green-200 rounded-lg p-4 bg-green-50"
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-green-800">
                                Question {idx + 1}
                              </span>
                            </div>
                            <p className="mb-3">{question.text}</p>
                            <div className="space-y-2">
                              {question.options.map((option: any) => (
                                <div
                                  key={option.id}
                                  className={`p-3 rounded-md ${
                                    option.id === question.correctAnswer
                                      ? "bg-green-200 border border-green-300"
                                      : "bg-white border border-gray-200"
                                  }`}
                                >
                                  <div className="flex">
                                    <span className="font-medium mr-2">
                                      {option.id}.
                                    </span>
                                    <span>{option.text}</span>
                                    {option.id === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 ml-2 text-green-600" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {incorrectAnswers.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-red-600 mb-3 flex items-center">
                      <XCircle className="h-5 w-5 mr-2" />
                      Incorrectly Answered ({incorrectAnswers.length})
                    </h3>
                    <div className="space-y-6">
                      {questions
                        .filter((q) => incorrectAnswers.includes(q.id))
                        .map((question, idx) => (
                          <div
                            key={question.id}
                            className="border border-red-200 rounded-lg p-4 bg-red-50"
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-red-800">
                                Question {idx + 1}
                              </span>
                            </div>
                            <p className="mb-3">{question.text}</p>
                            <div className="space-y-2">
                              {question.options.map((option: any) => (
                                <div
                                  key={option.id}
                                  className={`p-3 rounded-md ${
                                    option.id === question.correctAnswer
                                      ? "bg-green-200 border border-green-300"
                                      : option.id === answers[question.id]
                                      ? "bg-red-200 border border-red-300"
                                      : "bg-white border border-gray-200"
                                  }`}
                                >
                                  <div className="flex">
                                    <span className="font-medium mr-2">
                                      {option.id}.
                                    </span>
                                    <span>{option.text}</span>
                                    {option.id === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 ml-2 text-green-600" />
                                    )}
                                    {option.id === answers[question.id] &&
                                      option.id !== question.correctAnswer && (
                                        <XCircle className="h-4 w-4 ml-2 text-red-600" />
                                      )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {questions.filter((q) => !answers[q.id]).length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-3">
                      Unanswered Questions (
                      {questions.filter((q) => !answers[q.id]).length})
                    </h3>
                    <div className="space-y-6">
                      {questions
                        .filter((q) => !answers[q.id])
                        .map((question, idx) => (
                          <div
                            key={question.id}
                            className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-gray-800">
                                Question {idx + 1}
                              </span>
                            </div>
                            <p className="mb-3">{question.text}</p>
                            <div className="space-y-2">
                              {question.options.map((option: any) => (
                                <div
                                  key={option.id}
                                  className={`p-3 rounded-md ${
                                    option.id === question.correctAnswer
                                      ? "bg-green-200 border border-green-300"
                                      : "bg-white border border-gray-200"
                                  }`}
                                >
                                  <div className="flex">
                                    <span className="font-medium mr-2">
                                      {option.id}.
                                    </span>
                                    <span>{option.text}</span>
                                    {option.id === question.correctAnswer && (
                                      <CheckCircle className="h-4 w-4 ml-2 text-green-600" />
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center bg-white p-8 rounded-lg shadow max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-2">Exam Completed</h2>
                <div className="mb-6">
                  <div
                    className={`text-5xl font-bold mb-2 ${
                      examScore >= 70
                        ? "text-green-600"
                        : examScore >= 50
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {examScore}%
                  </div>
                  <p className="text-gray-600">
                    You answered {answeredCount} out of {questions.length}{" "}
                    questions
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold mb-3">Performance Summary</h3>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span>Correct</span>
                      </div>
                      <span className="font-medium">
                        {correctAnswers.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-red-600">
                        <XCircle className="h-4 w-4 mr-2" />
                        <span>Incorrect</span>
                      </div>
                      <span className="font-medium">
                        {incorrectAnswers.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-600">
                        <span className="h-4 w-4 mr-2 border border-gray-300 rounded-full"></span>
                        <span>Unanswered</span>
                      </div>
                      <span className="font-medium">{unansweredCount}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowResults(true)}
                  className="w-full flex justify-center items-center bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 mb-3"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Detailed Results
                </button>

                <div className="mt-6 flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      setExamSubmitted(false);
                      setAnswers({});
                      setFlaggedQuestions([]);
                      setTimeRemaining(3600);
                      setCurrentQuestionIndex(0);
                      setShowResults(false);
                    }}
                    className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
                  >
                    Retake Exam
                  </button>
                  <button
                    onClick={() => navigate("/cbe")}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            )
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-semibold">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <button
                  onClick={() => toggleFlagged(currentQuestion.id)}
                  className={`flex items-center ${
                    flaggedQuestions.includes(currentQuestion.id)
                      ? "text-orange-500"
                      : "text-gray-500"
                  } hover:text-orange-600`}
                >
                  <Flag className="h-5 w-5 mr-1" />
                  Flag for Review
                </button>
              </div>

              <p className="text-gray-800 mb-6 text-lg">
                {currentQuestion.text}
              </p>

              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option: any) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-4 rounded border hover:bg-blue-50 cursor-pointer transition duration-150 ${
                      answers[currentQuestion.id] === option.id
                        ? "bg-blue-50 border-blue-300"
                        : "border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={option.id}
                      checked={answers[currentQuestion.id] === option.id}
                      onChange={() =>
                        handleAnswerSelect(currentQuestion.id, option.id)
                      }
                      className="h-4 w-4 text-blue-600 mr-3"
                    />
                    <div className="flex">
                      <span className="font-medium mr-2">{option.id}.</span>
                      <span>{option.text}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center px-4 py-2 rounded text-white shadow ${
                    currentQuestionIndex === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous
                </button>

                {currentQuestionIndex === questions.length - 1 ? (
                  <button
                    onClick={() => handleSubmitExam()}
                    className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white shadow cursor-pointer"
                  >
                    Submit Exam
                  </button>
                ) : (
                  <button
                    onClick={() => goToQuestion(currentQuestionIndex + 1)}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white shadow cursor-pointer"
                  >
                    Next
                    <ChevronRight className="h-5 w-5 ml-1" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar question navigator */}
        {!examSubmitted && (
          <div className="hidden md:block w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <h2 className="font-medium text-gray-800 mb-4">
              Questions Overview
            </h2>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {questions.map((question, index) => {
                const isAnswered = answers[question.id] !== undefined;
                const isFlagged = flaggedQuestions.includes(question.id);
                const isCurrent = currentQuestionIndex === index;

                return (
                  <button
                    key={question.id}
                    onClick={() => goToQuestion(index)}
                    className={`h-9 w-9 rounded flex items-center justify-center text-sm font-medium
                      ${isCurrent ? "ring-2 ring-blue-600" : ""}
                      ${
                        isAnswered
                          ? "bg-green-500 text-white"
                          : isFlagged
                          ? "bg-orange-100 text-orange-800 border border-orange-300"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }
                    `}
                    title={isFlagged ? "Flagged for review" : ""}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-2">
                Progress: {answeredCount} of {questions.length} answered
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full transition-all duration-300"
                  style={{
                    width: `${(answeredCount / questions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-green-500 rounded mr-2"></div>
                <span>Answered</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-orange-100 border border-orange-300 rounded mr-2"></div>
                <span>Flagged for review</span>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-100 rounded mr-2"></div>
                <span>Not answered</span>
              </div>
            </div>

            <button
              onClick={() => handleSubmitExam()}
              className="w-full bg-green-600 text-white py-2 px-4 rounded font-medium hover:bg-green-700 transition duration-150"
            >
              Submit Exam
            </button>
          </div>
        )}
      </div>

      {/* Bottom navigation bar for mobile */}
      {!examSubmitted && (
        <div className="md:hidden flex justify-between items-center bg-white border-t border-gray-200 p-3 sticky bottom-0">
          <div>
            <span className="text-sm text-gray-600">
              {answeredCount}/{questions.length} answered
            </span>
            <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
              <div
                className="bg-green-500 h-1.5 rounded-full"
                style={{
                  width: `${(answeredCount / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <button
            onClick={() => handleSubmitExam()}
            className="bg-green-600 text-white py-1.5 px-3 text-sm rounded font-medium hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CBEInterface;
