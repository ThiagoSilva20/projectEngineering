import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender sua empresa e desenvolver o melhor projeto para suas necessidades. Entre em
            contato conosco.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">Envie uma Mensagem</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Nome
                  </label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Telefone
                </label>
                <Input id="phone" placeholder="(00) 00000-0000" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Assunto
                </label>
                <Input id="subject" placeholder="Assunto da mensagem" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <Textarea id="message" placeholder="Descreva seu projeto ou dúvida..." className="min-h-[120px]" />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensagem
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-primary text-white rounded-lg shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Endereço</p>
                    <p>Av. Paulista, 1000, Bela Vista</p>
                    <p>São Paulo - SP, 01310-100</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Telefone</p>
                    <p>+55 (11) 3000-0000</p>
                    <p>+55 (11) 99000-0000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Email</p>
                    <p>contato@facadeengenharia.com.br</p>
                    <p>comercial@facadeengenharia.com.br</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Horário de Atendimento</p>
                    <p>Segunda a Sexta: 8h às 18h</p>
                    <p>Sábados: 9h às 13h</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">Atendimento Rápido</h3>
              <p className="text-gray-600 mb-4">
                Precisa de um atendimento mais rápido? Entre em contato pelo WhatsApp ou ligue diretamente para nossa
                central de atendimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" /> Ligar Agora
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">WhatsApp</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

