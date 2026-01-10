import { useState, useEffect } from 'react';

const Quiz = ({ questions = [] }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setIsStarted(false); setShowResult(false); setCurrentQ(0); setScore(0);
  }, [questions]);

  if (!questions.length) return null;

  const handleAnswer = (option) => {
    if (option === questions[currentQ].correctAnswer) setScore(score + 1);
    const nextQ = currentQ + 1;
    if (nextQ < questions.length) setCurrentQ(nextQ);
    else setShowResult(true);
  };

  if (!isStarted) return (
    <button onClick={() => setIsStarted(true)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg hover:bg-emerald-700">
      📝 Quiz ဖြေဆိုမယ်
    </button>
  );

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      {showResult ? (
        <div className="text-center font-bold">ရမှတ်: {score} / {questions.length}</div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-bold text-slate-800">{questions[currentQ].question}</h3>
          {questions[currentQ].options.map((opt, i) => (
            <button key={i} onClick={() => handleAnswer(opt)} className="w-full p-3 text-left border rounded-xl hover:bg-blue-50 transition font-medium">
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default Quiz;