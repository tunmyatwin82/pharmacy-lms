const VideoSection = ({ videoUrl, onComplete }) => {
  const getEmbedUrl = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div className="space-y-4">
      <div className="w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
        {embedUrl ? (
          <iframe width="100%" height="100%" src={embedUrl} frameBorder="0" allowFullScreen title="Video"></iframe>
        ) : <div className="flex items-center justify-center h-full text-white">Video Link မရှိပါ</div>}
      </div>
      <button onClick={onComplete} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">
        ကြည့်ပြီးပြီ (လေ့ကျင့်ခန်းလုပ်မယ်) →
      </button>
    </div>
  );
};
export default VideoSection;