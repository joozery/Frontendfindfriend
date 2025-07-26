
import { 
  Users, 
  MapPin, 
  Camera,
  Coffee,
  Utensils,
  Heart
} from 'lucide-react';

export const categories = [
  { id: 'all', name: 'ทั้งหมด', icon: Users, color: 'bg-gray-500' },
  { id: 'travel', name: 'เที่ยว', icon: MapPin, color: 'bg-blue-500' },
  { id: 'food', name: 'กินข้าว', icon: Utensils, color: 'bg-orange-500' },
  { id: 'photo', name: 'ถ่ายรูป', icon: Camera, color: 'bg-purple-500' },
  { id: 'cafe', name: 'คาเฟ่', icon: Coffee, color: 'bg-amber-500' },
  { id: 'temple', name: 'ทำบุญ', icon: Heart, color: 'bg-pink-500' }
];
  