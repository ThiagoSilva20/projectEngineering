"use client"


export default function AdminDashboard() {
  return (
    <main className="bg-background">
        <div className="flex h-full flex-col">
          <main className="flex-1 p-6">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border bg-card p-8 shadow-sm flex flex-col justify-center items-center">
                <h2 className="text-3xl font-bold tracking-tight">Bem-vindo ao Painel Admin</h2>
                <p className="mt-4 text-muted-foreground">
                Este é o seu painel de controle. Aqui você poderá adicionar projetos e remover projetos.
                </p>

              </div>
            </div>
          </main>
        </div>
      </main>

  )
}

