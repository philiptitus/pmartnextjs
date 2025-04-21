"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import React from "react"

interface PlatformAccountDialogProps {
  open: boolean
  platform: "fiverr" | "upwork" | null
  onClose: () => void
  onProceed: () => void
}

const PLATFORM_CONFIG = {
  fiverr: {
    name: "Fiverr",
    accountType: "seller account",
    signupUrl: "https://www.fiverr.com/join"
  },
  upwork: {
    name: "Upwork",
    accountType: "client account",
    signupUrl: "https://www.upwork.com/signup?signupType=client"
  }
}

export function PlatformAccountDialog({ open, platform, onClose, onProceed }: PlatformAccountDialogProps) {
  if (!platform) return null
  const config = PLATFORM_CONFIG[platform]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Do you have a {config.accountType} on {config.name}?
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 text-sm text-muted-foreground">
          You need a {config.accountType} to complete checkout via {config.name}.
        </div>
        <DialogFooter className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button variant="secondary" className="w-full sm:w-auto" onClick={onProceed}>
            Yes, I have an account
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={() => window.open(config.signupUrl, "_blank")}
          >
            Create Account
            <ExternalLink className="h-4 w-4 ml-1" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
