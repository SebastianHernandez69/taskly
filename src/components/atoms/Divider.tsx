interface DividerProps {
    text: string;
}

export const Divider = ({ text }: DividerProps) => (
  <div className="flex items-center gap-4 my-6">
    <div className="flex-1 h-px bg-gray-200"></div>
    <span className="text-gray-500 text-sm">{text}</span>
    <div className="flex-1 h-px bg-gray-200"></div>
  </div>
);