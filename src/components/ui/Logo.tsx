import Image from 'next/image';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: { width: 120, height: 32 },
    md: { width: 160, height: 40 },
    lg: { width: 200, height: 50 }
  };

  const dimensions = sizeClasses[size];

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/logo/msa-logo.png"
        alt="Missouri Soybean Association"
        width={dimensions.width}
        height={dimensions.height}
        priority
        className="object-contain"
      />
    </div>
  );
}
