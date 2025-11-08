
interface SubtitleProps {
    children: React.ReactNode;
    className?: string;
}

export const Subtitle = ({ children, className = '' }: SubtitleProps) => (
  <p className={`text-gray-500 text-center ${className}`}>{children}</p>
);