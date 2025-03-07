import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ApiTrilhas, ApiAgendamentos } from '../../axios-config/index';
import CardInscritos from '../../components/CardInscritos';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function Inscritos() {
    const { id } = useParams();
    const [trail, setTrail] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        ApiAgendamentos.get(`/api/bookings/`)
            .then(response => {
                const filteredBookings = response.data.filter(booking => booking.trail_id === Number(id));
                setBookings(filteredBookings);
            })
            .catch(error => console.log("Erro ao buscar agendamentos:", error));
    }, [id]);

    useEffect(() => {
        ApiTrilhas.get(`/api/trails/${id}`)
            .then(response => setTrail(response.data))
            .catch(error => console.error("Erro ao buscar trilha:", error))
            .finally(() => setLoading(false));
    }, [id]);

    // Atualiza a lista localmente após mudar o status
    const handleUpdateBooking = (bookingId, newStatus) => {
        setBookings(prev =>
            prev.map(booking =>
                booking.id === bookingId ? { ...booking, status: newStatus } : booking
            )
        );
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <Header title={`${trail?.name}`} path={`/guia/detalhestrilha/${trail?.id}`} />
            <main className="my-25 flex flex-col items-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Inscritos</h1>
                <div className="space-y-4">
                    {bookings.length > 0 ? (
                        bookings.map(booking => (
                            <CardInscritos key={booking.id} booking={booking} onUpdate={handleUpdateBooking} />
                        ))
                    ) : (
                        <p>Nenhum inscrito encontrado.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Inscritos;
