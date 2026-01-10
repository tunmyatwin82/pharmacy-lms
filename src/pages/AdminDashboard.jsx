import { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "lessons"), {
        title,
        videoUrl,
        flashcards: [], // အစပိုင်းမှာ အလွတ်ထားမည် (AI အတွက် ပြင်ဆင်မှု)
        quiz: []
      });
      alert("သင်ခန်းစာ အသစ်တင်ပြီးပါပြီ!");
      setTitle(''); setVideoUrl('');
    } catch (err) { alert(err.message); }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-black text-slate-800 mb-6">Admin Dashboard</h2>
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-500 mb-4 uppercase text-xs tracking-widest">Add New Lesson</h3>
          <form onSubmit={handleAddLesson} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Lesson Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500" placeholder="ဥပမာ - ဆေးညွှန်းစာဖတ်နည်း" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">YouTube URL</label>
              <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500" placeholder="https://www.youtube.com/watch?v=..." required />
            </div>
            <button disabled={loading} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-blue-200 shadow-lg">
              {loading ? "တင်နေပါသည်..." : "သင်ခန်းစာ တင်မည်"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;