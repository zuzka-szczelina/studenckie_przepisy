export default function PhoneShell({ children }) {
  return (
    <div className="flex min-h-svh items-start justify-center bg-shell font-body">
      <div className="relative flex h-svh w-full max-w-[390px] flex-col overflow-hidden bg-bg">
        {children}
      </div>
    </div>
  );
}
