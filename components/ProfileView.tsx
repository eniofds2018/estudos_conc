import React, { useState } from 'react';
import { User, Settings, LogOut, Shield, Bell, CreditCard, ChevronRight, Check, Award } from 'lucide-react';

interface ProfileViewProps {
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Futuro Auditor SEFA");

  return (
    <div className="min-h-screen bg-cadence-dark pb-24 pt-12 px-4 animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-4 border-cadence-orange overflow-hidden mb-4 shadow-xl">
            <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover" />
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute bottom-4 right-0 w-8 h-8 bg-cadence-orange rounded-full border-2 border-cadence-dark flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
             {isEditing ? <Check size={16} className="text-white" /> : <Settings size={16} className="text-white" />}
          </button>
        </div>
        
        {isEditing ? (
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="bg-[#1A2332] border border-cadence-orange rounded-lg px-3 py-1 text-white text-center font-outfit text-xl focus:outline-none"
            autoFocus
          />
        ) : (
          <h2 className="text-cadence-ice font-outfit font-semibold text-xl">{name}</h2>
        )}
        
        <div className="flex items-center gap-2 mt-2">
          <span className="text-cadence-gray font-plex text-xs bg-cadence-card px-3 py-1 rounded-full border border-white border-opacity-5">Auditor Fiscal (AFRE)</span>
          <div className="flex items-center gap-1 bg-cadence-orange bg-opacity-10 px-2 py-1 rounded-full border border-cadence-orange border-opacity-20">
            <Award size={10} className="text-cadence-orange" />
            <span className="text-cadence-orange text-[10px] font-bold">ELITE</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
         <h3 className="text-cadence-gray text-[10px] font-bold uppercase tracking-[2px] ml-2 mb-2 opacity-60">Meu Desempenho SEFA</h3>
         
         <div className="bg-cadence-card p-4 rounded-2xl border border-white border-opacity-5 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-cadence-gray text-xs">Vagas AFRE (Ampla): 31</span>
              <span className="text-cadence-orange font-bold text-xs">Sua posição: #42</span>
            </div>
            <div className="w-full h-1.5 bg-cadence-dark rounded-full overflow-hidden">
              <div className="h-full bg-cadence-orange" style={{ width: '70%' }}></div>
            </div>
            <p className="text-[10px] text-cadence-gray mt-2 italic">*Estimativa baseada nos seus acertos de simulado</p>
         </div>

         <h3 className="text-cadence-gray text-[10px] font-bold uppercase tracking-[2px] ml-2 mb-2 opacity-60">Configurações</h3>
         
         <button className="w-full flex items-center justify-between bg-cadence-card p-4 rounded-2xl active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cadence-orange bg-opacity-10 flex items-center justify-center">
                <Shield className="text-cadence-orange" size={20} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-cadence-ice font-sans font-semibold text-sm">Privacidade de Dados</span>
                <span className="text-cadence-gray text-[11px]">Seus simulados e anotações</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-cadence-gray" />
         </button>

         <button 
           onClick={onLogout}
           className="w-full flex items-center justify-center gap-2 p-4 mt-8 text-cadence-error hover:bg-cadence-error hover:bg-opacity-10 rounded-2xl transition-all"
         >
            <LogOut size={18} />
            <span className="font-bold text-sm">Sair do Dashboard</span>
         </button>
      </div>
    </div>
  );
};