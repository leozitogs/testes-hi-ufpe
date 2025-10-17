import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  Bell,
  TrendingUp,
  Clock,
  ArrowRight,
  LogOut,
  Home
} from "lucide-react";
import { useLocation } from "wouter";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const { data: comunicados } = trpc.comunicados.list.useQuery({ limit: 5 });
  const { data: matriculas } = trpc.matriculas.minhas.useQuery({ periodo: "2025.1" }, {
    enabled: isAuthenticated
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-primary/5">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Acesso Restrito</CardTitle>
            <CardDescription>Você precisa fazer login para acessar o dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <a href={getLoginUrl()}>Fazer Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const quickActions = [
    {
      icon: MessageSquare,
      title: "Chatbot",
      description: "Converse com a IA",
      href: "/chat",
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400"
    },
    {
      icon: Calendar,
      title: "Horários",
      description: "Ver grade horária",
      href: "/horarios",
      color: "bg-green-500/10 text-green-600 dark:text-green-400"
    },
    {
      icon: TrendingUp,
      title: "Notas",
      description: "Acompanhar desempenho",
      href: "/notas",
      color: "bg-purple-500/10 text-purple-600 dark:text-purple-400"
    },
    {
      icon: Bell,
      title: "Comunicados",
      description: "Ver avisos",
      href: "/comunicados",
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setLocation("/")}>
              <span className="text-primary-foreground font-bold text-lg">Hi</span>
            </div>
            <span className="font-bold text-xl">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setLocation("/")}>
              <Home className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Início</span>
            </Button>
            <span className="text-sm text-muted-foreground hidden md:block">
              Olá, {user?.name || "Estudante"}!
            </span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container py-8 space-y-8 animate-fade-in">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Bem-vindo de volta! 👋</h1>
          <p className="text-muted-foreground text-lg">
            Aqui está um resumo das suas atividades acadêmicas
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disciplinas</p>
                  <p className="text-3xl font-bold">{matriculas?.length || 0}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Período</p>
                  <p className="text-3xl font-bold">2025.1</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Comunicados</p>
                  <p className="text-3xl font-bold">{comunicados?.length || 0}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Próxima Aula</p>
                  <p className="text-3xl font-bold">08:00</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ações Rápidas</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="card-hover cursor-pointer group"
                onClick={() => setLocation(action.href)}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Comunicados Recentes</h2>
            <Button variant="ghost" size="sm" onClick={() => setLocation("/comunicados")}>
              Ver todos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {comunicados && comunicados.length > 0 ? (
              comunicados.slice(0, 3).map((comunicado) => (
                <Card key={comunicado.id} className="card-hover">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-lg">{comunicado.titulo}</CardTitle>
                        <CardDescription>
                          Por {comunicado.autor} • {new Date(comunicado.dataPublicacao!).toLocaleDateString('pt-BR', { 
                            day: '2-digit', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </CardDescription>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        comunicado.prioridade === 'alta' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        comunicado.prioridade === 'media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {comunicado.prioridade}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {comunicado.conteudo}
                    </p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum comunicado recente</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* My Courses */}
        {matriculas && matriculas.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Minhas Disciplinas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {matriculas.map((item) => (
                <Card key={item.matricula.id} className="card-hover">
                  <CardHeader>
                    <CardTitle className="text-base">{item.disciplina.nome}</CardTitle>
                    <CardDescription className="font-mono">{item.disciplina.codigo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`font-medium capitalize px-2 py-0.5 rounded ${
                          item.matricula.status === 'aprovado' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' :
                          item.matricula.status === 'reprovado' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                        }`}>
                          {item.matricula.status}
                        </span>
                      </div>
                      {item.matricula.notaFinal !== null && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Nota Final:</span>
                          <span className="font-bold">{item.matricula.notaFinal}/100</span>
                        </div>
                      )}
                      {item.matricula.frequencia !== null && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Frequência:</span>
                          <span className="font-medium">{item.matricula.frequencia}%</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

