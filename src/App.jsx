import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import VideoSection from './components/VideoSection';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';

function App() {
  const [lessons, setLessons] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showExercises, setShowExercises] = useState(false); // လေ့ကျင့်ခန်း ပွင့်/ပိတ် state

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessons"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  // သင်ခန်းစာအသစ်ပြောင်းတိုင်း လေ့ကျင့်ခန်းကို ပြန်ပိတ်ထားရန်
  useEffect(() => {
    setShowExercises(false);
  }, [currentIdx]);

  if (loading) return <div className="p-20 text-center font-bold text-blue-600">ဆေးဝါးဗေဒသင်ခန်းစာများ ရယူနေပါသည်...</div>;
  if (lessons.length === 0) return <div className="p-20 text-center">ဒေတာ မရှိသေးပါ။</div>;

  const currentLesson = lessons[currentIdx];

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans text-slate-900">
      {/* Top Header */}
      <nav className="bg-white border-b border-slate-200 p-4 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-blue-900 tracking-tighter">
            DR. TUN <span className="text-blue-500">PHARMACY</span>
          </h1>
          <div className="hidden md:flex gap-4 items-center">
             <span className="text-sm font-bold text-slate-400">COURSE PROGRESS</span>
             <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[20%]"></div>
             </div>
          </div>
        </div>
      </nav>

      <div className="max-w-[1400px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* လက်ဝဲဘက် - သင်ခန်းစာ မာတိကာ (Sidebar) */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">သင်ခန်းစာ မာတိကာ</h2>
          <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentIdx(index)}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 group flex items-start gap-3 ${
                  currentIdx === index 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 scale-[1.02]' 
                  : 'bg-white text-slate-600 hover:bg-white hover:shadow-md border border-transparent'
                }`}
              >
                <span className={`mt-1 text-xs font-black px-2 py-1 rounded-md ${currentIdx === index ? 'bg-blue-500' : 'bg-slate-100'}`}>
                  {index + 1}
                </span>
                <span className="font-bold leading-tight">{lesson.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* အလယ် - Video Player */}
        <div className="lg:col-span-6 space-y-6">
          <VideoSection 
            videoUrl={currentLesson.videoUrl} 
            onComplete={() => setShowExercises(true)} 
          />
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
             <h2 className="text-3xl font-black text-slate-800 mb-4">{currentLesson.title}</h2>
             <p className="text-slate-500 leading-relaxed font-medium">
               ဤသင်ခန်းစာကို သေသေချာချာ လေ့လာမှတ်သားပါ။ ဗီဒီယိုကြည့်ပြီးပါက အောက်ကခလုတ်ကို နှိပ်၍ 
               Flashcards နှင့် Quiz များကို ဖြေဆိုနိုင်ပါသည်။
             </p>
          </div>
        </div>

        {/* လက်ယာဘက် - လေ့ကျင့်ခန်းများ (Exercises) */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2">သင်ယူမှု အထောက်အကူ</h2>
          {showExercises ? (
            <div className="space-y-6 animate-fadeIn">
              <Flashcard cards={currentLesson.flashcards || []} />
              <Quiz questions={currentLesson.quiz || []} />
            </div>
          ) : (
            <div className="bg-white/50 backdrop-blur-sm p-10 rounded-[2rem] border-4 border-dashed border-slate-200 text-center">
              <div className="text-4xl mb-4 opacity-30">🔒</div>
              <p className="text-slate-400 font-bold leading-snug">
                ဗီဒီယိုကြည့်ပြီးမှ<br/>လေ့ကျင့်ခန်းများ ပွင့်လာပါမည်။
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;