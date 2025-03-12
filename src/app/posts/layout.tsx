import Navbar from "@/components/layout/Navbar"

export default function PostPageLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
          <>
            <Navbar />
            {children}
          </>
    )
  }