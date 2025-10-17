import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: MessageSquare,
      title: "Chatbot Inteligente",
      description: "Tire dúvidas sobre horários, notas e informações acadêmicas com IA"
    },
    {
      icon: Calendar,
      title: "Horários Organizados",
      description: "Visualize sua grade horária de forma clara e responsiva"
    },
    {
      icon: TrendingUp,
      title: "Acompanhamento de Notas",
      description: "Monitore seu desempenho acadêmico em tempo real"
    },
    {
      icon: Zap,
      title: "Comunicados Instantâneos",
      description: "Receba avisos importantes da universidade imediatamente"
    },
    {
      icon: Users,
      title: "Interface Moderna",
      description: "Design responsivo e intuitivo, diferente do SIGAA tradicional"
    },
    {
      icon: BookOpen,
      title: "Informações Centralizadas",
      description: "Tudo que você precisa em um só lugar, fácil de encontrar"
    }
  ];

  const benefits = [
    "Interface responsiva e moderna",
    "Acesso rápido às informações",
    "Chatbot com inteligência artificial",
    "Notificações em tempo real",
    "Design otimizado para mobile",
    "Experiência superior ao SIGAA"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">Hi</span>
            </div>
            <span className="font-bold text-xl">UFPE</span>
          </div>
          <Button onClick={() => setLocation("/dashboard")}>
            Entrar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                🎓 Hub Inteligente UFPE
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Sua vida acadêmica{" "}
              <span className="text-primary">simplificada</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              Acesse horários, notas e comunicados com uma interface moderna e intuitiva. 
              Converse com nosso chatbot inteligente e tenha todas as informações na palma da mão.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg" onClick={() => setLocation("/dashboard")}>
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg" onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Saiba Mais
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Alunos ativos</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Disciplinas</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Disponível</div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-in-right">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <Card className="relative border-2">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">Chatbot IA</div>
                    <div className="text-sm text-muted-foreground">Online agora</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-primary/5 rounded-lg p-4">
                    <p className="text-sm">Quais são meus horários de hoje?</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm">Você tem 3 aulas hoje: Cálculo às 8h, Programação às 10h e Física às 14h 📚</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-20 bg-muted/30">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">Recursos Principais</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tudo que você precisa para gerenciar sua vida acadêmica de forma eficiente
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="card-hover border-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Por que escolher o <span className="text-primary">Hi UFPE</span>?
            </h2>
            <p className="text-lg text-muted-foreground">
              Desenvolvido pensando na experiência do estudante, com foco em usabilidade, 
              velocidade e acessibilidade. Diga adeus às dificuldades do SIGAA tradicional.
            </p>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Button size="lg" className="mt-4" onClick={() => setLocation("/dashboard")}>
              Experimentar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 space-y-2">
              <div className="text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Satisfação dos usuários</div>
            </Card>
            <Card className="p-6 space-y-2">
              <div className="text-4xl font-bold text-primary">5x</div>
              <div className="text-sm text-muted-foreground">Mais rápido que SIGAA</div>
            </Card>
            <Card className="p-6 space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Responsivo</div>
            </Card>
            <Card className="p-6 space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Suporte IA</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="bg-gradient-to-r from-primary to-primary/80 border-0 text-primary-foreground">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para transformar sua experiência acadêmica?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Junte-se a centenas de estudantes que já estão usando o Hi UFPE
            </p>
            <Button size="lg" variant="secondary" className="text-lg" onClick={() => setLocation("/dashboard")}>
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">Hi</span>
                </div>
                <span className="font-bold text-lg">UFPE</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Hub Inteligente para estudantes da UFPE
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Chatbot IA</li>
                <li>Horários</li>
                <li>Notas</li>
                <li>Comunicados</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>FAQ</li>
                <li>Documentação</li>
                <li>Contato</li>
                <li>Status</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Termos de Uso</li>
                <li>Privacidade</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Hi UFPE. Desenvolvido com ❤️ para estudantes da UFPE.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
