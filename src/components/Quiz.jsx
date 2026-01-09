import React from 'react';

const Quiz = ({ questions, onFinish }) => {
  const handleAnswer = (idx) => {
    let finalScore = 0;
    if (idx === questions[0].correct) finalScore = 1;
    onFinish(finalScore);
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 animate-fadeIn">
      <div className="mb-6">
        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">QUIZ TIME</span>
        <h2 className="text-xl font-bold mt-3 text-gray-800">{questions[0].q}</h2>
      </div>
      <div className="space-y-4">
        {questions[0].options.map((opt, idx) => (
          <button 
            key={idx}
            onClick={() => handleAnswer(idx)}
            className="w-full p-5 text-left border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;