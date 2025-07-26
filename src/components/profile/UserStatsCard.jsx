
import React from 'react';
import { Card } from '@/components/ui/card';

const UserStatsCard = ({ userProfile }) => (
  <Card className="glass-effect p-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">สถิติของคุณ</h3>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="text-center">
        <div className="text-2xl font-bold gradient-text">{userProfile.activitiesJoined}</div>
        <div className="text-sm text-gray-600">กิจกรรมที่เข้าร่วม</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold gradient-text">{userProfile.rating}</div>
        <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold gradient-text">8</div>
        <div className="text-sm text-gray-600">เพื่อนใหม่</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold gradient-text">3</div>
        <div className="text-sm text-gray-600">กิจกรรมที่สร้าง</div>
      </div>
    </div>
  </Card>
);

export default UserStatsCard;
  