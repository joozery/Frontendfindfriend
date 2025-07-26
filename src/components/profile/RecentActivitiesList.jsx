
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentActivitiesList = ({ activities, formatDate }) => {
  const navigate = useNavigate();

  return (
    <Card className="glass-effect p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">กิจกรรมล่าสุด</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{activity.title}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(activity.date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{activity.participants} คน</span>
                </div>
              </div>
            </div>
            <Badge className={activity.status === 'completed' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}>
              {activity.status === 'completed' ? 'เสร็จสิ้น' : 'กำลังมา'}
            </Badge>
          </div>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        className="w-full mt-4 border-gray-300 hover:bg-gray-100 text-gray-700"
        onClick={() => navigate('/activities')}
      >
        ดูกิจกรรมทั้งหมด
      </Button>
    </Card>
  );
};

export default RecentActivitiesList;
  