import React, { useState } from 'react';
import { Bell, Flame, Play, X, ChevronRight, BookOpen, Plus, ChevronDown, Target, Shield, Briefcase } from 'lucide-react';
import { WeeklyProgress } from './WeeklyProgress';
import { TaskList } from './TaskList';
import { ViewState, SefaCargo } from '../types';
import { CycleItem } from '../App';
import { SEFA_CARGOS } from '../constants';

interface DashboardProps {
  onChangeView: (view: ViewState) => void;
  tasks: CycleItem[];
  targetCargo: SefaCargo;
  setTargetCargo: (cargo: SefaCargo) => void;
  onStartStudy: (subject: string) => void;
  onAddNewSubject: (name: string) => void;
  activeSubject: string;
  setActiveSubject: (subject: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  onChangeView, 
  tasks, 
  targetCargo,
  setTargetCargo,
  onStartStudy, 
  onAddNewSubject,
  activeSubject,
  setActiveSubject
}) => {
  const [showSubjectPicker, setShowSubjectPicker] = useState(false);
  const [showCargoPicker, setShowCargoPicker] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cadence-dark to-cadence-mid pb-20">
      {/* HEADER */}
      <header className="pt-12 px-4 pb-2 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onChangeView('profile')}
            className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-cadence-orange hover:opacity-90 transition-opacity"
          >
            <img src="https://picsum.photos/100/100" alt="User" className="w-full h-full object-cover" />
          </button>
          
          <div className="flex flex-col">
             <span className="text-white font-bold text-xs">Candidato SEFA</span>
             <div className="flex items-center gap-1.5 px-1 py-0.5 bg-opacity-20 bg-black rounded">
              <Flame size={12} className="text-cadence-orange fill-cadence-orange" />
              <span className="text-cadence-orange font-sans font-medium text-[10px]">12 dias de foco</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setShowCargoPicker(true)}
          className="flex flex-col items-center absolute left-1/2 transform -translate-x-1/2 top-14 bg-white bg-opacity-5 px-3 py-1 rounded-full border border-white border-opacity-10 active:scale-95 transition-all"
        >
           <span className="text-cadence-gray font-plex text-[8px] uppercase tracking-wider font-bold opacity-60">Cargo Alvo</span>
           <div className="flex items-center gap-1">
             <span className="text-white text-[10px] font-bold truncate max-w-[80px]">{targetCargo.name.split(' ')[0]}</span>
             <ChevronDown size={10} className="text-cadence-orange" />
           </div>
        </button>

        <button className="relative p-2 rounded-full hover:bg-cadence-card transition-colors">
          <Bell size={24} className="text-cadence-ice" />
        </button>
      </header>

      {/* WIDGET */}
      <WeeklyProgress />

      {/* DYNAMIC STUDY SELECTOR CARD */}
      <div className="px-4 mt-8">
        <div className="bg-cadence-card rounded-3xl p-1 shadow-2xl border border-white border-opacity-5 overflow-hidden">
          {/* Top Section: Subject Selector */}
          <button 
            onClick={() => setShowSubjectPicker(true)}
            className="w-full flex items-center justify-between p-5 bg-white bg-opacity-[0.03] hover:bg-opacity-[0.06] transition-all rounded-t-2xl group border-b border-white border-opacity-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cadence-orange bg-opacity-10 flex items-center justify-center text-cadence-orange group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
              <div className="text-left">
                <span className="block text-cadence-gray text-[10px] font-bold uppercase tracking-wider mb-0.5">Matéria em Foco</span>
                <span className="block text-white font-outfit font-bold text-lg leading-tight truncate max-w-[180px]">
                  {activeSubject || "Selecione do Edital"}
                </span>
              </div>
            </div>
            <div className="bg-white bg-opacity-5 p-2 rounded-xl group-hover:bg-opacity-10">
              <ChevronDown size={20} className="text-cadence-gray" />
            </div>
          </button>

          {/* Bottom Section: Start Button */}
          <button 
            onClick={() => activeSubject && onStartStudy(activeSubject)}
            disabled={!activeSubject}
            className="w-full h-16 bg-gradient-to-r from-cadence-orange to-[#FF8C52] flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:brightness-110 disabled:opacity-50 disabled:grayscale"
          >
            <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <Play size={18} className="text-white fill-white ml-0.5" />
            </div>
            <span className="text-white font-outfit font-bold text-[17px] uppercase tracking-wider">
              Iniciar Simulado
            </span>
          </button>
        </div>
      </div>

      {/* TASKS */}
      <TaskList tasks={tasks} onStartStudy={(subj) => { setActiveSubject(subj); onStartStudy(subj); }} />

      {/* CARGO PICKER MODAL */}
      {showCargoPicker && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-cadence-card w-full max-w-sm rounded-[32px] p-6 shadow-2xl border border-gray-800 animate-slide-up">
            <h3 className="text-xl font-outfit font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase className="text-cadence-orange" size={20} />
              Selecione o Cargo
            </h3>
            <div className="space-y-2">
              {SEFA_CARGOS.map((cargo) => (
                <button
                  key={cargo.id}
                  onClick={() => { setTargetCargo(cargo); setShowCargoPicker(false); setActiveSubject(''); }}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${targetCargo.id === cargo.id ? 'bg-cadence-orange bg-opacity-10 border-cadence-orange' : 'bg-white bg-opacity-5 border-transparent hover:border-gray-700'}`}
                >
                  <span className={`text-sm font-semibold ${targetCargo.id === cargo.id ? 'text-cadence-orange' : 'text-white'}`}>{cargo.name}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowCargoPicker(false)} className="w-full mt-6 py-3 text-cadence-gray font-bold">Fechar</button>
          </div>
        </div>
      )}

      {/* SUBJECT PICKER MODAL (Filtered by Edital) */}
      {showSubjectPicker && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black bg-opacity-80 backdrop-blur-md p-0 sm:p-4 animate-fade-in">
          <div className="bg-cadence-card w-full max-w-md rounded-t-[40px] sm:rounded-3xl p-8 shadow-2xl border border-gray-800 animate-slide-up flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-outfit font-bold text-white">Edital SEFA-PA</h3>
                <p className="text-cadence-gray text-xs mt-1">Disciplinas para {targetCargo.name.split(' ')[0]}</p>
              </div>
              <button 
                onClick={() => setShowSubjectPicker(false)} 
                className="w-10 h-10 rounded-full bg-white bg-opacity-5 flex items-center justify-center text-cadence-gray hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto no-scrollbar space-y-6 flex-1 pb-6">
              {/* Category: Gerais */}
              <div>
                <h4 className="text-[10px] font-bold text-cadence-gray uppercase tracking-widest mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                  Conhecimentos Gerais
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {targetCargo.subjects.filter(s => s.category === 'Gerais').map((subj) => (
                    <button
                      key={subj.name}
                      onClick={() => { setActiveSubject(subj.name); setShowSubjectPicker(false); }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${activeSubject === subj.name ? 'bg-cadence-orange bg-opacity-10 border-cadence-orange' : 'bg-white bg-opacity-[0.02] border-gray-800 hover:bg-opacity-[0.05]'}`}
                    >
                      <span className={`text-sm font-medium ${activeSubject === subj.name ? 'text-cadence-orange' : 'text-cadence-ice'}`}>{subj.name}</span>
                      {activeSubject === subj.name && <div className="w-2 h-2 rounded-full bg-cadence-orange animate-pulse"></div>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category: Específicos */}
              <div>
                <h4 className="text-[10px] font-bold text-cadence-orange uppercase tracking-widest mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cadence-orange"></div>
                  Conhecimentos Específicos
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {targetCargo.subjects.filter(s => s.category === 'Específicos').map((subj) => (
                    <button
                      key={subj.name}
                      onClick={() => { setActiveSubject(subj.name); setShowSubjectPicker(false); }}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${activeSubject === subj.name ? 'bg-cadence-orange bg-opacity-10 border-cadence-orange' : 'bg-white bg-opacity-[0.02] border-gray-800 hover:bg-opacity-[0.05]'}`}
                    >
                      <span className={`text-sm font-medium ${activeSubject === subj.name ? 'text-cadence-orange' : 'text-cadence-ice'}`}>{subj.name}</span>
                      {activeSubject === subj.name && <div className="w-2 h-2 rounded-full bg-cadence-orange animate-pulse"></div>}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 mt-auto">
              <button 
                onClick={() => { setShowSubjectPicker(false); setShowCargoPicker(true); }}
                className="w-full h-14 bg-white bg-opacity-5 rounded-2xl flex items-center justify-center gap-3 text-cadence-ice font-bold hover:bg-opacity-10 transition-all border border-dashed border-gray-700"
              >
                Trocar Cargo do Edital
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};