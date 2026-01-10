// src/App.jsx (ဤကုဒ်ဖြင့် အကုန်အစားထိုးပါ)
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  if (initializing) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* လူတိုင်းကြည့်နိုင်သော ကျောင်းသားစာမျက်နှာ */}
        <Route path="/" element={<Home />} />

        {/* Login ဝင်ရန်စာမျက်နှာ */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard (Login ဝင်ထားမှသာ ဝင်ခွင့်ပေးမည်) */}
        <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;