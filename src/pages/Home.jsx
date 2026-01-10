import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import VideoSection from '../components/VideoSection';
import Flashcard from '../components/Flashcard';
import Quiz from '../components/Quiz';

const Home = () => {
  const [lessons, setLessons] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExercises, setShowExercises] = useState(false);

  const seedData = async () => {
    const courseData = [
      {
        title: "ဆေးညွှန်းစာဖတ်နည်း အခြေခံ",
        videoUrl: "https://www.youtube.com/watch?v=8Rpa_TKi1EM",
        flashcards: [{ front: "℞ ဆိုတာ ဘာလဲ?", back: "Recipe (ဆေးညွှန်းသည်)" }],
        quiz: [{ 
          question: "pc ဆိုသည်မှာ?", 
          options: ["အစာမစားမီ", "အစာစားပြီး"], 
          correctAnswer: "အစာစားပြီး" 
        }]
      }
    ];

    try {
      for (const item of courseData) {
        await addDoc(collection(db, "lessons"), item);
      }
      alert("ဒေတာများ အောင်မြင်စွာ တင်ပြီးပါပြီ!");
    } catch (e) { 
      alert("Error: " + e.message); 
    }
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessons"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLessons(data);
      } catch (error) { 
        console.error(error); 
      } finally { 
        setLoading(false); 
      }
    };
    fetchLessons();
  }, []);

  useEffect(() => { 
    setShowExercises(false); 
  }, [currentIdx]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-xl font-bold text-blue-600 animate-pulse">ခေတ္တစောင့်ပါ...</div>
    </div>
  );

  if (lessons.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <p className="mb-4 font-bold">သင်ခန်းစာ မရှိသေးပါ။</p>
      <button onClick={seedData} className="bg-red-500 text-white px-6 py-2 rounded-xl font-bold">
        ဒေတာ စတင်တင်သွင်းမည် (Seed Data)
      </button>
    </div>
  );

  const currentLesson = lessons[currentIdx];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <nav className="bg-white p-4 shadow-sm sticky top-0 z-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black text-blue-900 tracking-tighter">DR. TUN PHARMACY</h1>
          <div className="flex gap-4 items-center">
             <div className="hidden md:block text-xs font-bold text-slate-400 uppercase">Course Progress</div>
             <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[20%]"></div>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-4">သင်ခန်းစာ မာတိကာ</h2>
          <div className="space-y-2">
            {lessons.map((lesson, index) => (
              <button 
                key={lesson.id} 
                onClick={() => setCurrentIdx(index)}
                className={`w-full text-left p-4 rounded-2xl font-bold transition-all duration-300 flex items-start gap-3 ${
                  currentIdx === index 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]' 
                  : 'bg-white text-slate-600 hover:bg-white hover:shadow-md border border-slate-50'
                }`}
              >
                <span className={`mt-0.5 text-[10px] px-2 py-0.5 rounded ${currentIdx === index ? 'bg-blue-500' : 'bg-slate-100'}`}>
                  {index + 1}
                </span>
                <span className="flex-1 leading-tight">{lesson.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Player */}
        <div className="lg:col-span-6 space-y-6">
          <VideoSection 
            videoUrl={currentLesson?.videoUrl} 
            onComplete={() => setShowExercises(true)} 
          />
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-slate-800 mb-4">{currentLesson?.title}</h2>
            <p className="text-slate-500 leading-relaxed font-medium">
               ဤသင်ခန်းစာကို အဆုံးထိလေ့လာပါ။ ပြီးနောက် "ကြည့်ပြီးပြီ" ကိုနှိပ်၍ ညာဘက်ရှိ လေ့ကျင့်ခန်းများကို ဖြေဆိုပါ။
            </p>
          </div>
        </div>

        {/* Exercises Section */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 font-bold">သင်ယူမှု အထောက်အကူ</h2>
          
          {showExercises ? (
            <div className="space-y-6">
              <Flashcard cards={currentLesson?.flashcards || []} />
              <Quiz questions={currentLesson?.quiz || []} />
            </div>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm p-12 rounded-[2.5rem] border-4 border-dashed border-slate-200 text-center">
              <div className="text-4xl mb-4 grayscale opacity-30">🔒</div>
              <p className="text-slate-400 font-bold text-sm leading-snug">
                ဗီဒီယိုကြည့်ပြီးမှ<br/>လေ့ကျင့်ခန်းများ ပွင့်လာပါမည်။
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;