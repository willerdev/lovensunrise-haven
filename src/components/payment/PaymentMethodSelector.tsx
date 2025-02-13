
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, Building2 } from "lucide-react";

interface PaymentMethodSelectorProps {
  selectedMethod: string;
  onMethodChange: (value: string) => void;
}

export const PaymentMethodSelector = ({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) => {
  return (
    <RadioGroup value={selectedMethod} onValueChange={onMethodChange} className="grid grid-cols-4 gap-4">
      <div>
        <RadioGroupItem value="stripe" id="stripe" className="peer sr-only" />
        <Label
          htmlFor="stripe"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <CreditCard className="mb-3 h-6 w-6" />
          <span className="text-sm font-medium">Credit Card</span>
        </Label>
      </div>
      
      <div>
        <RadioGroupItem value="mobile_money" id="mobile_money" className="peer sr-only" />
        <Label
          htmlFor="mobile_money"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Wallet className="mb-3 h-6 w-6" />
          <span className="text-sm font-medium">Mobile Money</span>
        </Label>
      </div>

      <div>
        <RadioGroupItem value="world_remit" id="world_remit" className="peer sr-only" />
        <Label
          htmlFor="world_remit"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Wallet className="mb-3 h-6 w-6" />
          <span className="text-sm font-medium">WorldRemit</span>
        </Label>
      </div>

      <div>
        <RadioGroupItem value="bank_transfer" id="bank_transfer" className="peer sr-only" />
        <Label
          htmlFor="bank_transfer"
          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
        >
          <Building2 className="mb-3 h-6 w-6" />
          <span className="text-sm font-medium">Bank Transfer</span>
        </Label>
      </div>
    </RadioGroup>
  );
};
