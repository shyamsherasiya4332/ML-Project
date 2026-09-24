import { Loader2 } from 'lucide-react';

export default function Loading({ message = "Loading data..." }) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] w-full">
      <Loader2 className="w-10 h-10 text-slate-900 animate-spin mb-4" />
      <p className="text-slate-500 font-medium animate-pulse">{message}</p>
    </div>
  );
}
