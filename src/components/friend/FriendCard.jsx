import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Heart, 
  Star, 
  CheckCircle, 
  MapPin, 
  Clock,
  MessageCircle,
  User,
  Languages
} from 'lucide-react';

const FriendCard = ({ friend, index }) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "💔 ลบออกจากรายการโปรดแล้ว" : "❤️ เพิ่มในรายการโปรดแล้ว",
      description: isLiked ? "ลบออกจากรายการโปรดแล้ว" : "เพิ่มในรายการโปรดแล้ว",
    });
  };

  const handleBook = () => {
    setIsBooked(!isBooked);
    toast({
      title: isBooked ? "❌ ยกเลิกการจองแล้ว" : "✅ จองเพื่อนสำเร็จแล้ว",
      description: isBooked 
        ? "ยกเลิกการจองแล้ว" 
        : `จอง ${friend.name} สำเร็จแล้ว! จะติดต่อกลับภายใน 24 ชั่วโมง`,
    });
  };

  const handleChat = () => {
    toast({
      title: "💬 เริ่มการสนทนา",
      description: `เริ่มการสนทนากับ ${friend.name}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {/* Image Section */}
        <div className="relative h-64 bg-gray-200">
          <img 
            src={friend.imageUrl} 
            alt={friend.name}
            className="w-full h-full object-cover"
          />
          
          {/* Like Button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-lg hover:bg-white transition-colors"
          >
            <Heart 
              className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
            />
          </button>

          {/* Rating */}
          {friend.rating && (
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{friend.rating}</span>
            </div>
          )}

          {/* Gender Badge */}
          <div className="absolute bottom-3 left-3">
            <Badge 
              variant={friend.gender === "หญิง" ? "secondary" : "default"}
              className="bg-white/90 backdrop-blur-sm text-gray-800"
            >
              {friend.gender}
            </Badge>
          </div>

          {/* Availability Status */}
          {!friend.isAvailable && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">
                ไม่ว่าง
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{friend.name}</h3>
              <p className="text-gray-600">{friend.age} ปี</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-green-600">
                {friend.price.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">{friend.priceUnit}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-3 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{friend.location}</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4 text-sm">{friend.description}</p>

          {/* Interests */}
          <div className="flex flex-wrap gap-1 mb-4">
            {friend.interests.slice(0, 3).map((interest, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>

          {/* Languages */}
          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <Languages className="w-4 h-4" />
            <span className="text-sm">{friend.languages.join(", ")}</span>
          </div>

          {/* Verification Status */}
          <div className="flex items-center gap-2 mb-4">
            {friend.isVerified && (
              <div className="flex items-center gap-1 text-blue-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Verified</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleBook}
              disabled={!friend.isAvailable}
              className={`flex-1 ${
                isBooked 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isBooked ? 'ยกเลิก' : 'จอง'}
            </Button>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={handleChat}
              disabled={!friend.isAvailable}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FriendCard; 