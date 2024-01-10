interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto my-8 w-full max-w-7xl min-h-[calc(100vh-308px)]">
      {children}
    </div>
  );
};

export default Container;
