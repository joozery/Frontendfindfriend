
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  Crown, 
  Check, 
  Star, 
  Zap, 
  Shield, 
  Users, 
  ArrowLeft,
  MessageCircle,
  Calendar,
  Gift,
  Sparkles
} from 'lucide-react';

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const plans = [
    {
      id: 'monthly',
      name: 'รายเดือน',
      price: '299',
      originalPrice: '399',
      period: '/เดือน',
      badge: 'ยอดนิยม',
      badgeColor: 'bg-orange-500',
      features: [
        'เข้าร่วมกิจกรรมไม่จำกัด',
        'แชทกับสมาชิกได้',
        'ระบบจับคู่อัตโนมัติ',
        'การแจ้งเตือนผ่าน LINE',
        'ประกันความปลอดภัย',
        'ซัพพอร์ต 24/7'
      ]
    },
    {
      id: 'yearly',
      name: 'รายปี',
      price: '2,990',
      originalPrice: '3,588',
      period: '/ปี',
      badge: 'ประหยัดสุด',
      badgeColor: 'bg-green-500',
      features: [
        'ทุกสิทธิของแพ็กรายเดือน',
        'ส่วนลด 17% (ประหยัด 598 บาท)',
        'กิจกรรมพิเศษเฉพาะสมาชิกรายปี',
        'ของขวัญวันเกิด',
        'Priority Support',
        'Early Access ฟีเจอร์ใหม่',
        'เครดิตฟรี 500 บาท'
      ]
    }
  ];

  const handleSubscribe = (planId) => {
    const plan = plans.find(p => p.id === planId);
    
    // Save subscription to localStorage
    const subscription = {
      plan: plan.name,
      price: plan.price,
      startDate: new Date().toISOString(),
      endDate: planId === 'yearly' 
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    };
    
    localStorage.setItem('userSubscription', JSON.stringify(subscription));
    
    toast({
      title: "🎉 สมัครสมาชิกสำเร็จ!",
      description: `คุณได้สมัครแพ็ก${plan.name} เรียบร้อยแล้ว ยินดีต้อนรับสู่ FindFriend!`,
    });
    
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  const handleLinePayment = () => {
    toast({
      title: "🚧 การชำระเงินผ่าน LINE Pay",
      description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
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
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FindFriend</span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 line-green rounded-full flex items-center justify-center floating-animation">
              <Crown className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold">
            เลือกแพ็ก<span className="gradient-text">สมาชิก</span>
            <br />ที่เหมาะกับคุณ
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ปลดล็อกประสบการณ์เต็มรูปแบบของ FindFriend 
            พร้อมสิทธิพิเศษและความปลอดภัยระดับพรีเมียม
          </p>
        </motion.div>
      </section>

      {/* Pricing Plans */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
              className={`relative ${selectedPlan === plan.id ? 'ring-2 ring-green-400' : ''}`}
            >
              <Card className="glass-effect p-8 h-full relative overflow-hidden">
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className={`${plan.badgeColor} text-white`}>
                    {plan.badge}
                  </Badge>
                </div>

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <span className="text-4xl font-bold gradient-text">฿{plan.price}</span>
                    <div className="text-left">
                      <div className="text-sm text-gray-600 line-through">฿{plan.originalPrice}</div>
                      <div className="text-sm text-gray-800">{plan.period}</div>
                    </div>
                  </div>
                  {plan.id === 'yearly' && (
                    <div className="inline-flex items-center space-x-1 bg-green-500/20 text-green-600 px-3 py-1 rounded-full text-sm">
                      <Sparkles className="w-4 h-4" />
                      <span>ประหยัด 17%</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className="w-5 h-5 line-green rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  className={`w-full text-lg py-6 ${
                    plan.id === 'yearly' 
                      ? 'line-green text-white pulse-glow' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300'
                  }`}
                  onClick={() => handleSubscribe(plan.id)}
                >
                  <Crown className="w-5 h-5 mr-2" />
                  เลือกแพ็กนี้
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl font-bold">วิธีการชำระเงิน</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="glass-effect p-6 text-center">
              <div className="w-12 h-12 line-green rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">LINE Pay</h3>
              <p className="text-sm text-gray-600">ชำระผ่าน LINE Pay ง่ายและปลอดภัย</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={handleLinePayment}
              >
                เชื่อมต่อ LINE Pay
              </Button>
            </Card>

            <Card className="glass-effect p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">บัตรเครดิต/เดบิต</h3>
              <p className="text-sm text-gray-600">รองรับทุกธนาคารในไทย</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={() => toast({
                  title: "🚧 การชำระด้วยบัตร",
                  description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
                })}
              >
                เพิ่มบัตร
              </Button>
            </Card>

            <Card className="glass-effect p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">โอนธนาคาร</h3>
              <p className="text-sm text-gray-600">โอนผ่านแอปธนาคาร</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4 border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={() => toast({
                  title: "🚧 การโอนธนาคาร",
                  description: "ฟีเจอร์นี้ยังไม่ได้ใช้งาน—แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มในข้อความถัดไป! 🚀",
                })}
              >
                ดูรายละเอียด
              </Button>
            </Card>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8">สิทธิพิเศษสมาชิก</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 line-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">เข้าร่วมไม่จำกัด</h3>
              <p className="text-sm text-gray-600">เข้าร่วมกิจกรรมได้ไม่จำกัดจำนวน</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">จับคู่พรีเมียม</h3>
              <p className="text-sm text-gray-600">AI จับคู่เพื่อนที่เข้ากันได้ดีที่สุด</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">กิจกรรมพิเศษ</h3>
              <p className="text-sm text-gray-600">เข้าร่วมกิจกรรมเฉพาะสมาชิก</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">ของขวัญพิเศษ</h3>
              <p className="text-sm text-gray-600">รับของขวัญในโอกาสพิเศษ</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl font-bold">คำถามที่พบบ่อย</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <Card className="glass-effect p-6">
              <h3 className="font-semibold text-gray-800 mb-2">สามารถยกเลิกได้ไหม?</h3>
              <p className="text-gray-600">สามารถยกเลิกได้ตลอดเวลา โดยจะใช้งานได้จนครบรอบการชำระเงิน</p>
            </Card>

            <Card className="glass-effect p-6">
              <h3 className="font-semibold text-gray-800 mb-2">มีการรับประกันไหม?</h3>
              <p className="text-gray-600">เรามีประกันความปลอดภัย 100% และรับประกันความพึงพอใจ</p>
            </Card>

            <Card className="glass-effect p-6">
              <h3 className="font-semibold text-gray-800 mb-2">ต่ออายุอัตโนมัติไหม?</h3>
              <p className="text-gray-600">ระบบจะต่ออายุอัตโนมัติ แต่คุณสามารถปิดได้ในหน้าโปรไฟล์</p>
            </Card>

            <Card className="glass-effect p-6">
              <h3 className="font-semibold text-gray-800 mb-2">ได้รับการแจ้งเตือนอย่างไร?</h3>
              <p className="text-gray-600">รับการแจ้งเตือนผ่าน LINE OA เกี่ยวกับกิจกรรมและการต่ออายุ</p>
            </Card>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default SubscriptionPage;
  