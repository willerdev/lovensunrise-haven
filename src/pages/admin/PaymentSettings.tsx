import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const PaymentSettings = () => {
  const [stripeEnabled, setStripeEnabled] = useState(false);
  const [paypalEnabled, setPaypalEnabled] = useState(false);

  const handleSave = () => {
    toast.success("Payment settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payment Settings</h1>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Stripe Integration</h3>
              <p className="text-sm text-gray-500">Accept payments via Stripe</p>
            </div>
            <Switch
              checked={stripeEnabled}
              onCheckedChange={setStripeEnabled}
            />
          </div>

          {stripeEnabled && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="stripe-public">Stripe Public Key</Label>
                <Input
                  id="stripe-public"
                  placeholder="pk_test_..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
                <Input
                  id="stripe-secret"
                  type="password"
                  placeholder="sk_test_..."
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">PayPal Integration</h3>
              <p className="text-sm text-gray-500">Accept payments via PayPal</p>
            </div>
            <Switch
              checked={paypalEnabled}
              onCheckedChange={setPaypalEnabled}
            />
          </div>

          {paypalEnabled && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <Label htmlFor="paypal-client">PayPal Client ID</Label>
                <Input
                  id="paypal-client"
                  placeholder="Client ID..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paypal-secret">PayPal Secret</Label>
                <Input
                  id="paypal-secret"
                  type="password"
                  placeholder="Secret key..."
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Settings
      </Button>
    </div>
  );
};

export default PaymentSettings;