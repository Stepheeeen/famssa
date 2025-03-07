import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CBEInterface = () => {
  // State for exam data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(7200); // 2 hours in seconds
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const navigate = useNavigate();

  // Sample exam data
  const examData = {
    title: "CBE Examination",
    totalQuestions: 20,
    questions: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      text: `This is question ${
        i + 1
      }. A patient presents with the following symptoms...`,
      options: [
        { id: "A", text: `Option A for question ${i + 1}` },
        { id: "B", text: `Option B for question ${i + 1}` },
        { id: "C", text: `Option C for question ${i + 1}` },
        { id: "D", text: `Option D for question ${i + 1}` },
      ],
      correctAnswer: String.fromCharCode(65 + Math.floor(Math.random() * 4)), // Random correct answer for demo
    })),
  };

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !examSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, examSubmitted]);

  // Format time from seconds to HH:MM:SS
  const formatTime = (seconds: any) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle question navigation
  const goToQuestion = (index: any) => {
    if (index >= 0 && index < examData.totalQuestions) {
      setCurrentQuestionIndex(index);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: any, optionId: any) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    });
  };

  // Toggle flagged status
  const toggleFlagged = (questionId: number) => {
    if (flaggedQuestions.includes(questionId)) {
      setFlaggedQuestions(flaggedQuestions.filter((id) => id !== questionId));
    } else {
      setFlaggedQuestions([...flaggedQuestions, questionId]);
    }
  };

  // Calculate score
  const calculateScore = () => {
    let correctCount = 0;
    examData.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    const scorePercentage = Math.round(
      (correctCount / examData.totalQuestions) * 100
    );
    return { correctCount, scorePercentage };
  };

  // Handle exam submission
  const handleSubmitExam = () => {
    if (
      window.confirm(
        `You've answered ${Object.keys(answers).length} of ${
          examData.totalQuestions
        } questions. Submit exam?`
      )
    ) {
      const { scorePercentage } = calculateScore();
      setExamScore(scorePercentage);
      setExamSubmitted(true);
    }
  };

  // Handle retake exam
  const handleRetakeExam = () => {
    setAnswers({});
    setFlaggedQuestions([]);
    setCurrentQuestionIndex(0);
    setTimeRemaining(7200);
    setExamSubmitted(false);
    setExamScore(0);
  };

  // Get current question
  const currentQuestion = examData.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with exam info and timer */}
      <header className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{examData.title}</h1>
          {!examSubmitted && (
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="font-medium">{formatTime(timeRemaining)}</span>
            </div>
          )}
        </div>
      </header>

      {/* Main exam content */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Question area - main content */}
        <div className="flex-1 p-6">
          {examSubmitted ? (
            <div className="text-center p-8 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-4">
                Exam Submitted Successfully
              </h2>

              {/* Score display */}
              <div className="mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {examScore}%
                </div>
                <p className="text-gray-600">
                  You answered {calculateScore().correctCount} out of{" "}
                  {examData.totalQuestions} questions correctly
                </p>
              </div>

              {/* Score visualization */}
              <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-4 mb-8">
                <div
                  className={`h-4 rounded-full ${
                    examScore >= 70
                      ? "bg-green-500"
                      : examScore >= 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${examScore}%` }}
                ></div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-4">
                <button
                  onClick={handleRetakeExam}
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                  Retake Exam
                </button>
                <button
                  onClick={() => {
                    navigate("/cbe");
                  }}
                  className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700"
                >
                  Take Another Exam
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">
                  Question {currentQuestion.id} of {examData.totalQuestions}
                </h2>
                <button
                  onClick={() => toggleFlagged(currentQuestion.id)}
                  className={`flex items-center ${
                    flaggedQuestions.includes(currentQuestion.id)
                      ? "text-orange-500"
                      : "text-gray-500"
                  }`}
                >
                  <Flag className="h-5 w-5 mr-1" />
                  <span className="text-sm">Flag</span>
                </button>
              </div>

              <p className="text-gray-800 mb-6">{currentQuestion.text}</p>

              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-3 rounded border cursor-pointer
                      ${
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
                    <span>
                      {option.id}. {option.text}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => goToQuestion(currentQuestionIndex - 1)}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center px-4 py-2 rounded ${
                    currentQuestionIndex === 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous
                </button>

                <button
                  onClick={() => goToQuestion(currentQuestionIndex + 1)}
                  disabled={
                    currentQuestionIndex === examData.totalQuestions - 1
                  }
                  className={`flex items-center px-4 py-2 rounded ${
                    currentQuestionIndex === examData.totalQuestions - 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar - simplified question navigator */}
        {!examSubmitted && (
          <div className="w-full md:w-64 bg-white border-t md:border-t-0 md:border-l border-gray-200 p-4">
            <h2 className="font-medium text-gray-800 mb-4">Questions</h2>

            <div className="grid grid-cols-5 gap-2 mb-6">
              {examData.questions.map((question, index) => {
                const isAnswered = answers[question.id] !== undefined;
                const isFlagged = flaggedQuestions.includes(question.id);

                return (
                  <button
                    key={question.id}
                    onClick={() => goToQuestion(index)}
                    className={`h-8 w-8 rounded flex items-center justify-center text-sm
                      ${
                        currentQuestionIndex === index
                          ? "ring-2 ring-blue-600"
                          : ""
                      }
                      ${isAnswered ? "bg-green-500 text-white" : "bg-gray-200"}
                      ${isFlagged ? "ring-2 ring-orange-400" : ""}
                    `}
                  >
                    {question.id}
                  </button>
                );
              })}
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-600 mb-2">
                Progress: {Object.keys(answers).length} of{" "}
                {examData.totalQuestions} answered
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (Object.keys(answers).length / examData.totalQuestions) *
                      100
                    }%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={handleSubmitExam}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded font-medium hover:bg-blue-700"
            >
              Submit Exam
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CBEInterface;
