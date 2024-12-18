import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PaymentMethodSelector } from "@/components/payment/PaymentMethodSelector";
import { PaymentSummary } from "@/components/payment/PaymentSummary";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

export const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { item } = location.state || {};
  
  if (!item) {
    return <div>No payment information found</div>;
  }

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Please login",
          description: "You need to be logged in to make a payment",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      if (paymentMethod === "stripe") {
        const { data, error } = await supabase.functions.invoke('create-checkout-session', {
          body: {
            itemId: item.id,
            itemType: item.type,
            price: item.price,
          },
        });

        if (error) throw error;

        if (data?.url) {
          window.location.href = data.url;
        }
      } else {
        // Handle other payment methods
        toast({
          title: "Payment method not available",
          description: "This payment method is not available yet",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-4 mb-6">
        <div className="container mx-auto max-w-3xl">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-8">
          <PaymentSummary
            title={item.title}
            price={item.price}
            type={item.type}
          />

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
            <PaymentMethodSelector
              selectedMethod={paymentMethod}
              onMethodChange={setPaymentMethod}
            />
          </div>

          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay Now"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Payment;