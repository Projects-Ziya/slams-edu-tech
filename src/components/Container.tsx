const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-25 ">
      {children}
    </div>
  );
};

export default Container;