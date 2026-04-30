import { UtensilsCrossed } from 'lucide-react';

function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-[#0F6657] flex flex-col items-center justify-center z-[100]">
      <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
        <div className="bg-[#F8FAFC] p-6 rounded-full shadow-lg mb-6">
          <UtensilsCrossed size={64} className="text-[#0F6657]" />
        </div>
        <h1 className="text-4xl font-bold text-[#F8FAFC] tracking-tight">
          FAMT<span className="text-[#FBA808]">CANTEEN</span>
        </h1>
      </div>
      <div className="pb-10">
        <h2 className="text-[#FBA808] font-semibold tracking-widest text-sm uppercase opacity-90">
          famt canteen
        </h2>
      </div>
    </div>
  );
}

export default SplashScreen;
