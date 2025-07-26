
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const UserTable = ({ users }) => {
  const { toast } = useToast();

  const handleUserAction = (userId, action) => {
    toast({
      title: `🚧 การจัดการผู้ใช้ (${action})`,
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
            <th className="text-left py-3 px-4 text-gray-600">ชื่อ</th>
            <th className="text-left py-3 px-4 text-gray-600">อีเมล</th>
            <th className="text-left py-3 px-4 text-gray-600">วันที่สมัคร</th>
            <th className="text-left py-3 px-4 text-gray-600">สมาชิก</th>
            <th className="text-left py-3 px-4 text-gray-600">สถานะ</th>
            <th className="text-left py-3 px-4 text-gray-600">การดำเนินการ</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 font-medium text-gray-800">{user.name}</td>
              <td className="py-3 px-4 text-gray-600">{user.email}</td>
              <td className="py-3 px-4 text-gray-600">{formatDate(user.joinDate)}</td>
              <td className="py-3 px-4">
                <Badge className={user.subscription === 'รายปี' ? 'line-green text-white' : 'bg-blue-500 text-white'}>
                  {user.subscription}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <Badge className={user.status === 'active' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}>
                  {user.status === 'active' ? 'ใช้งาน' : 'รอดำเนินการ'}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={() => handleUserAction(user.id, 'view')}
                  >
                    ดู
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={() => handleUserAction(user.id, 'edit')}
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

export default UserTable;
  