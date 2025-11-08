interface HeadingProps {
    children: React.ReactNode;
    className?: string;
}

export const Heading = ({ children, className = '' }: HeadingProps) => (
  <h1 className={`text-3xl text-charcoal font-bold text-center ${className}`}>{children}</h1>
);