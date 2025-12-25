import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell, XAxis } from 'recharts';
import { WEEKLY_DATA } from '../constants';

export const WeeklyProgress: React.FC = () => {
  return (
    <div className="mx-4 mt-6 p-5 rounded-2xl bg-cadence-card shadow-[0px_4px_12px_rgba(0,0,0,0.25)]">
      <h2 className="text-cadence-ice font-outfit font-semibold text-lg mb-4 text-left">
        Progresso da Semana
      </h2>

      <div className="h-[100px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={WEEKLY_DATA} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FFB84D" />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              tick={{ fill: '#8D99AE', fontSize: 10, fontFamily: 'Inter' }} 
              axisLine={false} 
              tickLine={false} 
              dy={10}
            />
            <Bar dataKey="hours" radius={[4, 4, 4, 4]} barSize={32}>
              {WEEKLY_DATA.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.hours > 0 ? "url(#barGradient)" : "#3A3D4F"} 
                  // Highlight current day (Thursday in mock)
                  stroke={index === 3 ? "#FF6B35" : "none"}
                  strokeWidth={index === 3 ? 0 : 0}
                  className={index === 3 ? "border-b-2 border-cadence-orange" : ""}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        {/* Manual styling for "Today" indicator since SVG borders are tricky in Recharts */}
        <div className="relative w-full h-0">
             <div className="absolute top-[-25px] left-[50%] transform -translate-x-1/2 w-8 h-[2px] bg-cadence-orange opacity-0 md:opacity-100"></div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-cadence-ice font-sans font-bold text-[32px]">18h 30min</span>
        </div>
        <span className="text-cadence-gray font-plex text-xs">de 28h meta semanal</span>
        
        <div className="mt-3 w-full h-1 bg-cadence-darkerGray rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cadence-orange to-cadence-orangeLight rounded-full" 
            style={{ width: '66%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};