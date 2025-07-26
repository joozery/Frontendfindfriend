import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useActivities } from '@/context/ActivityContext';
import { Plus } from 'lucide-react';

export function CreateActivityDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  
  const { toast } = useToast();
  const { addActivity } = useActivities();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !location || !date || !time || !maxParticipants) {
      toast({
        title: "❌ ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        variant: "destructive",
      });
      return;
    }

    const newActivity = {
      title,
      description,
      location,
      date,
      time,
      maxParticipants: parseInt(maxParticipants, 10),
      category: 'travel', // Default category for now
      price: "ฟรี", // Default price
      rating: 4.5, // Default rating
      host: "คุณ", // Host is the current user
      image: "new-activity"
    };

    addActivity(newActivity);
    
    toast({
      title: "🎉 สร้างกิจกรรมสำเร็จ!",
      description: `กิจกรรม "${title}" ของคุณถูกสร้างแล้ว`,
    });
    
    setOpen(false);
    // Reset form
    setTitle('');
    setDescription('');
    setLocation('');
    setDate('');
    setTime('');
    setMaxParticipants('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="line-green text-white">
          <Plus className="w-4 h-4 mr-2" />
          สร้างกิจกรรม
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>สร้างกิจกรรมใหม่</DialogTitle>
          <DialogDescription>
            กรอกรายละเอียดกิจกรรมของคุณเพื่อนัดเพื่อนใหม่ๆ
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                ชื่อกิจกรรม
              </Label>
              <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                รายละเอียด
              </Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                สถานที่
              </Label>
              <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                วันที่
              </Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="time" className="text-right">
                เวลา
              </Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxParticipants" className="text-right">
                จำนวนคน
              </Label>
              <Input id="maxParticipants" type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">สร้างกิจกรรม</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}