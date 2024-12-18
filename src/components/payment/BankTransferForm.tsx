import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload } from "lucide-react";

interface BankTransferFormProps {
  itemId: string;
  itemType: string;
  price: number;
}

export const BankTransferForm = ({ itemId, itemType, price }: BankTransferFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    bankName: "",
    accountNumber: "",
  });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please login to continue with payment",
          variant: "destructive",
        });
        return;
      }

      let proofUrl = null;
      if (proofFile) {
        const fileExt = proofFile.name.split('.').pop();
        const filePath = `${session.user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('payment_proofs')
          .upload(filePath, proofFile);

        if (uploadError) throw uploadError;
        proofUrl = data.path;
      }

      const paymentData = {
        user_id: session.user.id,
        [itemType === "property" ? "property_id" : "land_id"]: itemId,
        full_name: formData.fullName,
        bank_name: formData.bankName,
        account_number: formData.accountNumber,
        amount: price,
        proof_url: proofUrl,
      };

      const { error } = await supabase
        .from("bank_transfer_payments")
        .insert([paymentData]);

      if (error) throw error;

      toast({
        title: "Payment submitted",
        description: "Your bank transfer details have been submitted. We will verify the payment shortly.",
      });
    } catch (error) {
      console.error("Payment error:", error);
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert>
        <AlertDescription>
          Please transfer the amount to our bank account:<br />
          Bank: LovenSunrise Bank<br />
          Account Name: LovenSunrise Properties<br />
          Account Number: 1234567890<br />
          Swift Code: LOVENXXX
        </AlertDescription>
      </Alert>

      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="bankName">Your Bank Name</Label>
        <Input
          id="bankName"
          value={formData.bankName}
          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="accountNumber">Your Account Number</Label>
        <Input
          id="accountNumber"
          value={formData.accountNumber}
          onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="proofFile">Upload Payment Proof</Label>
        <div className="mt-1">
          <Input
            id="proofFile"
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Processing..." : "Submit Payment"}
      </Button>
    </form>
  );
};