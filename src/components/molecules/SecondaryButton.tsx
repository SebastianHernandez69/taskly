import { Button } from "../ui/button";

interface SecondaryButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    icon?: React.ElementType;
}

export const SecondaryButton = ({children, onClick, icon: Icon}: SecondaryButtonProps) => {
    return (
        <Button
            variant="outline"
            onClick={onClick}
            className="w-full h-12 text-charcoal text-base font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2">
            {Icon && <Icon />}
            {children}
        </Button>
    )
}