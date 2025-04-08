
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
      gradient: "from-blue-50 to-blue-100",
      hoverGradient: "hover:from-blue-100 hover:to-blue-200",
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
      gradient: "from-gray-50 to-gray-100",
      hoverGradient: "hover:from-gray-100 hover:to-gray-200",
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
      gradient: "from-amber-50 to-amber-200",
      hoverGradient: "hover:from-amber-100 hover:to-amber-300",
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
      gradient: "from-purple-50 to-purple-100",
      hoverGradient: "hover:from-purple-100 hover:to-purple-200",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Growth Path</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to accelerate your career with personalized mentorship
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 bg-gradient-to-br ${plan.gradient} ${plan.hoverGradient} ${
                plan.highlighted 
                  ? "border-primary ring-2 ring-primary ring-opacity-50 shadow-lg scale-105" 
                  : "border-transparent"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-center">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <div className="mt-4 flex items-center justify-center">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                </CardTitle>
                <p className="text-sm text-center text-gray-600 mt-4 px-4">
                  {plan.description}
                </p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4 pb-8">
                <Button 
                  className={`w-full shadow-md transition-all ${
                    plan.highlighted 
                      ? "bg-primary hover:bg-primary/90 shadow-button" 
                      : "bg-primary/90 hover:bg-primary"
                  }`}
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
