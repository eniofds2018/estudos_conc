import React from 'react';
import { Home, Repeat, TrendingUp, User } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  
  const getButtonClass = (view: ViewState) => {
    const isActive = currentView === view;
    return `flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all duration-200 ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`;
  };

  const getIconColor = (view: ViewState) => {
    return currentView === view ? 'text-cadence-orange' : 'text-cadence-gray';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[72px] bg-[#1A1D2E] border-t border-[rgba(141,153,174,0.2)] flex justify-between px-6 z-40 pb-safe">
      
      {/* Home */}
      <button 
        onClick={() => onChangeView('dashboard')}
        className={`${getButtonClass('dashboard')} relative`}
      >
        {currentView === 'dashboard' && (
          <div className="absolute top-0 w-6 h-[3px] bg-cadence-orange rounded-b-sm animate-fade-in"></div>
        )}
        <Home size={24} className={`${getIconColor('dashboard')} mt-2`} strokeWidth={currentView === 'dashboard' ? 2.5 : 2} />
        <span className={`text-[11px] font-medium ${currentView === 'dashboard' ? 'text-cadence-orange' : 'text-cadence-gray'}`}>Início</span>
      </button>

      {/* Ciclo */}
      <button 
        onClick={() => onChangeView('cycle')}
        className={`${getButtonClass('cycle')} relative`}
      >
        {currentView === 'cycle' && (
          <div className="absolute top-0 w-6 h-[3px] bg-cadence-orange rounded-b-sm animate-fade-in"></div>
        )}
        <Repeat size={24} className={`${getIconColor('cycle')} mt-2`} strokeWidth={currentView === 'cycle' ? 2.5 : 2} />
        <span className={`text-[11px] font-medium ${currentView === 'cycle' ? 'text-cadence-orange' : 'text-cadence-gray'}`}>Ciclo</span>
      </button>

      {/* Análise */}
      <button 
        onClick={() => onChangeView('analysis')}
        className={`${getButtonClass('analysis')} relative`}
      >
        {currentView === 'analysis' && (
          <div className="absolute top-0 w-6 h-[3px] bg-cadence-orange rounded-b-sm animate-fade-in"></div>
        )}
        <TrendingUp size={24} className={`${getIconColor('analysis')} mt-2`} strokeWidth={currentView === 'analysis' ? 2.5 : 2} />
        <span className={`text-[11px] font-medium ${currentView === 'analysis' ? 'text-cadence-orange' : 'text-cadence-gray'}`}>Análise</span>
      </button>

      {/* Perfil */}
      <button 
        onClick={() => onChangeView('profile')}
        className={`${getButtonClass('profile')} relative`}
      >
        {currentView === 'profile' && (
          <div className="absolute top-0 w-6 h-[3px] bg-cadence-orange rounded-b-sm animate-fade-in"></div>
        )}
        <User size={24} className={`${getIconColor('profile')} mt-2`} strokeWidth={currentView === 'profile' ? 2.5 : 2} />
        <span className={`text-[11px] font-medium ${currentView === 'profile' ? 'text-cadence-orange' : 'text-cadence-gray'}`}>Perfil</span>
      </button>
    </nav>
  );
};