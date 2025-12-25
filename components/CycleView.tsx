import React, { useState } from 'react';
import { Clock, Plus, X, Check, Trash2 } from 'lucide-react';
import { CycleItem } from '../App';

interface CycleViewProps {
  items: CycleItem[];
  onItemsChange: (items: CycleItem[]) => void;
}

const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const COLORS = ['#4ECDC4', '#FFE66D', '#A8DADC', '#FF6B35', '#FF9F1C', '#2EC4B6', '#EF476F'];

export const CycleView: React.FC<CycleViewProps> = ({ items, onItemsChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [subjectName, setSubjectName] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedDay, setSelectedDay] = useState('Segunda');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedType, setSelectedType] = useState<'Questões' | 'Revisão'>('Questões');

  const handleAddItem = () => {
    if (!subjectName || !duration) return;

    const newItem: CycleItem = {
      id: Math.random().toString(36).substr(2, 9),
      day: selectedDay,
      subject: subjectName,
      duration: duration,
      color: selectedColor,
      type: selectedType,
      progress: 0,
      completed: false
    };

    onItemsChange([...items, newItem]);
    setIsModalOpen(false);
    
    // Reset form
    setSubjectName('');
    setDuration('');
    setSelectedDay('Segunda');
    setSelectedColor(COLORS[0]);
    setSelectedType('Questões');
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-cadence-dark pb-24 pt-12 px-4 relative">
      <header className="mb-8">
        <h1 className="text-cadence-ice font-outfit font-semibold text-2xl">Meu Ciclo</h1>
        <p className="text-cadence-gray font-plex text-sm mt-1">Gerencie sua rotina semanal</p>
      </header>

      <div className="space-y-4">
        {DAYS.map((day, index) => {
          const dayItems = items.filter(item => item.day === day);
          const totalTasks = dayItems.length;
          const isToday = index === 3; // Thursday is mocked as today

          return (
            <div key={day} className={`bg-cadence-card p-4 rounded-xl border-l-4 transition-all ${isToday ? 'border-cadence-orange ring-1 ring-cadence-orange ring-opacity-30' : 'border-transparent'}`}>
              <div className="flex justify-between items-center mb-3">
                <h3 className={`font-sans font-medium flex items-center gap-2 ${isToday ? 'text-cadence-orange' : 'text-cadence-ice'}`}>
                  {day} {isToday && <span className="text-[10px] bg-cadence-orange bg-opacity-20 px-2 py-0.5 rounded">Hoje</span>}
                </h3>
                <span className="text-cadence-gray text-xs font-mono">{totalTasks} {totalTasks === 1 ? 'matéria' : 'matérias'}</span>
              </div>
              
              <div className="space-y-2">
                 {dayItems.length === 0 && (
                   <p className="text-cadence-gray text-xs italic opacity-40 py-2">Nenhuma matéria planejada</p>
                 )}
                 {dayItems.map(item => (
                   <div key={item.id} className="group flex items-center gap-3 bg-[rgba(255,255,255,0.03)] p-3 rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors">
                      <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <div className="flex-1">
                        <div className="text-cadence-ice text-sm font-semibold">{item.subject}</div>
                        <div className="flex items-center gap-3 mt-0.5">
                          <div className="text-cadence-gray text-[11px] flex items-center gap-1">
                            <Clock size={10} /> {item.duration}
                          </div>
                          <div className="text-cadence-orange text-[10px] font-medium bg-cadence-orange bg-opacity-10 px-1.5 rounded">
                            {item.type}
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-cadence-gray opacity-0 group-hover:opacity-100 hover:text-cadence-error transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                   </div>
                 ))}
              </div>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-cadence-orange rounded-full shadow-[0px_8px_20px_rgba(255,107,53,0.4)] flex items-center justify-center text-white active:scale-90 hover:scale-105 transition-all z-30"
      >
        <Plus size={28} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-70 backdrop-blur-md animate-fade-in">
          <div className="bg-cadence-card w-full max-w-sm rounded-3xl p-7 shadow-2xl border border-[rgba(255,255,255,0.1)] overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-outfit font-semibold text-cadence-ice">Nova Matéria</h3>
                <p className="text-cadence-gray text-xs">Planeje seu próximo estudo</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 rounded-full bg-white bg-opacity-5 flex items-center justify-center text-cadence-gray hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-cadence-gray text-[11px] mb-2 font-semibold uppercase tracking-wider">Matéria</label>
                <input 
                  type="text" 
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="Ex: Direito Penal"
                  className="w-full bg-[#1A2332] border border-gray-700 rounded-xl p-3.5 text-cadence-ice text-sm focus:outline-none focus:border-cadence-orange transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-cadence-gray text-[11px] mb-2 font-semibold uppercase tracking-wider">Dia</label>
                  <select 
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full bg-[#1A2332] border border-gray-700 rounded-xl p-3.5 text-cadence-ice text-sm focus:outline-none focus:border-cadence-orange appearance-none"
                  >
                    {DAYS.map(day => <option key={day} value={day}>{day}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-cadence-gray text-[11px] mb-2 font-semibold uppercase tracking-wider">Tempo</label>
                  <input 
                    type="text" 
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Ex: 1h 30m"
                    className="w-full bg-[#1A2332] border border-gray-700 rounded-xl p-3.5 text-cadence-ice text-sm focus:outline-none focus:border-cadence-orange transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-cadence-gray text-[11px] mb-2 font-semibold uppercase tracking-wider">Tipo de Estudo</label>
                <div className="flex gap-2">
                  {(['Questões', 'Revisão'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`flex-1 py-3 rounded-xl border font-sans text-xs font-semibold transition-all ${selectedType === type ? 'bg-cadence-orange border-cadence-orange text-white' : 'bg-transparent border-gray-700 text-cadence-gray hover:border-gray-500'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-cadence-gray text-[11px] mb-2 font-semibold uppercase tracking-wider">Etiqueta</label>
                <div className="flex flex-wrap gap-2.5">
                  {COLORS.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${selectedColor === color ? 'ring-2 ring-white ring-offset-2 ring-offset-cadence-card scale-110' : 'opacity-60 hover:opacity-100'}`}
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color && <Check size={14} className="text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleAddItem}
                className="w-full mt-4 h-14 bg-gradient-to-r from-cadence-orange to-[#FF8C52] rounded-2xl text-white font-outfit font-bold shadow-[0px_6px_20px_rgba(255,107,53,0.3)] active:scale-[0.97] transition-all"
              >
                Adicionar ao Ciclo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};