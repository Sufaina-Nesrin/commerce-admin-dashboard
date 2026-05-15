import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function AdminLayout({
  children,
}) {
  return (
    <div className="h-screen bg-gray-100">

      {/* FIXED NAVBAR */}
      <header className="fixed top-0 left-0 w-full h-16 z-50">

        <Navbar />

      </header>


      {/* BODY */}
      <div className="flex pt-16 h-screen">

        {/* DESKTOP SIDEBAR */}
        <aside
          className="
            hidden lg:block
            fixed
            top-16
            left-0
            w-72
            h-[calc(100vh-64px)]
            z-40
          "
        >

          <Sidebar />

        </aside>


        {/* PAGE CONTENT */}
        <main
          className="
            flex-1
            lg:ml-72
            h-[calc(100vh-64px)]
            overflow-y-auto
            p-4
            sm:p-6
            lg:p-8
          "
        >

          {children}

        </main>

      </div>
    </div>
  )
}