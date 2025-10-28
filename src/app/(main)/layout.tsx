import Nav from "./components/Nav";
import Footer from "./components/Footer";
import type { Metadata } from "next";
import ShoppingCartContextProvider from "./Context/ShoppingCartContext";


export const metadata: Metadata = {
  title: {
    default: "تکنولایف - فروشگاه اینترنتی موبایل و تکنولوژی",
    template: " %s | تکنولایف"
  },
};

export default function Mainayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShoppingCartContextProvider>
        <div className="flex flex-col min-h-screen">
          <Nav />
          <main className="flex-1 grow font-serif min-h-[980px]" dir="rtl" lang="fa" >
            {children}
          </main>

        </div>
               <div className="min-h-[450px] max-h-[500px]">
            <Footer />
          </div>
      </ShoppingCartContextProvider>
    </>
  );
};