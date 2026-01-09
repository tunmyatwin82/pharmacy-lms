import React from 'react';
import ReactPlayer from 'react-player';

const VideoSection = ({ videoUrl, onComplete }) => {
  return (
    <div className="animate-fadeIn">
      <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
        <ReactPlayer url={videoUrl} width="100%" height="220px" controls />
      </div>
      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
        <h3 className="font-bold text-blue-800">💡 လေ့လာရန်အကြံပြုချက်</h3>
        <p className="text-sm text-blue-600">ဗီဒီယိုကို အဆုံးထိကြည့်ပြီးလျှင် အောက်ကခလုတ်ကို နှိပ်ပါ။</p>
      </div>
      <button 
        onClick={onComplete}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all"
      >
        ကြည့်ပြီးပြီ (Flashcards လေ့ကျင့်မယ်)
      </button>
    </div>
  );
};

export default VideoSection;