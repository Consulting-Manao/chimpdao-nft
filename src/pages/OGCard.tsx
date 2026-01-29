export default function OGCard() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {/* Social card at exact 1200x630px */}
      <div 
        className="w-[1200px] h-[630px] relative flex flex-col items-center justify-center"
        style={{ backgroundColor: 'hsl(30 25% 32%)' }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: 'url(/token-bg-pattern.png)',
            backgroundSize: '600px',
            backgroundRepeat: 'repeat'
          }}
          aria-hidden="true"
        />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo */}
          <img 
            src="/chimp-joystick.png" 
            alt="ChimpDAO" 
            className="w-48 h-48 mb-8"
          />
          
          {/* Title */}
          <h1 className="text-6xl font-bold text-white mb-4">
            ChimpDAO NFT
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl text-white/70">
            NFC powered NFT collections
          </p>
        </div>
      </div>
    </div>
  );
}
