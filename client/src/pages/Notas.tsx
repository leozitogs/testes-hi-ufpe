import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useLocation } from "wouter";

export default function Notas() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { data: matriculas } = trpc.matriculas.minhas.useQuery({ periodo: "2025.1" }, { enabled: isAuthenticated });

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center"><Card className="p-6"><Button asChild><a href={getLoginUrl()}>Login</a></Button></Card></div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/dashboard")}><ArrowLeft className="h-4 w-4 mr-2" />Voltar</Button>
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Minhas Notas</span>
        </div>
      </header>
      <div className="container py-8 space-y-6">
        <div className="grid gap-4">
          {matriculas && matriculas.length > 0 ? (
            matriculas.map((item) => (
              <Card key={item.matricula.id} className="card-hover">
                <CardHeader>
                  <CardTitle>{item.disciplina.nome}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.disciplina.codigo}</p>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div><p className="text-sm text-muted-foreground">Nota 1</p><p className="text-2xl font-bold">{item.matricula.nota1 ?? '-'}</p></div>
                    <div><p className="text-sm text-muted-foreground">Nota 2</p><p className="text-2xl font-bold">{item.matricula.nota2 ?? '-'}</p></div>
                    <div><p className="text-sm text-muted-foreground">Nota 3</p><p className="text-2xl font-bold">{item.matricula.nota3 ?? '-'}</p></div>
                    <div><p className="text-sm text-muted-foreground">Final</p><p className="text-2xl font-bold">{item.matricula.notaFinal ?? '-'}</p></div>
                  </div>
                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <span className="text-sm text-muted-foreground">Frequência: {item.matricula.frequencia ?? 0}%</span>
                    <span className={`text-sm font-medium capitalize ${item.matricula.status === 'aprovado' ? 'text-green-600' : item.matricula.status === 'reprovado' ? 'text-red-600' : 'text-blue-600'}`}>{item.matricula.status}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center text-muted-foreground">Nenhuma disciplina encontrada</Card>
          )}
        </div>
      </div>
    </div>
  );
}
