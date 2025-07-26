
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { 
  Calendar, 
  MessageCircle, 
  Bell, 
  Settings
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActionsCard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <Card className="glass-effect p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">การดำเนินการด่วน</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          variant="outline" 
          className="flex flex-col items-center space-y-2 h-auto py-4 border-gray-300 hover:bg-gray-100 text-gray-700"
          onClick={() => navigate('/activities')}
        >
          <Calendar className="w-6 h-6" />
          <span className="text-sm">หากิจกรรม</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col items-center space-y-2 h-auto py-4 border-gray-300 hover:bg-gray-100 text-gray-700"
          onClick={() => toast({
            title: "🚧 การแชท",
            description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
          })}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-sm">แชท</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col items-center space-y-2 h-auto py-4 border-gray-300 hover:bg-gray-100 text-gray-700"
          onClick={() => toast({
            title: "🚧 การแจ้งเตือน",
            description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
          })}
        >
          <Bell className="w-6 h-6" />
          <span className="text-sm">การแจ้งเตือน</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col items-center space-y-2 h-auto py-4 border-gray-300 hover:bg-gray-100 text-gray-700"
          onClick={() => toast({
            title: "🚧 การตั้งค่า",
            description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
          })}
        >
          <Settings className="w-6 h-6" />
          <span className="text-sm">ตั้งค่า</span>
        </Button>
      </div>
    </Card>
  );
};

export default QuickActionsCard;
  