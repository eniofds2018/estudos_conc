import React, { useState, useEffect, useMemo } from 'react';
import { X, Clock, ChevronRight, Check, AlertCircle, ArrowRight, BookOpen } from 'lucide-react';
import { MOCK_QUESTIONS } from '../constants';

interface StudyModeProps {
  subject: string;
  onExit: () => void;
}

export const StudyMode: React.FC<StudyModeProps> = ({ subject, onExit }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutos em segundos
  const [showExitModal, setShowExitModal] = useState(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);

  // Filter questions by subject
  const filteredQuestions = useMemo(() => {
    const q = MOCK_QUESTIONS.filter(q => q.subject === subject);
    return q.length > 0 ? q : MOCK_QUESTIONS; // Fallback to all if specific subject not found
  }, [subject]);

  const currentQuestion = filteredQuestions[currentQIndex % filteredQuestions.length];
  const totalQuestions = filteredQuestions.length;
  const isCorrect = isConfirmed && currentQuestion.options.find(o => o.id === selectedOption)?.isCorrect;

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentQIndex < totalQuestions - 1) {
      setSelectedOption(null);
      setIsConfirmed(false);
      setDifficulty(null);
      setCurrentQIndex(prev => prev + 1);
      window.scrollTo(0,0);
    } else {
      onExit();
    }
  };

  return (
    <div className="fixed inset-0 bg-cadence-contentBg z-50 flex flex-col overflow-hidden">
      
      {/* HEADER */}
      <header className="flex-none h-[60px] flex items-center justify-between px-3 bg-gradient-to-b from-[rgba(10,36,99,0.9)] to-transparent relative z-20">
        <button 
          onClick={() => setShowExitModal(true)}
          className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 active:scale-95 transition-all"
        >
          <X size={24} className="text-cadence-ice opacity-70" />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-cadence-ice font-sans font-medium text-sm truncate max-w-[150px]">{subject}</span>
          <span className="text-cadence-ice opacity-60 font-sans text-[11px]">
            Questão {currentQIndex + 1} de {totalQuestions}
          </span>
        </div>

        <button className="flex items-center gap-2 bg-[rgba(255,107,53,0.15)] px-2.5 py-1.5 rounded-lg active:scale-95 transition-transform">
          <Clock size={14} className="text-cadence-orange" />
          <span className="text-cadence-orange font-mono font-medium text-sm">
            {formatTime(timeLeft)}
          </span>
        </button>
      </header>

      {/* PROGRESS BAR */}
      <div className="w-full h-[3px] bg-[rgba(141,153,174,0.2)]">
        <div 
          className="h-full bg-gradient-to-r from-cadence-orange to-cadence-orangeLight transition-all duration-500"
          style={{ width: `${((currentQIndex + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        <div className="px-5 pt-4">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-cadence-card text-cadence-gray text-[10px] font-bold uppercase tracking-wider">
               <BookOpen size={10} /> {currentQuestion.id}
            </span>
          </div>

          <div 
            className="font-plex text-[17px] leading-[1.6] text-cadence-ice text-justify mb-8"
            dangerouslySetInnerHTML={{ __html: currentQuestion.text }}
          />

          <div className="flex flex-col gap-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.id;
              let borderColor = 'border-[rgba(141,153,174,0.2)]';
              let bgColor = 'bg-[#1A2332]';
              let labelBg = 'bg-cadence-card';
              let labelColor = 'text-cadence-gray';

              if (isSelected) {
                borderColor = 'border-cadence-orange';
                labelBg = 'bg-cadence-orange';
                labelColor = 'text-white';
              }

              if (isConfirmed) {
                if (option.isCorrect) {
                   borderColor = 'border-cadence-success';
                   bgColor = 'bg-[rgba(39,174,96,0.1)]';
                   if (isSelected) labelBg = 'bg-cadence-success';
                } else if (isSelected && !option.isCorrect) {
                   borderColor = 'border-cadence-error';
                   bgColor = 'bg-[rgba(231,76,60,0.1)]';
                   labelBg = 'bg-cadence-error';
                }
              }

              return (
                <button
                  key={option.id}
                  disabled={isConfirmed}
                  onClick={() => setSelectedOption(option.id)}
                  className={`relative flex items-start w-full p-3.5 rounded-xl border ${borderColor} ${bgColor} transition-all duration-200 active:scale-[0.99] text-left`}
                >
                  <div className={`flex-none w-7 h-7 rounded-full ${labelBg} flex items-center justify-center transition-colors mt-0.5`}>
                    <span className={`font-outfit font-semibold text-sm ${labelColor}`}>
                      {option.id.toUpperCase()}
                    </span>
                  </div>
                  <span className="ml-3 font-plex text-[15px] text-cadence-ice leading-snug">
                    {option.text}
                  </span>
                </button>
              );
            })}
          </div>

          {isConfirmed && (
            <div className="mt-8 animate-slide-up">
              <div className="bg-[#1A2332] p-4 rounded-xl border border-gray-700">
                <h4 className="text-cadence-ice font-sans font-semibold text-sm mb-2 flex items-center gap-2">
                  {isCorrect ? <Check size={16} className="text-cadence-success"/> : <AlertCircle size={16} className="text-cadence-error"/>}
                  Gabarito Comentado
                </h4>
                <p 
                  className="font-plex text-sm text-cadence-ice leading-6 opacity-90"
                  dangerouslySetInnerHTML={{ __html: currentQuestion.explanation }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${isConfirmed ? 'bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-transparent h-auto pt-10' : 'bg-gradient-to-t from-cadence-dark to-transparent'}`}>
        {!selectedOption && !isConfirmed && (
          <div className="flex justify-center mb-4">
             <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-xl border border-cadence-gray text-cadence-gray font-sans font-medium text-sm hover:bg-cadence-card transition-colors">
               Pular <ArrowRight size={14} />
             </button>
          </div>
        )}

        {selectedOption && !isConfirmed && (
          <div className="flex flex-col gap-3 animate-slide-up">
            <button onClick={() => setSelectedOption(null)} className="text-center text-[13px] text-cadence-ice opacity-60 py-1">
              Mudar resposta
            </button>
            <button onClick={() => setIsConfirmed(true)} className="w-full h-14 bg-gradient-to-r from-cadence-orange to-[#FF8C52] rounded-2xl shadow-lg text-white font-outfit font-semibold text-[17px]">
              Confirmar
            </button>
          </div>
        )}

        {isConfirmed && (
          <div className="flex gap-3 animate-slide-up">
             <div className="flex-1 bg-cadence-card rounded-xl p-1 flex items-center justify-between gap-1">
                {(['easy', 'medium', 'hard'] as const).map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff)}
                      className={`flex-1 h-full rounded-lg text-lg flex items-center justify-center transition-all ${difficulty === diff ? 'bg-white bg-opacity-10 scale-105' : 'opacity-50 grayscale'}`}
                    >
                      {diff === 'easy' ? '😊' : diff === 'medium' ? '😐' : '😓'}
                    </button>
                ))}
             </div>
             <button onClick={handleNext} className="flex-1 h-14 bg-cadence-orange rounded-xl shadow-lg flex items-center justify-center gap-2 text-white font-outfit font-semibold text-base">
               Próxima <ChevronRight size={18} />
             </button>
          </div>
        )}
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-6 bg-black bg-opacity-60 backdrop-blur-sm animate-fade-in">
          <div className="bg-cadence-card w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-gray-800">
             <h3 className="text-xl font-outfit font-semibold text-white mb-2">Pausar simulado?</h3>
             <p className="text-cadence-gray font-plex text-sm mb-6">Seu progresso será salvo para análise.</p>
             <div className="flex gap-3">
               <button onClick={() => { setShowExitModal(false); onExit(); }} className="flex-1 py-3 rounded-xl border border-gray-600 text-cadence-ice font-medium">
                 Sair
               </button>
               <button onClick={() => setShowExitModal(false)} className="flex-1 py-3 rounded-xl bg-cadence-orange text-white font-medium">
                 Continuar
               </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};