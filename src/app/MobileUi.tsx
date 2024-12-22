import { ReactNode } from 'react';

interface MobileProps {
  children: ReactNode;
}

const MobileUi = ({ children }: MobileProps) => {
  return <div className="flex justify-center md:max-w-[450px]">{children}</div>;
};

export default MobileUi;
