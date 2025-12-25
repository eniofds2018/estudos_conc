import React from 'react';
import { Check, Play } from 'lucide-react';
import { CycleItem } from '../App';

interface TaskListProps {
  tasks: CycleItem[];
  onStartStudy: (subject: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onStartStudy }) => {
  return (
    <div className="mt-6 mb-24">
      <h3 className="ml-4 mb-4 text-cadence-ice font-outfit font-semibold text-base">
        Tarefas de Hoje
      </h3>
      
      <div className="flex flex-col gap-3 px-4">
        {tasks.length === 0 && (
          <div className="bg-cadence-card p-8 rounded-xl text-center border border-dashed border-gray-700">
            <p className="text-cadence-gray text-sm">Nenhuma matéria planejada para hoje.</p>
          </div>
        )}
        {tasks.map((task) => (
          <button 
            key={task.id} 
            onClick={() => onStartStudy(task.subject)}
            className="group relative flex items-center p-4 bg-cadence-card rounded-xl overflow-hidden text-left active:scale-[0.98] transition-transform"
          >
            {/* Colored Indicator Bar */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1" 
              style={{ backgroundColor: task.color }}
            ></div>

            {/* Checkbox Status */}
            <div className="mr-4">
               {task.completed ? (
                  <div className="w-6 h-6 rounded-full bg-cadence-orange flex items-center justify-center">
                    <Check size={14} color="#FFF" />
                  </div>
               ) : task.progress > 0 ? (
                 <div className="w-6 h-6 rounded-full border-2 border-cadence-gray flex items-center justify-center relative">
                    <div className="absolute inset-0 m-1 rounded-full opacity-50" style={{ backgroundColor: task.color }}></div>
                 </div>
               ) : (
                 <div className="w-6 h-6 rounded-full border-2 border-cadence-gray group-hover:border-cadence-orange transition-colors"></div>
               )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-cadence-ice font-sans font-semibold text-[15px] group-hover:text-cadence-orange transition-colors">{task.subject}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-cadence-gray font-plex text-[13px]">{task.duration}</span>
                <span className="px-2 py-0.5 rounded bg-[rgba(255,107,53,0.2)] text-cadence-orange text-[10px] font-medium">
                  {task.type}
                </span>
              </div>
            </div>

            {/* Right Action: Progress or Play */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Play size={16} className="text-cadence-orange fill-cadence-orange" />
              </div>
              <div className="group-hover:opacity-0 transition-opacity">
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="transparent"
                    stroke="#3A3D4F"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="14"
                    fill="transparent"
                    stroke={task.color}
                    strokeWidth="2.5"
                    strokeDasharray={88} 
                    strokeDashoffset={88 - (88 * task.progress) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] text-cadence-ice font-sans">
                  {task.progress}%
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      <div className="h-8 bg-gradient-to-t from-cadence-dark to-transparent -mt-4 pointer-events-none relative z-10" />
    </div>
  );
};