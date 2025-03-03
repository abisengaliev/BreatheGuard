import Link from "next/link"
import {
  MapPin,
  Wind,
  Bell,
  BarChart3,
  ArrowRight,
  ChevronRight,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Github,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import AirQualityMap from "@/components/air-quality-map"
import BeforeAfterSlider from "@/components/before-after-slider"
import FeatureCard from "@/components/feature-card"
import HeroBackground from "@/components/hero-background"
import HowItWorks from "@/components/how-it-works"
import TestimonialCard from "@/components/testimonial-card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              AI-Powered Air Quality Forecasting
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
              Breathe Smarter. Live Healthier.
            </h1>
            <p className="max-w-[700px] text-lg text-white/90 md:text-xl drop-shadow-md">
              AI-powered air quality forecasts for you and your city.
            </p>
            <Button size="lg" className="mt-6 rounded-full">
              Get Real-Time Air Data <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ChevronRight className="h-8 w-8 text-white rotate-90" />
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-white" id="problem">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Why It Matters?
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                The Air We Breathe is Changing
              </h2>
              <p className="text-muted-foreground md:text-lg">
                Air pollution affects over 90% of the world's population, causing 7 million premature deaths annually.
                In cities like Almaty, air quality can deteriorate rapidly due to geographical factors, traffic
                congestion, and industrial activities, especially during winter months when temperature inversions trap
                pollutants.
              </p>
              <p className="text-muted-foreground md:text-lg">
                Without accurate forecasting, citizens are left unaware of dangerous pollution levels, leading to
                increased respiratory issues and long-term health problems.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <BeforeAfterSlider />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50" id="solution">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Solution</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-4">
              AI-Powered Air Quality Insights
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
              BreatheGuard uses advanced machine learning models to predict air quality with unprecedented accuracy. By
              analyzing data from multiple sources, our AI provides actionable insights for individuals and
              policymakers.
            </p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Why Choose BreatheGuard?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-4">Key Features</h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
              Our platform offers comprehensive tools to monitor, predict, and respond to air quality challenges.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-10">
            <FeatureCard
              icon={<MapPin className="h-10 w-10" />}
              title="Hyper-local Air Quality Reports"
              description="Get precise air quality data for your exact location, not just city-wide averages."
            />
            <FeatureCard
              icon={<Bell className="h-10 w-10" />}
              title="Personalized Health Alerts"
              description="Receive customized notifications based on your health profile and sensitivity to pollutants."
            />
            <FeatureCard
              icon={<Wind className="h-10 w-10" />}
              title="AI-Driven Eco-Advisory"
              description="Get personalized recommendations to reduce your exposure and environmental impact."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10" />}
              title="Smart Government Dashboard"
              description="Powerful analytics tools for policymakers to implement effective pollution control measures."
            />
          </div>
        </div>
      </section>

      {/* Live Air Quality Map */}
      <section className="py-20 bg-slate-900 text-white" id="map">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="inline-block rounded-lg bg-primary/20 px-3 py-1 text-sm text-primary-foreground">
              Real-Time Data
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-4">Live Air Quality Map</h2>
            <p className="mt-4 text-slate-300 md:text-lg max-w-3xl mx-auto">
              Explore current air quality conditions across different neighborhoods in real-time.
            </p>
          </div>
          <div className="h-[500px] rounded-xl overflow-hidden shadow-2xl">
            <AirQualityMap />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white" id="testimonials">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Success Stories</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mt-4">User Testimonials</h2>
            <p className="mt-4 text-muted-foreground md:text-lg max-w-3xl mx-auto">
              See how BreatheGuard is making a difference in people's lives.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              quote="BreatheGuard has helped me plan my outdoor activities and avoid high-pollution areas!"
              author="Sarah Johnson"
              role="Marathon Runner"
              avatar="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="As someone with asthma, this app has been a lifesaver. I can now take preventive measures before air quality worsens."
              author="Michael Chen"
              role="Teacher"
              avatar="/placeholder.svg?height=80&width=80"
            />
            <TestimonialCard
              quote="The city dashboard has transformed how we implement pollution control measures. We can now target resources where they're needed most."
              author="Dr. Elena Petrova"
              role="Environmental Officer"
              avatar="/placeholder.svg?height=80&width=80"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground" id="join">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Join the Movement!</h2>
              <p className="md:text-lg opacity-90">
                Be among the first to access BreatheGuard's powerful air quality forecasting tools. Sign up now to
                receive updates and early access to our platform.
              </p>
            </div>
            <Card className="bg-white/10 backdrop-blur border-none">
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="bg-white/20 border-white/30 placeholder:text-white/70 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="bg-white/20 border-white/30 placeholder:text-white/70 text-white"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full bg-white text-primary hover:bg-white/90">
                    Start Tracking Air Quality
                  </Button>
                  <p className="text-xs text-center opacity-70">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 text-slate-300">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">BreatheGuard</h3>
              <p className="text-sm">AI-Powered Air Quality Forecasting for Healthier Cities</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#problem" className="hover:text-white transition-colors">
                    Why It Matters
                  </Link>
                </li>
                <li>
                  <Link href="#solution" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#map" className="hover:text-white transition-colors">
                    Live Map
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Research
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
              <p className="mt-4 text-sm">
                Contact us:{" "}
                <Link href="mailto:info@breatheguard.com" className="hover:text-white transition-colors">
                  info@breatheguard.com
                </Link>
              </p>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-800 text-center text-sm">
            <p>© {new Date().getFullYear()} BreatheGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

