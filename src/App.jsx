import React, { useState } from 'react';
import VideoSection from './components/VideoSection';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';

const App = () => {
  const [step, setStep] = useState('video');
  const [finalScore, setFinalScore] = useState(0);

  const lessonData = {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    flashcards: [{ front: "Amoxicillin", back: "ပိုးသတ်ဆေး (Antibiotic)" }],
    quiz: [{ q: "Amoxicillin သည် ဘာအတွက်သုံးသလဲ?", options: ["အကိုက်အခဲပျောက်ရန်", "ပိုးသတ်ရန်", "ဗီတာမင်"], correct: 1 }]
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-blue-900">Pharmacy School</h1>
          <p className="text-sm text-gray-500 font-medium">Lesson 1: Basics</p>
        </div>
      </div>

      {/* Main Content */}
      {step === 'video' && (
        <VideoSection videoUrl={lessonData.videoUrl} onComplete={() => setStep('flashcards')} />
      )}

      {step === 'flashcards' && (
        <Flashcard cards={lessonData.flashcards} onComplete={() => setStep('quiz')} />
      )}

      {step === 'quiz' && (
        <Quiz questions={lessonData.quiz} onFinish={(score) => {
          setFinalScore(score);
          setStep('result');
        }} />
      )}

      {step === 'result' && (
        <div className="text-center bg-white p-10 rounded-3xl shadow-2xl animate-bounceIn">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800">အောင်မြင်ပါတယ်!</h2>
          <p className="text-gray-500 mt-2">ရမှတ်: <span className="text-blue-600 font-bold">{finalScore} / 1</span></p>
          <button 
            onClick={() => setStep('video')}
            className="mt-8 text-blue-600 font-bold hover:underline"
          >
            ပြန်လည်လေ့လာရန်
          </button>
        </div>
      )}
    </div>
  );
};

export default App;