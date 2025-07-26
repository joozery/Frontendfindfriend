
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  MessageCircle, 
  Settings
} from 'lucide-react';

const LineIntegrationCard = () => {
  const { toast } = useToast();

  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageCircle className="w-5 h-5 text-green-500" />
        <h3 className="text-lg font-semibold text-gray-800">การเชื่อมต่อ LINE</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between text-gray-700">
          <span>LINE OA:</span>
          <Badge className="bg-green-500 text-white">เชื่อมต่อแล้ว</Badge>
        </div>
        
        <div className="flex items-center justify-between text-gray-700">
          <span>การแจ้งเตือน:</span>
          <Badge className="bg-green-500 text-white">เปิดใช้งาน</Badge>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-gray-300 hover:bg-gray-100 text-gray-700"
          onClick={() => toast({
            title: "🚧 การจัดการ LINE",
            description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
          })}
        >
          <Settings className="w-4 h-4 mr-2" />
          จัดการการแจ้งเตือน
        </Button>
      </div>
    </Card>
  );
};

export default LineIntegrationCard;
  