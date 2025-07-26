import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useActivities } from '@/context/ActivityContext';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Clock, 
  Star, 
  MessageCircle,
  LogIn
} from 'lucide-react';
import { categories } from '@/data/categories';

const ActivityCard = ({ activity, index }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { bookActivity, bookedActivityIds } = useActivities();

  const isBooked = bookedActivityIds.includes(activity.id);
  const isFull = activity.participants >= activity.maxParticipants;

  const handleBookActivity = (e, activityId, activityTitle) => {
    e.stopPropagation(); // Prevents navigating to detail page
    if (isBooked || isFull) return;
    
    const success = bookActivity(activityId);
    if (success) {
      toast({
        title: "✅ จองกิจกรรมสำเร็จ!",
        description: `คุณได้จองกิจกรรม "${activityTitle}" เรียบร้อยแล้ว`,
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('th-TH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onClick={() => navigate(`/activity/${activity.id}`)}
      className="cursor-pointer"
    >
      <Card className="glass-effect overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            className="w-full h-full object-cover"
            alt={`${activity.title} - ${activity.description}`}
            src="https://images.unsplash.com/photo-1595872018818-97555653a011"
          />
          
          <div className="absolute top-4 left-4">
            <Badge className={`${categories.find(c => c.id === activity.category)?.color} text-white`}>
              {categories.find(c => c.id === activity.category)?.name}
            </Badge>
          </div>

          <div className="absolute top-4 right-4 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm">{activity.rating}</span>
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{activity.title}</h3>
          <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{activity.description}</p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{activity.location}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(activity.date)}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{activity.time} น.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{activity.participants}/{activity.maxParticipants} คน</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-semibold">
                  {activity.host.charAt(0)}
                </span>
              </div>
              <span className="text-sm text-gray-600">{activity.host}</span>
            </div>
            <span className="text-sm font-semibold text-green-600">{activity.price}</span>
          </div>

          <div className="flex space-x-2 mt-auto">
            <Button 
              className="flex-1 line-green text-white"
              onClick={(e) => handleBookActivity(e, activity.id, activity.title)}
              disabled={isBooked || isFull}
            >
              <LogIn className="w-4 h-4 mr-2" />
              {isBooked ? 'จองแล้ว' : isFull ? 'เต็มแล้ว' : 'จอง'}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              className="border-gray-300 hover:bg-gray-100 text-gray-700"
              onClick={(e) => {
                  e.stopPropagation();
                  toast({
                    title: "🚧 กำลังเปิดห้องแชท...",
                    description: "คุณสามารถพูดคุยกับผู้เข้าร่วมคนอื่นได้ที่นี่เร็วๆ นี้!",
                  });
              }}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ActivityCard;