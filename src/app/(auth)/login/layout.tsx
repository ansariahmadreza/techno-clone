import "../../globals.css";

function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main dir="rtl" lang="fa" className="font-serif">
        {children}
      </main>
    </>
  );
};

export default LoginLayout;