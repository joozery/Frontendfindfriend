
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Crown, Settings } from 'lucide-react';

const SubscriptionStatusCard = ({ subscription, handleCancelSubscription, handleRenewSubscription, getDaysRemaining, formatDate }) => {
  const { toast } = useToast();

  return (
    <Card className="glass-effect p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Crown className="w-5 h-5 text-yellow-400" />
        <h3 className="text-lg font-semibold text-gray-800">สถานะสมาชิก</h3>
      </div>

      {subscription ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-gray-700">
            <span>แพ็ก:</span>
            <Badge className="line-green text-white">{subscription.plan}</Badge>
          </div>
          
          <div className="flex items-center justify-between text-gray-700">
            <span>สถานะ:</span>
            <Badge className={subscription.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>
              {subscription.status === 'active' ? 'ใช้งานอยู่' : 'ยกเลิกแล้ว'}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span>หมดอายุ:</span>
            <span className="text-sm">{formatDate(subscription.endDate)}</span>
          </div>

          {subscription.status === 'active' && (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                เหลืออีก {getDaysRemaining(subscription.endDate)} วัน
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-gray-300 hover:bg-gray-100 text-gray-700"
                  onClick={() => toast({
                    title: "🚧 การจัดการการต่ออายุ",
                    description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
                  })}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  จัดการการต่ออายุ
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full"
                  onClick={handleCancelSubscription}
                >
                  ยกเลิกสมาชิก
                </Button>
              </div>
            </div>
          )}

          {subscription.status === 'cancelled' && (
            <Button 
              className="w-full line-green text-white"
              onClick={handleRenewSubscription}
            >
              <Crown className="w-4 h-4 mr-2" />
              ต่ออายุสมาชิก
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-gray-600">คุณยังไม่ได้เป็นสมาชิก</p>
          <Button 
            className="w-full line-green text-white"
            onClick={handleRenewSubscription}
          >
            <Crown className="w-4 h-4 mr-2" />
            สมัครสมาชิก
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SubscriptionStatusCard;
  