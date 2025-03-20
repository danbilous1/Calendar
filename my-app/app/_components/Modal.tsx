export default function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed w-screen h-screen top-0 left-0 bg-gray-400/80 p-2">
      <div className="translate-middle position-absolute top-50 start-50 h-fit">
        <button className="absolute right-1 top-1" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
