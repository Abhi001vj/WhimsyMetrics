const WhimsyIcon = ({ className = "w-10 h-10 text-primary" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.376 13.27L12 15.926l-7.376-2.656A1 1 0 013.6 12.2v-.23a1 1 0 01.67-.942l7.38-2.77a2.35 2.35 0 011.7 0l7.38 2.77a1 1 0 01.67.942v.23a1 1 0 01-1.024 1.07zM8.7 17.33l-1.25-.44A1 1 0 016.6 15.8v-.23a1 1 0 01.7-.95l3.7-1.5v2.9a2.35 2.35 0 01-2.3 1.31zm11-1.53a1 1 0 01-.85 1.09l-1.25.44a2.35 2.35 0 01-2.3-1.3v-2.9l3.7 1.5a1 1 0 01.7.95v.23z"></path>
      <path d="M12 7a3 3 0 100-6 3 3 0 000 6zm0-4a1 1 0 110 2 1 1 0 010-2zm0 20a3 3 0 100-6 3 3 0 000 6zm0-4a1 1 0 110 2 1 1 0 010-2z"></path>
    </svg>
  );
};

export default WhimsyIcon;
