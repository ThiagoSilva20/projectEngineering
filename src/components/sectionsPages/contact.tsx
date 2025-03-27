"use client";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contato" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Estamos prontos para atender sua empresa e desenvolver o melhor
            projeto para suas necessidades. Entre em contato conosco.
          </p>
        </div>

        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Informações de Contato</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-6 w-6 mr-4 mt-1 text-green-400" />
                <div>
                  <p className="font-medium mb-1">Endereço</p>
                  <p>Rua Sem Fim, S/N</p>
                  <p>CEP 99999-999</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-6 w-6 mr-4 mt-1 text-green-400" />
                <div>
                  <p className="font-medium mb-1">Telefone</p>
                  <p>+55 21 9999-9999</p>
                  <p>+ 55 21 99999-9999</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-6 w-6 mr-4 mt-1 text-green-400" />
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p>engenharia@teste.br</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="h-6 w-6 mr-4 mt-1 text-green-400" />
                <div>
                  <p className="font-medium mb-1">Horário de Atendimento</p>
                  <p>Segunda a Sexta: 8h às 18h</p>
                  <p>Sábados: 9h às 13h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Atendimento Rápido
            </h3>
            <p className="text-gray-700 mb-4">
              Precisa de um atendimento mais rápido? Entre em contato pelo
              WhatsApp ou ligue diretamente para nossa central de atendimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="flex-1 border-gray-800 text-gray-800 hover:bg-gray-50"
                onClick={() => (window.location.href = "tel:+5521981799852")}
              >
                <Phone className="mr-2 h-4 w-4" /> Ligar Agora
              </Button>
              <Button
                onClick={() =>
                  window.open("https://wa.me/5521993392724", "_blank")
                }
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
