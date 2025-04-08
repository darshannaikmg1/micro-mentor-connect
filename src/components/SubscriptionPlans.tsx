
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const SubscriptionPlans = () => {
  const plans = [
    {
      name: "Free",
      price: 0,
      period: "forever",
      description: "Access limited free mentorship videos",
      features: [
        "Browse mentor profiles",
        "Watch 5 free mentorship videos",
        "Community forum access",
        "Email support",
      ],
      highlighted: false,
      buttonText: "Get Started",
    },
    {
      name: "Silver",
      price: 9.99,
      period: "month",
      description: "Access all mentorship videos + 2 mentor sessions/month (recorded)",
      features: [
        "All Free features",
        "Unlimited mentorship videos",
        "2 recorded mentor sessions/month",
        "Resource downloads",
        "Priority email support",
      ],
      highlighted: false,
      buttonText: "Subscribe",
    },
    {
      name: "Gold",
      price: 19.99,
      period: "month",
      description: "All Silver features + 2 live mentor sessions/month",
      features: [
        "All Silver features",
        "2 live mentor sessions/month",
        "Mentor messaging",
        "Session notes & summaries",
        "24/7 support",
      ],
      highlighted: true,
      buttonText: "Subscribe",
    },
    {
      name: "Platinum",
      price: 39.99,
      period: "month",
      description: "All-access pass with premium benefits",
      features: [
        "All Gold features",
        "5 live sessions/month",
        "Unlimited recorded sessions",
        "Priority booking with top mentors",
        "1-on-1 career planning",
        "VIP support",
      ],
      highlighted: false,
      buttonText: "Subscribe",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Pricing Plans</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan to match your mentorship needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col ${
                plan.highlighted 
                  ? "border-primary ring-2 ring-primary ring-opacity-50 shadow-lg" 
                  : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="text-center">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">${plan.price}</span>
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  </div>
                </CardTitle>
                <p className="text-sm text-center text-gray-600 mt-2">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full ${!plan.highlighted ? "bg-primary" : "bg-primary"}`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
