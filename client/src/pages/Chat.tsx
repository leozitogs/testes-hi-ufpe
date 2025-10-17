import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Send, Loader2, Bot, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

export default function Chat() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [mensagem, setMensagem] = useState("");
  const [conversaAtual, setConversaAtual] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: conversaData } = trpc.chat.getConversa.useQuery(
    { id: conversaAtual! },
    { enabled: !!conversaAtual }
  );

  const enviarMutation = trpc.chat.enviarMensagem.useMutation({
    onSuccess: (data) => {
      setConversaAtual(data.conversaId);
      setMensagem("");
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversaData?.mensagens]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6">
          <Button asChild><a href={getLoginUrl()}>Login</a></Button>
        </Card>
      </div>
    );
  }

  const handleEnviar = async () => {
    if (!mensagem.trim()) return;
    await enviarMutation.mutateAsync({
      conversaId: conversaAtual || undefined,
      mensagem: mensagem.trim()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => setLocation("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />Voltar
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold">Hi Assistant</span>
          </div>
        </div>
      </header>
      <div className="container max-w-4xl py-6 h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {!conversaData ? (
            <div className="h-full flex items-center justify-center">
              <Card className="p-8 text-center max-w-md">
                <Bot className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Olá! Sou o Hi Assistant 👋</h3>
                <p className="text-muted-foreground">Digite uma mensagem para começar!</p>
              </Card>
            </div>
          ) : (
            conversaData.mensagens.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && <Bot className="h-8 w-8 text-primary" />}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.conteudo}</p>
                </div>
                {msg.role === 'user' && <User className="h-8 w-8 text-primary" />}
              </div>
            ))
          )}
          {enviarMutation.isPending && (
            <div className="flex gap-3"><Bot className="h-8 w-8 text-primary" /><div className="bg-muted rounded-2xl px-4 py-3"><Loader2 className="h-4 w-4 animate-spin" /></div></div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <Card className="p-4">
          <div className="flex gap-2">
            <Input placeholder="Digite sua mensagem..." value={mensagem} onChange={(e) => setMensagem(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleEnviar()} disabled={enviarMutation.isPending} />
            <Button onClick={handleEnviar} disabled={!mensagem.trim() || enviarMutation.isPending} size="icon">
              {enviarMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
