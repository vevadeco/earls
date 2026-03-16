import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Star, Shield, Clock } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';
const API = `${BACKEND_URL}/api`;

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service_type: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const services = [
    { value: "lawn-care", label: "Lawn Care & Maintenance" },
    { value: "garden-planting", label: "Garden Planting" },
    { value: "hardscaping", label: "Hardscaping (Patios, Walkways)" },
    { value: "full-service", label: "Full Landscaping Service" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.service_type) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    console.log("Submitting to:", `${API}/leads`);
    console.log("Data:", formData);
    
    try {
      const response = await axios.post(`${API}/leads`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log("Response:", response.data);
      
      if (response.data.success) {
        setIsSubmitted(true);
        toast.success(response.data.message || "Thank you! We'll contact you soon.");
        setFormData({ name: "", email: "", phone: "", service_type: "" });
      } else {
        toast.error(response.data.message || "Failed to submit");
      }
    } catch (error) {
      console.error("Full error:", error);
      console.error("Response data:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const trustBadges = [
    { icon: Star, text: "4.8 Star Rating" },
    { icon: Shield, text: "Fully Insured" },
    { icon: Clock, text: "Same Week Service" },
  ];

  // Return the JSX as in original file (truncated for brevity)
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20" data-testid="hero-section">
      <h1>Earl's Landscaping - Coming Soon</h1>
      {isSubmitted ? (
        <div className="text-center p-8">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-white/80">We'll contact you within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-white">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/90"
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white/90"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-white">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white/90"
              placeholder="(905) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="service_type" className="text-white">Service Type</Label>
            <Select
              value={formData.service_type}
              onValueChange={(value) => setFormData({ ...formData, service_type: value })}
            >
              <SelectTrigger className="bg-white/90">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    {service.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Get Free Quote"}
          </Button>
        </form>
      )}
    </section>
  );
};

export default HeroSection;
