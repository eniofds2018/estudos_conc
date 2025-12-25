import React from 'react';
import { TrendingUp, Activity, Target, Award, ShieldCheck } from 'lucide-react';

export const AnalysisView: React.FC = () => {
  return (
    <div className="min-h-screen bg-cadence-dark pb-24 pt-12 px-4">
      <header className="mb-6">
        <h1 className="text-cadence-ice font-outfit font-semibold text-2xl">Simulado SEFA</h1>
        <p className="text-cadence-gray font-plex text-sm mt-1">Estatísticas rumo à aprovação</p>
      </header>
      
       <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-cadence-card p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
             <div className="flex items-center gap-2 mb-2 text-cadence-gray">
                <Activity size={16} />
                <span className="text-xs font-sans">Meta Conjunta</span>
             </div>
             <div className="text-cadence-orange text-2xl font-bold font-sans">64%</div>
             <div className="text-cadence-success text-[10px] mt-1 flex items-center gap-1">
               <ShieldCheck size={10} /> Acima do corte (60%)
             </div>
          </div>
          <div className="bg-cadence-card p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
             <div className="flex items-center gap-2 mb-2 text-cadence-gray">
                <Target size={16} />
                <span className="text-xs font-sans">Acertos Específicos</span>
             </div>
             <div className="text-cadence-ice text-2xl font-bold font-sans">82%</div>
             <div className="text-cadence-gray text-[10px] mt-1 uppercase font-bold tracking-wider">
               Foco em Legislação
             </div>
          </div>
       </div>

       <div className="bg-cadence-card rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-cadence-ice font-semibold text-sm">Rendimento por Edital</h3>
            <span className="text-[10px] text-cadence-gray bg-white bg-opacity-5 px-2 py-0.5 rounded">Min. 40%</span>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Legislação Tributária PA', val: 78, color: '#FF6B35' },
              { name: 'Contabilidade Geral', val: 45, color: '#FFE66D' },
              { name: 'Direito Tributário', val: 92, color: '#4ECDC4' },
              { name: 'Português', val: 68, color: '#A8DADC' },
              { name: 'Fluência em Dados', val: 32, color: '#EF476F', warning: true }
            ].map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className={`font-medium ${item.warning ? 'text-cadence-error' : 'text-cadence-ice'}`}>
                    {item.name} {item.warning && '⚠️'}
                  </span>
                  <span className="text-cadence-gray">{item.val}%</span>
                </div>
                <div className="h-2 bg-cadence-darkerGray rounded-full overflow-hidden">
                   <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${item.val}%`, backgroundColor: item.color }}></div>
                </div>
                {item.warning && (
                  <p className="text-[9px] text-cadence-error mt-1 italic">Abaixo do mínimo de 40% exigido no item 9.1.5</p>
                )}
              </div>
            ))}
          </div>
       </div>
    </div>
  );
};