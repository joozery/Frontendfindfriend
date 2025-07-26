
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Camera, 
  Coffee, 
  Utensils,
  Heart,
  Shield,
  Zap,
  Crown,
  LogOut
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, loginWithLine, logout, loading } = useAuth();

  const activities = [
    { icon: MapPin, title: "เที่ยวเมือง", count: "245 กิจกรรม", color: "bg-blue-500" },
    { icon: Utensils, title: "กินข้าว", count: "189 กิจกรรม", color: "bg-orange-500" },
    { icon: Camera, title: "ถ่ายรูป", count: "156 กิจกรรม", color: "bg-purple-500" },
    { icon: Coffee, title: "คาเฟ่", count: "98 กิจกรรม", color: "bg-amber-500" },
    { icon: Heart, title: "ทำบุญ", count: "67 กิจกรรม", color: "bg-pink-500" },
    { icon: Users, title: "เดินห้าง", count: "134 กิจกรรม", color: "bg-green-500" }
  ];

  const features = [
    {
      icon: Shield,
      title: "ปลอดภัย 100%",
      description: "ตรวจสอบสมาชิกทุกคนผ่าน LINE OA"
    },
    {
      icon: Zap,
      title: "จับคู่อัตโนมัติ",
      description: "AI จับคู่เพื่อนที่เข้ากันได้"
    },
    {
      icon: Crown,
      title: "สมาชิกพรีเมียม",
      description: "สิทธิพิเศษและกิจกรรมเอ็กซ์คลูซีฟ"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="glass-effect sticky top-0 z-50 p-4"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 line-green rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">FindFriend</span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            ) : !isLoggedIn ? (
              <Button 
                onClick={loginWithLine}
                className="line-green text-white hover:opacity-90 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                เข้าสู่ระบบด้วย LINE
              </Button>
            ) : (
              <div className="flex items-center space-x-4">
                {/* User Profile Card */}
                <div className="flex items-center space-x-3 bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
                  <img 
                    src={user?.pictureUrl} 
                    alt={user?.displayName}
                    className="w-10 h-10 rounded-full border-2 border-green-500"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">{user?.displayName}</span>
                    <span className="text-xs text-gray-500">สมาชิก</span>
                  </div>
                </div>
                
                {/* Navigation Buttons */}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/profile')} 
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    โปรไฟล์
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/activities')} 
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    กิจกรรม
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/admin')} 
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    แอดมิน
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={logout} 
                    className="text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold mb-6">
              หาเพื่อน<span className="gradient-text">ทำกิจกรรม</span>
              <br />ง่ายๆ ใน<span className="gradient-text">ไม่กี่คลิก</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              แพลตฟอร์มหาเพื่อนทำกิจกรรมที่ใหญ่ที่สุดในไทย เชื่อมต่อผ่าน LINE OA 
              พร้อมระบบสมาชิกที่ให้สิทธิพิเศษมากมาย
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="line-green text-white text-lg px-8 py-4 pulse-glow"
              onClick={() => navigate('/subscription')}
            >
              <Crown className="w-5 h-5 mr-2" />
              สมัครสมาชิก
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-4 border-gray-300 hover:bg-gray-100 text-gray-700"
              onClick={() => navigate('/activities')}
            >
              <Calendar className="w-5 h-5 mr-2" />
              ดูกิจกรรม
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">กิจกรรมยอดนิยม</h2>
          <p className="text-gray-600">เลือกกิจกรรมที่คุณสนใจและหาเพื่อนร่วมทำ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <Card className="glass-effect p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${activity.color} rounded-full flex items-center justify-center`}>
                    <activity.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{activity.title}</h3>
                    <p className="text-gray-600">{activity.count}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">ทำไมต้อง FindFriend?</h2>
          <p className="text-gray-600">ความปลอดภัยและคุณภาพเป็นสิ่งที่เราให้ความสำคัญ</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 line-green rounded-full flex items-center justify-center mx-auto mb-4 floating-animation">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text">50K+</div>
              <div className="text-gray-600">สมาชิก</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">1.2K+</div>
              <div className="text-gray-600">กิจกรรม/เดือน</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">98%</div>
              <div className="text-gray-600">ความพึงพอใจ</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text">24/7</div>
              <div className="text-gray-600">ซัพพอร์ต</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl font-bold">พร้อมเริ่มต้นแล้วหรือยัง?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            เข้าร่วมชุมชนที่ใหญ่ที่สุดของคนรักการทำกิจกรรมร่วมกัน
          </p>
          <Button 
            size="lg" 
            className="line-green text-white text-xl px-12 py-6 pulse-glow"
            onClick={() => navigate('/subscription')}
          >
            <Crown className="w-6 h-6 mr-2" />
            เริ่มต้นเลย!
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="glass-effect mt-20 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 line-green rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FindFriend</span>
          </div>
          <p className="text-gray-600">© 2024 FindFriend. สงวนลิขสิทธิ์ทั้งหมด</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
  