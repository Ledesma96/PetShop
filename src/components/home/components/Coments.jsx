import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FormComments from "./FormComments";
import { UserContext } from "../../../context/UserContext.jsx";

const Coments = () => {
    const [user] = useContext(UserContext)
    const [modal, setModal] = useState(false)
    const [comments, setComments] = useState([])
   
    useEffect(() => {
        const fetchData = async() => {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + 'api/comments')
            console.log(response)
             try {
                 if(response.data.success){
                    setComments(response.data.comments)
                 } else {
                     console.log(response.data.message);
                 }
             } catch (error) {
                 console.log(error.message);
             }
        }
        fetchData();
    }, [])

    useEffect(() => {
        adjustAnimation();
      }, [comments]);
    
      const adjustAnimation = () => {
        const commentsContainer = document.querySelector('.carrousel');
        if (!commentsContainer) {
          return;
        }
    
        const commentWidth = 300;
        const totalWidth = commentWidth * numberOfComments();
    
        commentsContainer.style.width = `${totalWidth}px`;
    
        // Añade la variable CSS para el número de comentarios
        document.documentElement.style.setProperty('--comment-count', numberOfComments());
    
        // Calcula la duración de la animación en base al ancho del contenedor
        const animationDuration = totalWidth / 40; // Ajusta el factor divisor según tus necesidades
    
        // Aplica la animación
         commentsContainer.style.animation = `scrollComments ${animationDuration}s linear infinite`;
      };
    
      const numberOfComments = () => {
        console.log(comments.length);
        return comments.length;
      };

    
    
    
      
    
      
  return (
    <div className="container_comments">
        <h1 className="container_comments_h1">NUESTROS CLIENTES</h1>
        <div className="comments-container">
            <div className="carrousel">
                {comments.map(comment => (
                    <div key={comment._id} className="coments">
                        <div className="coments__coment">
                            <img
                            className="coments__coment__img"
                            src={comment.image}
                            alt=""
                            />
                            <div className="coments__coment__div">
                                <p className="coments__coment__div__p">
                                {comment.comment}
                                </p>
                                <section className="coments__coment__div__section">
                                    <h5 className="comments__coment__div__section__h5">{comment.name}</h5>
                                    <h6 className="comments__coment__div__section__h6">/ {comment.profession}</h6>
                                </section>
                            </div>
                        </div> 
                    </div>
                ))}
            </div>
        </div>
        {user?.rol == 'user' && <button className="btn-comment" onClick={() => setModal(true)}>Añadir un comentario</button>}
        {modal && <FormComments setModal={setModal}></FormComments>}
        </div>
  );
};

export default Coments;
