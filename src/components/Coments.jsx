import React from "react";

const Coments = () => {
  return (
    <div className="coments">
        <div className="coments__coment">
            <img
            className="coments__coment__img"
            src="https://source.unsplash.com/160x160/?portrait"
            alt=""
            />
            <div className="coments__coment__div">
                <p className="coments__coment__div__p">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Perferendis, unde! Sequi neque nam
                </p>
                <section className="coments__coment__div__section">
                    <h5 className="comments__coment__div__section__h5">Nombre</h5>
                    <h6 className="comments__coment__div__section__h6">/ Profecion</h6>
                </section>
            </div>
        </div>
    </div>
  );
};

export default Coments;
