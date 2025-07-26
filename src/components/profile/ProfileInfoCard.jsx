
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  User, 
  Star,
  MapPin,
  Calendar
} from 'lucide-react';

const ProfileInfoCard = ({ userProfile, formatDate }) => (
  <Card className="glass-effect p-6">
    <div className="text-center space-y-4">
      <div className="w-24 h-24 line-green rounded-full flex items-center justify-center mx-auto">
        <User className="w-12 h-12 text-white" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
        <p className="text-gray-600">{userProfile.lineId}</p>
      </div>

      <div className="flex items-center justify-center space-x-1">
        <Star className="w-5 h-5 text-yellow-400 fill-current" />
        <span className="font-semibold text-gray-800">{userProfile.rating}</span>
        <span className="text-gray-600">({userProfile.activitiesJoined} กิจกรรม)</span>
      </div>

      <div className="flex items-center justify-center space-x-2 text-gray-600">
        <MapPin className="w-4 h-4" />
        <span>{userProfile.location}</span>
      </div>

      <div className="flex items-center justify-center space-x-2 text-gray-600">
        <Calendar className="w-4 h-4" />
        <span>เข้าร่วมเมื่อ {formatDate(userProfile.joinDate)}</span>
      </div>
    </div>
  </Card>
);

export default ProfileInfoCard;
  