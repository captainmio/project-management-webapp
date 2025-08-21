import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription } from "./ui/sheet";

interface PageSheetProps {
  button: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

const PageSheet: React.FC<PageSheetProps> = ({
  button,
  title,
  description,
  children,
}): React.ReactElement => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {button}
      </SheetTrigger>
      <SheetContent side="right" className="w-100 p-6">
        {title && <SheetTitle>{title}</SheetTitle>}
        {description && (
          <SheetDescription>{description}</SheetDescription>
        )}
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default PageSheet;