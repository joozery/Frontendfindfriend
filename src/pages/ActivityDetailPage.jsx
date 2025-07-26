import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivities } from '@/context/ActivityContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  ArrowLeft, 
  Users, 
  MapPin, 
  Calendar, 
  Clock, 
  Star,
  MessageCircle,
  LogIn,
  XCircle,
  Share2
} from 'lucide-react';
import { categories } from '@/data/categories';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { activities, bookActivity, cancelBooking, bookedActivityIds } = useActivities();
  
  const activity = activities.find(act => act.id === parseInt(id));

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">ไม่พบกิจกรรม</h1>
          <Button onClick={() => navigate('/activities')} className="mt-4">กลับไปหน้ากิจกรรม</Button>
        </div>
      </div>
    );
  }

  const isBooked = bookedActivityIds.includes(activity.id);
  const isFull = activity.participants >= activity.maxParticipants;

  const handleBookActivity = () => {
    if (isBooked || isFull) return;
    const success = bookActivity(activity.id);
    if (success) {
      toast({
        title: "✅ จองกิจกรรมสำเร็จ!",
        description: `คุณได้จองกิจกรรม "${activity.title}" เรียบร้อยแล้ว`,
      });
    }
  };

  const handleCancelBooking = () => {
    if (!isBooked) return;
    const success = cancelBooking(activity.id);
    if (success) {
      toast({
        title: "👍 ยกเลิกการจองสำเร็จ",
        description: `คุณได้ยกเลิกการจอง "${activity.title}"`,
        variant: "destructive"
      });
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "🔗 คัดลอกลิงก์แล้ว!",
      description: "คุณสามารถแชร์ลิงก์กิจกรรมนี้ให้เพื่อนๆ ได้เลย",
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const category = categories.find(c => c.id === activity.category);

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
            onClick={() => navigate('/activities')}
            className="text-gray-700 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับ
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 line-green rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FindFriend</span>
          </div>
          <Button 
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="text-gray-700 hover:bg-gray-100"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img 
              className="w-full h-full object-cover"
              alt={`${activity.title} - ${activity.description}`}
              src="https://images.unsplash.com/photo-1595872018818-97555653a011"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <Badge className={`${category?.color} text-white text-sm mb-2`}>
                {category?.name}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold">{activity.title}</h1>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-effect">
                <CardHeader>
                  <CardTitle>รายละเอียดกิจกรรม</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{activity.description}</p>
                </CardContent>
              </Card>

              <Card className="glass-effect">
                 <CardHeader>
                  <CardTitle>ผู้เข้าร่วม ({activity.participants}/{activity.maxParticipants})</CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="flex -space-x-2 overflow-hidden">
                    {Array.from({ length: activity.participants }).map((_, i) => (
                      <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white bg-gradient-to-br from-green-300 to-blue-400 flex items-center justify-center text-white font-bold">
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">และเพื่อนๆ อีกมากมายรอคุณอยู่!</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <Card className="glass-effect p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">วันที่</p>
                    <p className="text-gray-600">{formatDate(activity.date)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">เวลา</p>
                    <p className="text-gray-600">{activity.time} น.</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">สถานที่</p>
                    <p className="text-gray-600">{activity.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">จำนวนคน</p>
                    <p className="text-gray-600">{activity.participants}/{activity.maxParticipants} คน</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="font-semibold">เรตติ้ง</p>
                    <p className="text-gray-600">{activity.rating}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">ราคา</p>
                    <p className="text-lg font-bold text-green-600">{activity.price}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  {isBooked ? (
                    <Button 
                      variant="destructive"
                      className="w-full"
                      onClick={handleCancelBooking}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      ยกเลิกการจอง
                    </Button>
                  ) : (
                    <Button 
                      className="w-full line-green text-white"
                      onClick={handleBookActivity}
                      disabled={isFull}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      {isFull ? 'กิจกรรมเต็มแล้ว' : 'จองกิจกรรมนี้'}
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 hover:bg-gray-100 text-gray-700"
                    onClick={() => toast({
                      title: "🚧 กำลังเปิดห้องแชท...",
                      description: "คุณสามารถพูดคุยกับผู้เข้าร่วมคนอื่นได้ที่นี่เร็วๆ นี้!",
                    })}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    เข้าร่วมแชทกลุ่ม
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ActivityDetailPage;