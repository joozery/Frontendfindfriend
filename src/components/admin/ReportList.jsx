
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const ReportList = ({ reports }) => {
  const { toast } = useToast();

  const handleReportAction = (reportId, action) => {
    toast({
      title: `🚧 การจัดการรายงาน (${action})`,
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
    <div className="space-y-4">
      {reports.map((report) => (
        <div key={report.id} className="p-4 bg-gray-100 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                report.status === 'pending' ? 'bg-red-500' :
                report.status === 'investigating' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <h4 className="font-medium text-gray-800">{report.title}</h4>
              <Badge className={`${
                report.type === 'user' ? 'bg-blue-500 text-white' :
                report.type === 'activity' ? 'bg-purple-500 text-white' : 'bg-orange-500 text-white'
              }`}>
                {report.type === 'user' ? 'ผู้ใช้' :
                 report.type === 'activity' ? 'กิจกรรม' : 'การชำระเงิน'}
              </Badge>
            </div>
            <span className="text-sm text-gray-500">{formatDate(report.date)}</span>
          </div>
          
          <div className="text-sm text-gray-600 mb-3">
            <p>ผู้รายงาน: {report.reporter}</p>
            <p>เรื่องที่รายงาน: {report.reported}</p>
          </div>

          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 text-gray-700"
              onClick={() => handleReportAction(report.id, 'investigate')}
            >
              ตรวจสอบ
            </Button>
            <Button 
              size="sm" 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleReportAction(report.id, 'resolve')}
            >
              แก้ไขแล้ว
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => handleReportAction(report.id, 'dismiss')}
            >
              ปิดเรื่อง
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReportList;
  