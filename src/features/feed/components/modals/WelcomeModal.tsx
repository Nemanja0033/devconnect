import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
  import { useEffect, useState } from "react"
  
  const WelcomeModal = () => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const hasSeenModal = localStorage.getItem('devconnect_welcome_seen')
        if (!hasSeenModal) {
        const timer = setTimeout(() => {
            setOpen(true)
            localStorage.setItem('devconnect_welcome_seen', 'true')
        }, 1000)
        return () => clearTimeout(timer)
    }
    }, [])
  
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Welcome to DevConnect!</AlertDialogTitle>
            <AlertDialogDescription>
              Thank you for testing the DevConnect beta. We hope you have a pleasant and insightful experience!
              <br /><br />
              Feel free to share educational content with developers and help grow the community.
              <br /><br />
              <strong>Disclaimer:</strong> Sharing content unrelated to programming or developer education is strictly prohibited. Any posts that violate this rule will be removed, and the associated account may be blocked.
              <br /><br />
              Enjoy exploring DevConnect beta!
            </AlertDialogDescription>
          </AlertDialogHeader>
            <AlertDialogFooter>
                <Button onClick={() => setOpen(false)}>Got it!</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
  export default WelcomeModal
  