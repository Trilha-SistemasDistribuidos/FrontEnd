import React, { useEffect, useState } from 'react';
import { ApiAgendamentos } from '../axios-config/index';
import userImg from '../assets/Imagem perfil.jpg';

function CardInscritos({ booking, onUpdate }) {
    const [status, setStatus] = useState(booking.status);
    const user = booking.user_details; // Usando os dados do usuário do booking diretamente
    const tipoUserLogado = JSON.parse(localStorage.getItem("user")).tipo
    // Função para alterar o status
    const handleChangeStatus = async (event) => {
        const newStatus = event.target.value;
        setStatus(newStatus);

        try {
            await ApiAgendamentos.patch(`/api/bookings/${booking.id}/`, { status: newStatus });
            onUpdate(booking.id, newStatus); // Atualiza a lista localmente
        } catch (error) {
            console.error("Erro ao atualizar status:", error);
        }
    };

    // Função para determinar a cor de fundo e a cor do texto com base no status
    const getStatusStyles = (status) => {
        switch (status) {
            case 'pending':
                return { backgroundColor: 'bg-yellow-100', textColor: 'text-yellow-900' }; // Amarelo para Pendente
            case 'confirmed':
                return { backgroundColor: 'bg-green-100', textColor: 'text-green-900' }; // Verde para Aceito
            case 'canceled':
                return { backgroundColor: 'bg-red-100', textColor: 'text-red-900' }; // Vermelho para Cancelado
            default:
                return { backgroundColor: 'bg-gray-100', textColor: 'text-gray-900' }; // Cor padrão
        }
    };

    const { backgroundColor, textColor } = getStatusStyles(status);

    return (
        <div className="flex items-center p-6 border rounded-lg shadow-md bg-white">
            {/* Foto do Usuário e Dados (50% do Card) */}
            <div className="flex flex-col items-center w-1/2">
                <img 
                    src={userImg}
                    alt={user?.nome}
                    className="w-20 h-20 rounded-full object-cover mr-4"
                />
                <div className='flex flex-col items-center'>
                    <h2 className="text-md font-semibold">{user?.nome || "Nome não disponível"}</h2>
                    <p className="text-sm">{user?.email || "Email não disponível"}</p>
                </div>
            </div>

            {/* Seletor de Status (50% do Card) */}
            <div className="w-1/2">
                {tipoUserLogado === 'Guia' ? (
                    <select
                        value={status}
                        onChange={handleChangeStatus}
                        className="border p-2 rounded-md w-full text-sm"
                    >
                        <option value="pending">Pendente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="canceled">Cancelado</option>
                    </select>
                ) : (
                    <p className={`text-sm ${textColor} ${backgroundColor} p-2 rounded-md`}>
                        {status}
                    </p> // Exibe o status com a cor correspondente
                )}
            </div>
        </div>
    );
}

export default CardInscritos;
