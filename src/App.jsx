import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import VideoSection from './components/VideoSection';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';

function App() {
  const [lessons, setLessons] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExercises, setShowExercises] = useState(false);

  // --- သင်ခန်းစာများ အမြောက်အမြား တစ်ခါတည်းတင်မည့် Function ---
  const seedData = async () => {
    const courseData = [
      {
        title: "ဆေးညွှန်းစာဖတ်နည်း အခြေခံ",
        videoUrl: "https://www.youtube.com/watch?v=8Rpa_TKi1EM",
        flashcards: [{ front: "℞ ဆိုတာ ဘာလဲ?", back: "Recipe (ဆေးညွှန်းသည်)" }],
        quiz: [{ question: "pc ဆိုသည်မှာ?", options: ["အစာမစားမီ", "အစာစားပြီး"], correctAnswer: "အစာစားပြီး" }]
      },
      {
        title: "ဆေးဝါးဗေဒ (Pharmacology) အခြေခံ",
        videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID_HERE",
        flashcards: [{ front: "Analgesics ဆိုတာ?", back: "အကိုက်အခဲပျောက်ဆေး" }],
        quiz: [{ question: "Paracetamol သည်?", options: ["အကိုက်အခဲပျောက်ဆေး", "ပိုးသတ်ဆေး"], correctAnswer: "အကိုက်အခဲပျောက်ဆေး" }]
      }
      // သင်ခန်းစာများ ထပ်တိုးလိုပါက ဤနေရာတွင် Object များ ထပ်ထည့်ပါ
    ];

    try {
      for (const item of courseData) {
        await addDoc(collection(db, "lessons"), item);
      }
      alert("ဒေတာများ အောင်မြင်စွာ တင်ပြီးပါပြီ! Refresh လုပ်ပေးပါ။");
    } catch (e) { alert("Error: " + e.message); }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessons"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLessons(data);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    };
    fetchLessons();
  }, []);

  useEffect(() => { setShowExercises(false); }, [currentIdx]);

  if (loading) return <div className="p-20 text-center font-bold">ခေတ္တစောင့်ပါ...</div>;
  const currentLesson = lessons[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white p-4 shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black text-blue-900">DR. TUN PHARMACY</h1>
          {/* ဒေတာတင်ရန်ခလုတ် (ဒေတာတင်ပြီးပါက ဤ Button ကို ဖျက်ပစ်ပါ) */}
          <button onClick={seedData} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded">Seed Data</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar - သင်ခန်းစာ ခေါင်းစဉ်များ */}
        <div className="lg:col-span-3 space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase ml-2 mb-4">သင်ခန်းစာများ</h2>
          {lessons.map((lesson, index) => (
            <button key={lesson.id} onClick={() => setCurrentIdx(index)}
              className={`w-full text-left p-4 rounded-2xl font-bold transition-all ${currentIdx === index ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-100'}`}>
              {index + 1}။ {lesson.title}
            </button>
          ))}
        </div>

        {/* Video Player */}
        <div className="lg:col-span-6 space-y-6">
          <VideoSection videoUrl={currentLesson?.videoUrl} onComplete={() => setShowExercises(true)} />
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800">{currentLesson?.title}</h2>
          </div>
        </div>

        {/* Exercises - Quiz/Flashcard */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xs font-bold text-slate-400 uppercase ml-2">လေ့ကျင့်ခန်း</h2>
          {showExercises ? (
            <div className="space-y-6 animate-fadeIn">
              <Flashcard cards={currentLesson?.flashcards || []} />
              <Quiz questions={currentLesson?.quiz || []} />
            </div>
          ) : (
            <div className="p-10 bg-slate-100 rounded-3xl text-center border-2 border-dashed border-slate-200 text-slate-400 font-bold text-sm">
              ဗီဒီယိုကြည့်ပြီးမှ လေ့ကျင့်ခန်းများ ပွင့်လာပါမည်။
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;