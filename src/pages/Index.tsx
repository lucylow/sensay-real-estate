import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-hero opacity-20 animate-pulse"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '6s'}}></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-bounce" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
      
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Hero section */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
              Welcome to the Future
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
              Experience something extraordinary. Built with cutting-edge technology and beautiful design.
            </p>
            
            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-400">
              <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Learn More
              </Button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-600">
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-foreground rounded-sm"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Fast & Modern</h3>
              <p className="text-muted-foreground">Built with the latest technologies for optimal performance and user experience.</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-foreground rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Beautiful Design</h3>
              <p className="text-muted-foreground">Carefully crafted with attention to detail and stunning visual aesthetics.</p>
            </Card>
            
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all hover:shadow-glow">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary-foreground rounded-lg transform rotate-45"></div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Fully Responsive</h3>
              <p className="text-muted-foreground">Perfectly optimized for all devices, from mobile phones to desktop computers.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;