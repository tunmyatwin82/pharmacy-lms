import React, { useState } from 'react';
import { db } from './firebaseConfig';
import VideoSection from './components/VideoSection';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';
import { collection, addDoc } from 'firebase/firestore';

const App = () => {
  const [step, setStep] = useState('video');
  const [finalScore, setFinalScore] = useState(0);

  const lessonData = {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    flashcards: [{ front: "Amoxicillin", back: "ပိုးသတ်ဆေး (Antibiotic)" }],
    quiz: [{ q: "Amoxicillin သည် ဘာအတွက်သုံးသလဲ?", options: ["အကိုက်အခဲပျောက်ရန်", "ပိုးသတ်ရန်", "ဗီတာမင်"], correct: 1 }]
  };
  // App component ထဲမှာ ဒီ function လေးကို ထည့်ပါ
const seedData = async () => {
  const lessons = [
    {
      title: "Antibiotics (ပိုးသတ်ဆေးများ) အခြေခံ",
      videoUrl: "https://www.youtube.com/watch?v=XhZp9S1P0Sg",
      flashcards: [
        { front: "Antibiotic ဆိုတာ ဘာလဲ?", back: "Bacteria ပိုးမွှားများကို သတ်ပေးသော ဆေး" },
        { front: "Amoxicillin သည် မည်သည့်အုပ်စုဝင်လဲ?", back: "Penicillin Group" }
      ],
      quiz: [
        {
          question: "Penicillin နှင့် မတည့်သူ (Allergy ရှိသူ) ကို မည်သည့်ဆေး မပေးသင့်သလဲ?",
          options: ["Amoxicillin", "Azithromycin", "Ciprofloxacin"],
          correctAnswer: "Amoxicillin"
        }
      ]
    },
    {
      title: "Hypertension (သွေးတိုးရောဂါ) ကုထုံးများ",
      videoUrl: "https://www.youtube.com/watch?v=7X8iL8vXGyo",
      flashcards: [
        { front: "Normal Blood Pressure က ဘယ်လောက်လဲ?", back: "120/80 mmHg" },
        { front: "Amlodipine သည် မည်သည့်ဆေးအုပ်စုလဲ?", back: "Calcium Channel Blocker (CCB)" }
      ],
      quiz: [
        {
          question: "သွေးတိုးဆေးကို ပုံမှန်အားဖြင့် မည်သည့်အချိန်တွင် သောက်လေ့ရှိသလဲ?",
          options: ["မနက်စာစားပြီး", "ညအိပ်ခါနီး", "ဗိုက်ထဲစာမရှိခင်"],
          correctAnswer: "မနက်စာစားပြီး"
        }
      ]
    }
  ];

  try {
    for (const lesson of lessons) {
      await addDoc(collection(db, "lessons"), lesson);
    }
    alert("သင်ခန်းစာအားလုံး တင်ပြီးပါပြီ!");
  } catch (err) {
    alert("Error: " + err.message);
  }
};
  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-6">

      {/* ခလုတ်ကို ဒီနေရာမှာ (Header အပေါ်မှာ) ခေတ္တ ထည့်ထားပါ */}
        <button 
          onClick={seedData}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg m-4 hover:bg-orange-600 transition shadow-lg font-bold"
        >
          🚀 သင်ခန်းစာဒေတာများ Firebase သို့ တင်မည်
        </button>

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