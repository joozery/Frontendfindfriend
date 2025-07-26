import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { ActivityProvider } from '@/context/ActivityContext';
import { AuthProvider } from '@/context/AuthContext';
import HomePage from '@/pages/HomePage';
import SubscriptionPage from '@/pages/SubscriptionPage';
import AdminDashboard from '@/pages/AdminDashboard';
import ProfilePage from '@/pages/ProfilePage';
import ActivityPage from '@/pages/ActivityPage';
import ActivityDetailPage from '@/pages/ActivityDetailPage';

function App() {
  return (
    <AuthProvider>
      <ActivityProvider>
        <Router>
          <Helmet>
            <title>FindFriend - ระบบจองสมาชิกหาเพื่อนทำกิจกรรม</title>
            <meta name="description" content="แพลตฟอร์มหาเพื่อนทำกิจกรรมต่างๆ เช่น เที่ยว ทำบุญ กินข้าว ถ่ายรูป พร้อมระบบสมาชิกรายเดือน/รายปี" />
          </Helmet>
          
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/subscription" element={<SubscriptionPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/activities" element={<ActivityPage />} />
              <Route path="/activity/:id" element={<ActivityDetailPage />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ActivityProvider>
    </AuthProvider>
  );
}

export default App;