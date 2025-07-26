
import React from 'react';
import { Card } from '@/components/ui/card';

const StatsCard = ({ icon: Icon, title, value, color }) => (
  <Card className="glass-effect p-6">
    <div className="flex items-center space-x-3">
      <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </Card>
);

export default StatsCard;
  