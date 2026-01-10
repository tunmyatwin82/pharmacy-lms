import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, getDocs, addDoc } from 'firebase/firestore'; // addDoc ပါဝင်ရပါမည်
import VideoSection from './components/VideoSection';
import Flashcard from './components/Flashcard';
import Quiz from './components/Quiz';

function App() {
  const [lessons, setLessons] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessons"));
        const lessonData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLessons(lessonData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLessons();
  }, []);

  if (loading) return <div className="p-10 text-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans">
      <div className="max-w-6xl mx-auto">
        
        

        {lessons.length > 0 ? (
          <>
            <header className="mb-8 text-center">
              <h1 className="text-3xl font-black text-blue-900">Dr. Tun Pharmacy School</h1>
              <p className="text-slate-500">{lessons[currentIdx].title}</p>
            </header>

            {/* Lesson Navigation */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-hide">
              {lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentIdx(index)}
                  className={`px-6 py-2 rounded-2xl font-bold whitespace-nowrap transition-all ${
                    currentIdx === index ? 'bg-blue-600 text-white scale-105' : 'bg-white text-blue-600 border'
                  }`}
                >
                  Lesson {index + 1}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <VideoSection videoUrl={lessons[currentIdx].videoUrl} />
              </div>
              <div className="space-y-8">
                <Flashcard cards={lessons[currentIdx].flashcards || []} />
                <Quiz questions={lessons[currentIdx].quiz || []} />
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-10">ဒေတာ မရှိသေးပါ။ အပေါ်က ခလုတ်ကို နှိပ်ပေးပါ။</div>
        )}
      </div>
    </div>
  );
}

export default App;