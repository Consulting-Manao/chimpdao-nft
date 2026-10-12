export const BackgroundPattern = () => (
  <div
    className="absolute inset-0 opacity-[0.08] pointer-events-none"
    style={{
      backgroundImage: 'url(token-bg-pattern.png)',
      backgroundSize: '600px',
      backgroundRepeat: 'repeat',
    }}
    aria-hidden="true"
  />
);
