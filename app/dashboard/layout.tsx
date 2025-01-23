import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 bg-slate-900 p-2">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-4 bg-[#f3f6fc]">
        {children}
        {modal}
        <div id="modal-root" />
      </div>
    </div>
  );
}
