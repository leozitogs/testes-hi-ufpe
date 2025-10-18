import React, { useState, useRef, useEffect } from "react";
import { trpc } from "../lib/trpc";
import { useAuth } from "../_core/hooks/useAuth"; // named export

const Chat: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const utils = trpc.useContext();

  const [conversaAtual, setConversaAtual] = useState<string | null>(null);
  const [texto, setTexto] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { data: conversaData, isFetching: loadingConversa } = trpc.chat.getConversa.useQuery(
    { id: conversaAtual ?? "" },
    { enabled: !!conversaAtual }
  );

  const enviarMutation = trpc.chat.enviarMensagem.useMutation({
    onSuccess: (data) => {
      if (data?.conversaId) {
        setConversaAtual(data.conversaId);
        utils.chat.getConversa.invalidate({ id: data.conversaId }).catch(() => {});
      }
      setTexto("");
      inputRef.current?.focus();
    },
    onError: (err) => {
      console.error("Erro ao enviar mensagem:", err);
    },
  });

  // isSending: checa o status oficial ('pending') + fallbacks via any (um único cast)
  const isSending =
    enviarMutation.status === "pending" ||
    Boolean((enviarMutation as any).isLoading) ||
    Boolean((enviarMutation as any).isMutating);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!texto.trim()) return;

    enviarMutation.mutate({
      conversaId: conversaAtual ?? undefined,
      mensagem: texto.trim(),
    });
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversaData?.mensagens?.length]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Chat — Hi (Assistente)</h1>

      <div className="border rounded-lg p-4 h-[60vh] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-3">
          {loadingConversa && <div className="text-sm text-gray-500">Carregando conversa...</div>}

          {conversaData?.mensagens?.length ? (
            conversaData.mensagens.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <div className="text-sm whitespace-pre-wrap">{msg.conteudo}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {msg.role === "system" ? "sistema" : msg.role}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">Nenhuma mensagem ainda. Comece a conversar!</div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={isAuthenticated ? "Escreva sua mensagem..." : "Faça login para usar o chat"}
            disabled={!isAuthenticated || isSending}
            className="flex-1 border rounded px-3 py-2 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!isAuthenticated || isSending}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            {isSending ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
