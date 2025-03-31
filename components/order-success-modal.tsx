"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Mail, MessageSquare, Paperclip } from "lucide-react"
import Image from "next/image"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  color?: string
}

interface OrderDetails {
  items: OrderItem[]
  total: number
  email: string
  instructions?: string
  attachedFile?: File | null
}

interface OrderSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  platform: "fiverr" | "upwork"
  orderDetails?: OrderDetails | null
}

export function OrderSuccessModal({ isOpen, onClose, platform, orderDetails }: OrderSuccessModalProps) {
  const platformConfig = {
    fiverr: {
      color: "#1DBF73",
      logo: "https://www.svgrepo.com/show/330447/fiverr.svg",
      name: "Fiverr"
    },
    upwork: {
      color: "#14A800",
      logo: "https://www.svgrepo.com/show/349549/upwork.svg",
      name: "Upwork"
    }
  }

  const config = platformConfig[platform]

  if (!orderDetails) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogTitle className="sr-only">Order Success</DialogTitle>
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ backgroundColor: config.color }}
            >
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Order Successfully Placed!
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <span>via</span>
              <div 
                className="px-3 py-1 rounded-full flex items-center gap-2"
                style={{ backgroundColor: config.color }}
              >
                <Image
                  src={config.logo}
                  alt={config.name}
                  width={20}
                  height={20}
                  className="filter invert"
                />
                <span className="text-white font-medium">{config.name}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="space-y-2">
              {orderDetails.items?.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 font-medium">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>${orderDetails.total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm mb-2">
                <Mail className="h-4 w-4" />
                <span>Further instructions have been sent to:</span>
              </div>
              <p className="font-medium">{orderDetails.email}</p>
            </div>

            {orderDetails.instructions && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Additional Instructions:</span>
                </div>
                <p className="text-sm">{orderDetails.instructions}</p>
              </div>
            )}

            {orderDetails.attachedFile && (
              <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Paperclip className="h-4 w-4" />
                <span>Attached: {orderDetails.attachedFile.name}</span>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}