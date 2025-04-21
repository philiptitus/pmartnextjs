"use client"
import { useDispatch, useSelector } from "react-redux";
import { resetOrderState, submitOrder } from "@/app/store/actions";
import { RootStateType } from "@/app/store/store";

import { useEffect, useState } from "react"
import Image from "next/image"
import { ShoppingCart, X, Plus, Minus, Upload, AlertCircle, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OrderSuccessModal } from "@/components/order-success-modal"
import { Loader2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { PlatformAccountDialog } from "@/components/platform-account-dialog"

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export function CartDropdown() {
  const dispatch = useDispatch();
 const orderState = useSelector((state: RootStateType) => state.order);
const { loading, success, error } = orderState;
  const [open, setOpen] = useState(false)
  const { items, removeItem, updateQuantity, total } = useCart()
  const [email, setEmail] = useState("")
  const [instructions, setInstructions] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutPlatform, setCheckoutPlatform] = useState<"fiverr" | "upwork" | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>("")
  const [showPlatformDialog, setShowPlatformDialog] = useState<"fiverr" | "upwork" | null>(null)
  const [pendingCheckoutPlatform, setPendingCheckoutPlatform] = useState<"fiverr" | "upwork" | null>(null)

  const totalPrice = total || 0

  const handleIncreaseQuantity = (productId: string) => {
    const item = items.find((item) => item.id === productId)
    if (item) {
      updateQuantity(productId, item.quantity + 1)
    }
  }

  const handleDecreaseQuantity = (productId: string) => {
    const item = items.find((item) => item.id === productId)
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1)
    } else if (item) {
      removeItem(productId)
    }
  }

  const handleCheckout = async (platform: "fiverr" | "upwork") => {
    setPendingCheckoutPlatform(platform)
    setShowPlatformDialog(platform)
  }

  const proceedWithCheckout = async () => {
    if (!pendingCheckoutPlatform) return
    setShowPlatformDialog(null)

    if (!email.trim() || !email.includes("@")) {
      return // You might want to show an error message here
    }

    setCheckoutPlatform(pendingCheckoutPlatform)
    setIsCheckingOut(true)

    const orderDetails = {
      items,
      total: totalPrice,
      email,
      instructions: instructions.trim() || undefined,
      attachedFile,
    };

    await dispatch(submitOrder(orderDetails, pendingCheckoutPlatform));
  }

  useEffect(() => {
    if (!loading && success) {
      setIsCheckingOut(false);
      setShowSuccessModal(true)
      setOpen(false) // Close dropdown

      setFileError("");
      dispatch(resetOrderState()); // Reset loading and success

    }
  }, [loading, success, items, removeItem]);

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
    setCheckoutPlatform(null)
    // Clear cart
    items.forEach(item => removeItem(item.id))
    setEmail("")
    setInstructions("")
    setAttachedFile(null)
    setFileError("")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");
  
    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Invalid file type. Please upload PDF, Image, or Word document.");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError("File size should be less than 5MB");
        return;
      }
      setAttachedFile(file);
    }
  };
  const removeFile = () => {
    setAttachedFile(null)
    setFileError("")
  }

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="flex flex-col h-[calc(100vh-100px)] max-h-[600px]">
            <div className="p-4 border-b">
              <h3 className="font-medium text-lg">Your Cart</h3>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <div
                          className="w-16 h-16 rounded-md flex-shrink-0 relative"
                          style={{ backgroundColor: item.color || '#f3f4f6' }}
                        >
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-primary text-sm font-medium">${item.price}</p>
                          <div className="flex items-center mt-1">
                            <button
                              onClick={() => handleDecreaseQuantity(item.id)}
                              className="text-gray-500 hover:text-primary"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="mx-2 text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleIncreaseQuantity(item.id)}
                              className="text-gray-500 hover:text-primary"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-primary"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t p-4 bg-background">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total:</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                    </Button>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Enter your email for order details"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm"
                        required
                      />
                      <Textarea
                        placeholder="Additional instructions (optional)"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        className="w-full min-h-[80px] text-sm"
                      />
<div className="flex items-center gap-2">
  <Button
    variant="outline"
    className="flex-1"
    onClick={() => document.getElementById('file-upload')?.click()}
  >
    <Upload className="h-4 w-4 mr-2" />
    {attachedFile ? attachedFile.name : "Attach File"}
  </Button>
  <input
    id="file-upload"
    type="file"
    className="hidden"
    onChange={handleFileChange}
    accept={ALLOWED_FILE_TYPES.join(',')}
  />
  {attachedFile && (
    <Button
      variant="ghost"
      size="icon"
      onClick={removeFile}
      className="text-red-500 hover:text-red-600"
    >
      <X className="h-4 w-4" />
    </Button>
  )}
</div>
                      {error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
                      {fileError && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{fileError}</AlertDescription>
                        </Alert>
                      )}
                      <p className="text-center text-sm text-muted-foreground">Checkout with:</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Button 
                          className="flex items-center justify-center gap-2 bg-[#1DBF73] hover:bg-[#19a563]"
                          onClick={() => handleCheckout("fiverr")}
                          disabled={isCheckingOut || !email.trim() || !email.includes("@")}
                        >
                          {loading && checkoutPlatform === "fiverr" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Image
                                src="https://www.svgrepo.com/show/330447/fiverr.svg"
                                alt="Fiverr"
                                width={20}
                                height={20}
                                className="filter invert"
                              />
                              <span>Fiverr</span>
                            </>
                          )}
                        </Button>
                        <Button 
                          className="flex items-center justify-center gap-2 bg-[#14A800] hover:bg-[#118f00]"
                          onClick={() => handleCheckout("upwork")}
                          disabled={isCheckingOut || !email.trim() || !email.includes("@")}
                        >
                          {loading && checkoutPlatform === "upwork" ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Image
                                src="https://www.svgrepo.com/show/349549/upwork.svg"
                                alt="Upwork"
                                width={20}
                                height={20}
                                className="filter invert"
                              />
                              <span>Upwork</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderSuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        platform={checkoutPlatform || "fiverr"}
        orderDetails={{
          items: items,
          total: totalPrice,
          email: email,
          instructions: instructions.trim() || undefined,
          attachedFile: attachedFile
        }}
      />
      <PlatformAccountDialog
        open={!!showPlatformDialog}
        platform={showPlatformDialog}
        onClose={() => setShowPlatformDialog(null)}
        onProceed={proceedWithCheckout}
      />
    </>
  )
}
