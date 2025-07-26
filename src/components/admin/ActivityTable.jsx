
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const ActivityTable = ({ activities }) => {
  const { toast } = useToast();

  const handleActivityAction = (activityId, action) => {
    toast({
      title: `🚧 การจัดการกิจกรรม (${action})`,
      description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 text-gray-600">ชื่อกิจกรรม</th>
            <th className="text-left py-3 px-4 text-gray-600">ผู้จัด</th>
            <th className="text-left py-3 px-4 text-gray-600">ผู้เข้าร่วม</th>
            <th className="text-left py-3 px-4 text-gray-600">วันที่</th>
            <th className="text-left py-3 px-4 text-gray-600">สถานะ</th>
            <th className="text-left py-3 px-4 text-gray-600">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">{activity.title}</td>
              <td className="py-3 px-4 text-gray-600">{activity.host}</td>
              <td className="py-3 px-4 text-gray-600">{activity.participants} คน</td>
              <td className="py-3 px-4 text-gray-600">{formatDate(activity.date)}</td>
              <td className="py-3 px-4">
                <Badge className={
                  activity.status === 'active' ? 'bg-green-500 text-white' :
                  activity.status === 'completed' ? 'bg-blue-500 text-white' : 'bg-yellow-500 text-white'
                }>
                  {activity.status === 'active' ? 'กำลังดำเนิน' :
                   activity.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={() => handleActivityAction(activity.id, 'view')}
                  >
                    ดู
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={() => handleActivityAction(activity.id, 'edit')}
                  >
                    แก้ไข
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTable;
  