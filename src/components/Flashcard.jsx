import React, { useState } from 'react';

const Flashcard = ({ cards, onComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col items-center animate-fadeIn">
      <div 
        onClick={() => setIsFlipped(!isFlipped)}
        className={`w-full h-64 cursor-pointer perspective-1000 transition-all duration-500`}
      >
        <div className={`relative w-full h-full text-center transition-all duration-500 shadow-xl rounded-3xl p-8 flex items-center justify-center border-2 ${isFlipped ? 'bg-green-50 border-green-200' : 'bg-white border-blue-200'}`}>
          <p className="text-2xl font-bold text-gray-800">
            {isFlipped ? cards[0].back : cards[0].front}
          </p>
          <span className="absolute bottom-4 text-xs text-gray-400">ကတ်ကိုနှိပ်ပြီး အဖြေကြည့်ပါ</span>
        </div>
      </div>
      <button 
        onClick={onComplete}
        className="w-full mt-10 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold shadow-lg"
      >
        မှတ်မိပြီ (Quiz ဖြေမယ်)
      </button>
    </div>
  );
};

export default Flashcard;