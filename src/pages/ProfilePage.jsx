
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

import { userProfile, recentActivitiesProfile } from '@/data/userProfileData';
import ProfileInfoCard from '@/components/profile/ProfileInfoCard';
import SubscriptionStatusCard from '@/components/profile/SubscriptionStatusCard';
import QuickActionsCard from '@/components/profile/QuickActionsCard';
import RecentActivitiesList from '@/components/profile/RecentActivitiesList';
import UserStatsCard from '@/components/profile/UserStatsCard';
import LineIntegrationCard from '@/components/profile/LineIntegrationCard';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const savedSubscription = localStorage.getItem('userSubscription');
    if (savedSubscription) {
      setSubscription(JSON.parse(savedSubscription));
    }
  }, []);

  const handleCancelSubscription = () => {
    if (subscription) {
      const updatedSubscription = { ...subscription, status: 'cancelled' };
      localStorage.setItem('userSubscription', JSON.stringify(updatedSubscription));
      setSubscription(updatedSubscription);
      
      toast({
        title: "ยกเลิกสมาชิกสำเร็จ",
        description: "คุณยังสามารถใช้งานได้จนครบรอบการชำระเงิน",
      });
    }
  };

  const handleRenewSubscription = () => {
    navigate('/subscription');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-effect sticky top-0 z-50 p-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับหน้าหลัก
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 line-green rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FindFriend</span>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProfileInfoCard userProfile={userProfile} formatDate={formatDate} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SubscriptionStatusCard 
                subscription={subscription} 
                handleCancelSubscription={handleCancelSubscription}
                handleRenewSubscription={handleRenewSubscription}
                getDaysRemaining={getDaysRemaining}
                formatDate={formatDate}
              />
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuickActionsCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <RecentActivitiesList activities={recentActivitiesProfile} formatDate={formatDate} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <UserStatsCard userProfile={userProfile} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <LineIntegrationCard />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
  