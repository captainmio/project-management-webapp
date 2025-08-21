import { type ReactNode } from "react"

interface PageLayoutProps {
  title: string
  children: ReactNode
  actions?: ReactNode
}

export function PageLayout({ title, children, actions }: PageLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 ">
      {/* Top Navbar */}
      <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2">{actions}</div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">{children}</main>

      {/* Optional Footer */}
      <footer className="border-t bg-white px-6 py-3 text-sm text-gray-500">
        © {new Date().getFullYear()} React + Typescript + Golang backend. All rights reserved.
      </footer>
    </div>
  )
}