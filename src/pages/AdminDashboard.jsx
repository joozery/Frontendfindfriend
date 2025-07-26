
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Bell,
  Settings,
  BarChart3,
  Crown,
  AlertTriangle,
  Shield
} from 'lucide-react';

import { adminStats, recentUsersData, recentActivitiesData, reportsData } from '@/data/adminData';
import StatsCard from '@/components/admin/StatsCard';
import UserTable from '@/components/admin/UserTable';
import ActivityTable from '@/components/admin/ActivityTable';
import ReportList from '@/components/admin/ReportList';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(amount);
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
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Admin Dashboard</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-700 hover:bg-gray-100"
              onClick={() => toast({
                title: "🚧 การแจ้งเตือน",
                description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
              })}
            >
              <Bell className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-700 hover:bg-gray-100"
              onClick={() => toast({
                title: "🚧 การตั้งค่า",
                description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
              })}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">
            แดชบอร์ด<span className="gradient-text">แอดมิน</span>
          </h1>
          <p className="text-gray-600">จัดการระบบ FindFriend และติดตามสถิติการใช้งาน</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
        >
          <StatsCard icon={Users} title="ผู้ใช้ทั้งหมด" value={adminStats.totalUsers.toLocaleString()} color="bg-blue-500" />
          <StatsCard icon={Crown} title="สมาชิกใช้งาน" value={adminStats.activeSubscriptions.toLocaleString()} color="line-green" />
          <StatsCard icon={DollarSign} title="รายได้เดือนนี้" value={formatCurrency(adminStats.monthlyRevenue)} color="bg-green-500" />
          <StatsCard icon={Calendar} title="กิจกรรมทั้งหมด" value={adminStats.totalActivities} color="bg-purple-500" />
          <StatsCard icon={TrendingUp} title="สมัครใหม่" value={`+${adminStats.newSignups}`} color="bg-orange-500" />
          <StatsCard icon={AlertTriangle} title="รายงานรอ" value={adminStats.pendingReports} color="bg-red-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="glass-effect p-1">
              <TabsTrigger value="users" className="data-[state=active]:bg-gray-100">
                <Users className="w-4 h-4 mr-2" />
                ผู้ใช้
              </TabsTrigger>
              <TabsTrigger value="activities" className="data-[state=active]:bg-gray-100">
                <Calendar className="w-4 h-4 mr-2" />
                กิจกรรม
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-gray-100">
                <AlertTriangle className="w-4 h-4 mr-2" />
                รายงาน
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-100">
                <BarChart3 className="w-4 h-4 mr-2" />
                สถิติ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="users">
              <Card className="glass-effect p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">ผู้ใช้ล่าสุด</h3>
                  <Button 
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={() => toast({
                      title: "🚧 ส่งออกข้อมูล",
                      description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
                    })}
                  >
                    ส่งออกข้อมูล
                  </Button>
                </div>
                <UserTable users={recentUsersData} />
              </Card>
            </TabsContent>

            <TabsContent value="activities">
              <Card className="glass-effect p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">กิจกรรมล่าสุด</h3>
                  <Button 
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={() => toast({
                      title: "🚧 สร้างกิจกรรม",
                      description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
                    })}
                  >
                    สร้างกิจกรรม
                  </Button>
                </div>
                <ActivityTable activities={recentActivitiesData} />
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card className="glass-effect p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">รายงานและข้อร้องเรียน</h3>
                  <div className="flex space-x-2">
                    <Badge className="bg-red-500 text-white">
                      {reportsData.filter(r => r.status === 'pending').length} รอดำเนินการ
                    </Badge>
                  </div>
                </div>
                <ReportList reports={reportsData} />
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass-effect p-6">
                  <h3 className="text-xl font-semibold mb-4">สถิติการใช้งานรายเดือน</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">กราฟสถิติจะแสดงที่นี่</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 border-gray-300 hover:bg-gray-100 text-gray-700"
                        onClick={() => toast({
                          title: "🚧 กราฟสถิติ",
                          description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
                        })}
                      >
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="glass-effect p-6">
                  <h3 className="text-xl font-semibold mb-4">รายได้รายเดือน</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">กราฟรายได้จะแสดงที่นี่</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 border-gray-300 hover:bg-gray-100 text-gray-700"
                        onClick={() => toast({
                          title: "🚧 กราฟรายได้",
                          description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
                        })}
                      >
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
  