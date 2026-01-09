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

  // Firebase ကနေ Lessons တွေကို ဆွဲယူတဲ့အပိုင်း
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessons"));
        const data = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        }));
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">သင်ခန်းစာများ ရယူနေပါသည်...</div>;
  if (lessons.length === 0) return <div className="p-10 text-center">Firebase တွင် data ရှာမတွေ့ပါ။</div>;

  const currentLesson = lessons[currentIdx];

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-extrabold text-blue-900">Dr. Tun Pharmacy School</h1>
          <p className="text-slate-500">ယနေ့လေ့လာရန် - {currentLesson.title}</p>
        </header>

        {/* Lesson ရွေးရန် ခလုတ်များ */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide">
          {lessons.map((lesson, index) => (
            <button
              key={lesson.id}
              onClick={() => setCurrentIdx(index)}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                currentIdx === index 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-white text-blue-600 border border-blue-100 hover:bg-blue-50'
              }`}
            >
              {lesson.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-2 shadow-sm rounded-2xl overflow-hidden">
            <VideoSection videoUrl={currentLesson.videoUrl} />
          </div>
          
          {/* Flashcard နှင့် Quiz Section */}
          <div className="space-y-8">
            <Flashcard cards={currentLesson.flashcards || []} />
            <Quiz questions={currentLesson.quiz || []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;