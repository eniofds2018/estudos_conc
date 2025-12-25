import React, { useState, useMemo, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { StudyMode } from './components/StudyMode';
import { CycleView } from './components/CycleView';
import { AnalysisView } from './components/AnalysisView';
import { ProfileView } from './components/ProfileView';
import { BottomNav } from './components/BottomNav';
import { ViewState, SefaCargo } from './types';
import { SEFA_CARGOS } from './constants';

export interface CycleItem {
  id: string;
  day: string;
  subject: string;
  duration: string;
  color: string;
  type: 'Questões' | 'Revisão';
  progress: number;
  completed: boolean;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [targetCargo, setTargetCargo] = useState<SefaCargo>(SEFA_CARGOS[0]);
  
  // Initial Cycle based on Auditor (AFRE) for Thursday (Hoje)
  const [items, setItems] = useState<CycleItem[]>([
    { id: 's1', day: 'Quinta', subject: 'Legislação Tributária do Pará', duration: '2h 00min', color: '#FF6B35', type: 'Questões', progress: 0, completed: false },
    { id: 's2', day: 'Quinta', subject: 'Direito Tributário', duration: '1h 30min', color: '#4ECDC4', type: 'Questões', progress: 0, completed: false },
    { id: 's3', day: 'Segunda', subject: 'Contabilidade Geral, Avançada e de Custos', duration: '2h 00min', color: '#FFE66D', type: 'Revisão', progress: 0, completed: false },
  ]);

  const [activeDashboardSubject, setActiveDashboardSubject] = useState<string>('');

  const isTabBarVisible = ['dashboard', 'cycle', 'analysis', 'profile'].includes(currentView);
  const todayTasks = useMemo(() => items.filter(item => item.day === 'Quinta'), [items]);

  useEffect(() => {
    if (!activeDashboardSubject && items.length > 0) {
      const next = items.find(t => !t.completed && t.day === 'Quinta') || items[0];
      setActiveDashboardSubject(next.subject);
    }
  }, [items]);

  const handleStartStudy = (subjectName: string) => {
    setSelectedSubject(subjectName);
    setCurrentView('study');
  };

  const handleAddNewSubject = (name: string) => {
    const newItem: CycleItem = {
      id: Math.random().toString(36).substr(2, 9),
      day: 'Quinta',
      subject: name,
      duration: '1h 00min',
      color: '#FF6B35',
      type: 'Questões',
      progress: 0,
      completed: false
    };
    setItems(prev => [...prev, newItem]);
    setActiveDashboardSubject(name);
    handleStartStudy(name);
  };

  return (
    <div className="antialiased text-cadence-ice font-sans">
      <main>
        {currentView === 'dashboard' && (
          <Dashboard 
            onChangeView={setCurrentView} 
            tasks={todayTasks}
            targetCargo={targetCargo}
            setTargetCargo={setTargetCargo}
            onStartStudy={handleStartStudy}
            onAddNewSubject={handleAddNewSubject}
            activeSubject={activeDashboardSubject}
            setActiveSubject={setActiveDashboardSubject}
          />
        )}
        
        {currentView === 'cycle' && (
          <CycleView 
            items={items} 
            onItemsChange={setItems} 
          />
        )}
        
        {currentView === 'analysis' && <AnalysisView />}
        
        {currentView === 'profile' && (
          <ProfileView onLogout={() => setCurrentView('dashboard')} />
        )}
        
        {currentView === 'study' && (
          <StudyMode 
            subject={selectedSubject || "Estudo"} 
            onExit={() => setCurrentView('dashboard')} 
          />
        )}
      </main>

      {isTabBarVisible && (
        <BottomNav currentView={currentView} onChangeView={setCurrentView} />
      )}
    </div>
  );
}

export default App;