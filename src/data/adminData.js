
export const adminStats = {
  totalUsers: 1247,
  activeSubscriptions: 892,
  monthlyRevenue: 267680,
  totalActivities: 156,
  pendingReports: 3,
  newSignups: 45
};

export const recentUsersData = [
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@line.me', joinDate: '2024-01-20', status: 'active', subscription: 'รายเดือน' },
  { id: 2, name: 'สมหญิง รักสนุก', email: 'somying@line.me', joinDate: '2024-01-19', status: 'active', subscription: 'รายปี' },
  { id: 3, name: 'ประยุทธ์ เที่ยวเก่ง', email: 'prayut@line.me', joinDate: '2024-01-18', status: 'pending', subscription: 'รายเดือน' },
  { id: 4, name: 'มาลี ถ่ายรูปสวย', email: 'malee@line.me', joinDate: '2024-01-17', status: 'active', subscription: 'รายปี' },
  { id: 5, name: 'สมศักดิ์ กินเก่ง', email: 'somsak@line.me', joinDate: '2024-01-16', status: 'active', subscription: 'รายเดือน' }
];

export const recentActivitiesData = [
  { id: 1, title: 'เที่ยวตลาดนัดรถไฟ', host: 'น้องมิ้น', participants: 8, status: 'active', date: '2024-02-15' },
  { id: 2, title: 'กินข้าวร้านญี่ปุ่น', host: 'พี่โอ๋', participants: 6, status: 'completed', date: '2024-02-14' },
  { id: 3, title: 'ถ่ายรูปสวนลุมพินี', host: 'ช่างภาพโปร', participants: 5, status: 'active', date: '2024-02-17' },
  { id: 4, title: 'คาเฟ่ฮอปปิ้งทองหล่อ', host: 'คาเฟ่เลิฟเวอร์', participants: 6, status: 'pending', date: '2024-02-18' },
  { id: 5, title: 'ทำบุญวัดพระแก้ว', host: 'พี่บุญ', participants: 10, status: 'active', date: '2024-02-19' }
];

export const reportsData = [
  { id: 1, type: 'user', title: 'รายงานผู้ใช้ไม่เหมาะสม', reporter: 'สมชาย ใจดี', reported: 'ผู้ใช้ A', status: 'pending', date: '2024-01-20' },
  { id: 2, type: 'activity', title: 'กิจกรรมไม่ตรงตามที่โฆษณา', reporter: 'สมหญิง รักสนุก', reported: 'กิจกรรม B', status: 'investigating', date: '2024-01-19' },
  { id: 3, type: 'payment', title: 'ปัญหาการชำระเงิน', reporter: 'ประยุทธ์ เที่ยวเก่ง', reported: 'ระบบชำระเงิน', status: 'resolved', date: '2024-01-18' }
];
  