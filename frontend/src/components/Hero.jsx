import React from 'react';

export default function Hero() {
  return (
    <section className="hero-apple">
      <div className="hero-inner container">
        <div className="hero-text">
          <h1>Simples. Poderoso. Seu financeiro.</h1>
          <p className="lead">
            Ferramenta leve para controlar contas e lançamentos com segurança e design limpo.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary-lg">Começar</button>
            <button className="btn-ghost">Saiba mais</button>
          </div>
        </div>

        <div className="hero-image" aria-hidden>
          {/* coloque a imagem do produto aqui */}
          <div className="device-mock">
            <div className="screen">
              <svg width="200" height="380" viewBox="0 0 200 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="188" height="368" rx="18" fill="#fff" stroke="#e6e6e6"/>
                <rect x="22" y="40" width="156" height="300" rx="12" fill="#f7f9fb"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
