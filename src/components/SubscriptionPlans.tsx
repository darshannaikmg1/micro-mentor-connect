
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionPlansProps {
  onSubscribe?: (planName: string) => void;
  selectedPlan?: string | null;
}

const SubscriptionPlans = ({ onSubscribe, selectedPlan }: SubscriptionPlansProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      name: "Free",
      price: 0,
      description: "Basic access to the platform",
      features: [
        "Access to public mentor profiles",
        "Community forum access",
        "1 mentoring session per month",
        "Basic resources library",
      ],
      limitations: [
        "Limited mentor selection",
        "No group sessions",
        "No premium content access",
      ],
      popular: false,
    },
    {
      name: "Silver",
      price: 29,
      description: "Great for occasional guidance",
      features: [
        "Everything in Free",
        "3 mentoring sessions per month",
        "Message mentors directly",
        "Access to recorded sessions",
        "Priority support",
      ],
      limitations: [],
      popular: true,
    },
    {
      name: "Gold",
      price: 79,
      description: "Ideal for active learners",
      features: [
        "Everything in Silver",
        "10 mentoring sessions per month",
        "Access to all premium content",
        "Group session participation",
        "Personalized growth plan",
        "Progress tracking",
      ],
      limitations: [],
      popular: false,
    },
  ];

  const handleGetStarted = (planName: string, price: number) => {
    if (onSubscribe) {
      onSubscribe(planName);
      return;
    }
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to subscribe to a plan",
      });
      navigate("/login?redirect=/pricing");
      return;
    }
    
    // In a real implementation, this would navigate to a payment page
    toast({
      title: "Subscription",
      description: `You've selected the ${planName} plan. In a real implementation, this would open a payment page.`,
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl overflow-hidden transition-all duration-300 ${
                selectedPlan === plan.name
                  ? "ring-2 ring-primary shadow-xl transform scale-105"
                  : "border shadow-sm hover:shadow-md"
              } ${plan.popular ? "relative" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-primary text-white text-xs font-semibold px-4 py-1 rounded-bl-xl">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <Button
                  className={`w-full mb-6 ${
                    selectedPlan === plan.name ? "bg-primary" : ""
                  }`}
                  onClick={() => handleGetStarted(plan.name, plan.price)}
                >
                  {plan.price === 0 ? "Get Started" : "Subscribe"}
                </Button>

                <div className="space-y-3">
                  <p className="font-medium">What's included:</p>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="ml-3 text-gray-600 text-sm">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations.length > 0 && (
                    <>
                      <p className="font-medium mt-4">Limitations:</p>
                      <ul className="space-y-1">
                        {plan.limitations.map((limitation, index) => (
                          <li key={index} className="text-sm text-gray-500 flex items-center">
                            <span className="mr-2">•</span>
                            {limitation}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
