import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Filter,
  Search,
  Heart,
  Star,
  MapPin,
  User,
  Clock,
  Utensils,
  Camera,
  MessageSquare,
  Dumbbell,
  Video,
  Coffee,
  Beer,
  Film,
  ShoppingBag,
  Languages,
  Calendar,
  Landmark,
  Flower2,
  UserCheck,
  FileText,
  PlaySquare,
  Gamepad2
} from 'lucide-react';
import { friends } from '@/data/friendsData';
import FriendCard from '@/components/friend/FriendCard';

const categories = [
  { id: 'all', name: 'ทั้งหมด', icon: Users },
  { id: 'Eat & Travel', name: 'Eat & Travel', icon: Utensils },
  { id: 'Photographer', name: 'Photographer', icon: Camera },
  { id: 'Care Listener', name: 'Care Listener', icon: MessageSquare },
  { id: 'Workout', name: 'Workout', icon: Dumbbell },
  { id: 'Video Call', name: 'Video Call', icon: Video },
  { id: 'Cafe', name: 'Cafe', icon: Coffee },
  { id: 'Bar', name: 'Bar', icon: Beer },
  { id: 'Movie', name: 'Movie', icon: Film },
  { id: 'Shopping', name: 'Shopping', icon: ShoppingBag },
  { id: 'Language Exchange', name: 'Language Exchange', icon: Languages },
  { id: 'Event', name: 'Event', icon: Calendar },
  { id: 'Hospital Buddy', name: 'Hospital Buddy', icon: Landmark },
  { id: 'Mindfulness', name: 'Mindfulness', icon: Flower2 },
  { id: 'Elder Buddy', name: 'Elder Buddy', icon: UserCheck },
  { id: 'Errand', name: 'Errand', icon: FileText },
  { id: 'Content Creator', name: 'Content Creator', icon: PlaySquare },
  { id: 'Gamer', name: 'Gamer', icon: Gamepad2 },
];

const FriendBookingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGender, setSelectedGender] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Drag functionality
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const filteredFriends = friends.filter(friend => {
    const matchesGender = selectedGender === 'all' || friend.gender === selectedGender;
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.location.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesPrice = true;
    if (priceRange === 'low') matchesPrice = friend.price <= 400;
    else if (priceRange === 'medium') matchesPrice = friend.price > 400 && friend.price <= 500;
    else if (priceRange === 'high') matchesPrice = friend.price > 500;
    const matchesCategory = selectedCategory === 'all' ||
      (friend.interests && friend.interests.some(interest => interest.toLowerCase() === selectedCategory.toLowerCase()));
    return matchesGender && matchesSearch && matchesPrice && matchesCategory;
  });

  const genderOptions = [
    { id: 'all', name: 'ทั้งหมด', icon: Users },
    { id: 'ชาย', name: 'ชาย', icon: User },
    { id: 'หญิง', name: 'หญิง', icon: User }
  ];

  const priceOptions = [
    { id: 'all', name: 'ทุกราคา' },
    { id: 'low', name: 'ต่ำกว่า 400฿' },
    { id: 'medium', name: '400-500฿' },
    { id: 'high', name: 'มากกว่า 500฿' }
  ];

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
              <Users className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">FindFriend</span>
          </div>

          <Button
            variant="outline"
            onClick={() => toast({
              title: "💡 เร็วๆ นี้: ลงทะเบียนเป็นเพื่อน",
              description: "คุณจะสามารถลงทะเบียนเป็นเพื่อนให้คนอื่นจองได้!",
            })}
          >
            ลงทะเบียนเป็นเพื่อน
          </Button>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">
            จอง<span className="gradient-text">เพื่อน</span>
          </h1>
          <p className="text-gray-600 text-lg">เลือกเพื่อนที่คุณต้องการจองเพื่อทำกิจกรรมร่วมกัน!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="glass-effect p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ เพื่อน หรือคำอธิบาย..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                className="border-gray-300 hover:bg-gray-100 text-gray-700"
                onClick={() => toast({
                  title: "💡 เร็วๆ นี้: ตัวกรองขั้นสูง",
                  description: "คุณจะสามารถกรองตามอายุ, ภาษา, และอื่นๆ ได้!",
                })}
              >
                <Filter className="w-4 h-4 mr-2" />
                ตัวกรองเพิ่มเติม
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={handleScrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleScrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ArrowRight className="w-4 h-4 text-gray-600" />
            </button>

            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto select-none cursor-grab active:cursor-grabbing px-10"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitScrollbar: { display: 'none' }
              }}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              <div className="flex gap-4 min-w-max px-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex flex-col items-center px-3 py-2 rounded-lg border-2 transition-all whitespace-nowrap select-none
                      ${selectedCategory === cat.id ? 'border-green-500 bg-green-50 text-green-700' : 'border-transparent text-gray-500 hover:bg-gray-100'}`}
                  >
                    <cat.icon className="w-7 h-7 mb-1" />
                    <span className="text-xs font-medium">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gender Filter */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold mb-3">เพศ</h3>
          <div className="flex flex-wrap gap-3">
            {genderOptions.map((option) => (
              <Button
                key={option.id}
                variant={selectedGender === option.id ? "default" : "outline"}
                className={`${
                  selectedGender === option.id
                    ? 'line-green text-white'
                    : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setSelectedGender(option.id)}
              >
                <option.icon className="w-4 h-4 mr-2" />
                {option.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Price Filter */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-lg font-semibold mb-3">ช่วงราคา</h3>
          <div className="flex flex-wrap gap-3">
            {priceOptions.map((option) => (
              <Button
                key={option.id}
                variant={priceRange === option.id ? "default" : "outline"}
                className={`${
                  priceRange === option.id
                    ? 'line-green text-white'
                    : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
                onClick={() => setPriceRange(option.id)}
              >
                {option.name}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredFriends.map((friend, index) => (
            <FriendCard key={friend.id} friend={friend} index={index} />
          ))}
        </motion.div>

        {filteredFriends.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">ไม่พบเพื่อนที่ค้นหา</h3>
            <p className="text-gray-600 mb-6">ลองเปลี่ยนคำค้นหาหรือตัวกรอง หรือลงทะเบียนเป็นเพื่อนเอง!</p>
            <Button
              onClick={() => toast({
                title: "💡 เร็วๆ นี้: ลงทะเบียนเป็นเพื่อน",
                description: "คุณจะสามารถลงทะเบียนเป็นเพื่อนให้คนอื่นจองได้!",
              })}
            >
              ลงทะเบียนเป็นเพื่อน
            </Button>
          </motion.div>
        )}

        {filteredFriends.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 hover:bg-gray-100 text-gray-700"
              onClick={() => toast({
                title: "👍 คุณเห็นเพื่อนทั้งหมดแล้ว",
                description: "ไม่มีเพื่อนเพิ่มเติมในขณะนี้",
              })}
            >
              โหลดเพื่อนเพิ่มเติม
            </Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default FriendBookingPage;