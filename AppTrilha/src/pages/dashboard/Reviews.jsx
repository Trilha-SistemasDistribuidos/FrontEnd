import React, { useState, useEffect } from 'react';
import { ApiReview } from '../../axios-config/index';
import ReviewCard from '../../components/ReviewCard'; // Importando o componente de review
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
import imgUser from '../../assets/Imagem perfil.jpg'

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 1, comment: '' });
  const guideId = useParams()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await ApiReview.get(`/api/reviews/`);
        const filteredReviews = response.data.filter(review => review.user_id == guideId.id);
        console.log(guideId)
        setReviews(filteredReviews);
        console.log(response.data)
        console.log(filteredReviews)
        if (filteredReviews.length > 0) {
          setGuide(filteredReviews[0].user_details);
        }
      } catch (error) {
        setError('Erro ao buscar reviews');
        console.error('Erro ao buscar reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [guideId]);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitReview = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken"); // Pegando o token do localStorage (ou outro local)
      
      const response = await ApiReview.post(
        "/api/reviews/",
        {
          user_id: guideId.id,
          rating: Number(newReview.rating),
          comment: newReview.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Passando o token no header
          },
        }
      );
  
      setReviews([...reviews, response.data]);
      setIsModalOpen(false);
      setNewReview({ rating: 1, comment: "" });
    } catch (error) {
      console.error("Erro ao enviar review:", error);
    }
  };
  if (loading) return <p>Carregando...</p>;


  return (
    <div className="p-6">
      <Header title={`Reviews`} path="/home" />
      <main className='my-20'>
        {guide && (
          <div>
            <div className="flex items-center mt-6">
              <img
                src={imgUser}
                alt={guide.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{guide.nome}</h2>
                <p className="text-sm text-gray-500">{guide.email}</p>
              </div>
            </div>
          </div>
        )}
        
        <h2 className="text-xl font-medium mt-4">Reviews do Guia</h2>
        {reviews.length === 0 ? (
          <p className="mt-4 text-gray-500">Não há reviews disponíveis para este guia.</p>
        ) : (
          <div className="mt-6 space-y-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showDate />
            ))}
          </div>
        )}
        <button
          onClick={handleModalToggle}
          className="fixed bottom-30 right-8 bg-blue-500 text-white text-3xl w-16 h-16 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          +
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-xl font-semibold mb-4">Adicionar Nova Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="rating">Avaliação (1 a 5)</label>
                <select
                  id="rating"
                  name="rating"
                  value={newReview.rating}
                  onChange={handleReviewChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                >
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <option key={rating} value={rating}>{rating}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="comment">Comentário</label>
                <textarea
                  id="comment"
                  name="comment"
                  value={newReview.comment}
                  onChange={handleReviewChange}
                  className="w-full border border-gray-300 rounded-lg p-2"
                  rows="4"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button onClick={handleModalToggle} className="px-4 py-2 bg-gray-300 rounded-lg text-sm">Cancelar</button>
                <button onClick={handleSubmitReview} className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">Enviar</button>
              </div>
            </div>
          </div>
        )}
        
      </main>
      <Footer />
    </div>
  );
};

export default Reviews;
