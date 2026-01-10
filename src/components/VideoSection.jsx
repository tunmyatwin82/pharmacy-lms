import React from 'react';

const VideoSection = ({ videoUrl, onComplete }) => {
  // YouTube URL မှ ID ကို ထုတ်ယူပြီး Embed Link ပြောင်းပေးသည့် Logic
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}?rel=0&modestbranding=1` 
      : null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="space-y-6">
      <div className="w-full aspect-video bg-black rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative">
        {embedUrl ? (
          <iframe
            width="100%"
            height="100%"
            src={embedUrl}
            title="Pharmacy Course Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            ဗီဒီယို ပြင်ဆင်နေပါသည်...
          </div>
        )}
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <h3 className="font-bold text-blue-900 text-lg">လေ့လာရန်အကြံပြုချက်</h3>
          <p className="text-blue-700">ဗီဒီယိုကို အဆုံးထိကြည့်ပြီးလျှင် အောက်ကခလုတ်ကို နှိပ်ပြီး လေ့ကျင့်ခန်းများ ဆက်လုပ်ပါ။</p>
        </div>
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-3xl font-black text-xl shadow-xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-3"
      >
        <span>ကြည့်ပြီးပြီ (လေ့ကျင့်ခန်းလုပ်မယ်)</span>
        <span className="text-2xl">→</span>
      </button>
    </div>
  );
};

export default VideoSection;