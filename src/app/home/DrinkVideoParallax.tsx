"use client";

import { useEffect, useState } from "react";
import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import { Wine, Beer, Sparkles } from "lucide-react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export default function DrinkVideoParallax() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Set a small delay to ensure CSS is loaded
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <div className={`luxury-video-section ${isLoaded ? "loaded" : "loading"}`}>
      {/* Loading State */}
      {!isLoaded && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <Sparkles className="spinner-icon" size={32} />
          </div>
        </div>
      )}

      {/* YouTube Video Background */}
      <div className="video-background">
        <iframe
          src="https://www.youtube.com/embed/Tza4xFLph1Y?autoplay=1&mute=1&loop=1&playlist=Tza4xFLph1Y&controls=0&modestbranding=1&rel=0&playsinline=1"
          className={`youtube-iframe ${videoLoaded ? "loaded" : ""}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleVideoLoad}
        />
        <div className="video-overlay"></div>
      </div>

      {/* Content */}
      <div className={`video-content ${isLoaded ? "loaded" : ""}`}>
        <div className="content-wrapper">
          <div className="premium-badge">
            <div className="badge-line"></div>
            <Sparkles size={16} className="badge-icon" />
            <span className="badge-text">AWARD-WINNING BAR PROGRAM</span>
            <Sparkles size={16} className="badge-icon" />
            <div className="badge-line"></div>
          </div>

          <div className="title-group">
            <h1 className={`main-title ${playfair.className}`}>
              Artisanal Mixology
            </h1>
            <div className="title-underline">
              <div className="underline-gold"></div>
              <div className="underline-dot"></div>
              <div className="underline-gold"></div>
            </div>
          </div>

          <h2 className={`subtitle ${cormorant.className}`}>
            Crafted Elixirs & Premium Spirits
          </h2>

          <p className={`description ${cormorant.className}`}>
            Experience our world-class bar program featuring handcrafted
            cocktails, rare vintage wines, and an extensive collection of
            premium spirits curated by our master mixologists
          </p>

          <div className="drink-features">
            <div className="feature-item">
              <Wine className="feature-icon" size={24} />
              <span>Fine Wines</span>
            </div>
            <div className="feature-item">
              <Beer className="feature-icon" size={24} />
              <span>Craft Cocktails</span>
            </div>
            <div className="feature-item">
              <Sparkles className="feature-icon" size={24} />
              <span>Premium Spirits</span>
            </div>
          </div>

          <div className="cta-group">
            <button className="cta-btn primary">
              <span className="btn-text">Explore Drink Menu</span>
            </button>
            <button className="cta-btn secondary">
              <span className="btn-text">Wine Tasting Events</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .luxury-video-section {
          position: relative;
          min-height: 100vh;
          height: auto;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }

        .luxury-video-section.loaded {
          opacity: 1;
        }

        .luxury-video-section.loading {
          opacity: 0;
        }

        /* Loading Overlay */
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          transition: opacity 0.5s ease-in-out;
        }

        .luxury-video-section.loaded .loading-overlay {
          opacity: 0;
          pointer-events: none;
        }

        .loading-spinner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .spinner-icon {
          color: #dda629;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .youtube-iframe {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100vw;
          height: 100vh;
          min-height: 100%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .youtube-iframe.loaded {
          opacity: 1;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(0, 0, 0, 0.7) 100%
          );
          z-index: 2;
        }

        .video-content {
          position: relative;
          z-index: 3;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fefefe;
          padding: 1rem;
          min-height: 100vh;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.8s ease-in-out 0.3s;
        }

        .video-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .content-wrapper {
          max-width: 800px;
          width: 100%;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .premium-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .badge-text {
          color: #dda629;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 2px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .badge-icon {
          color: #dda629;
        }

        .badge-line {
          height: 1px;
          background: linear-gradient(90deg, #dda629, transparent);
          flex: 1;
          min-width: 30px;
          max-width: 40px;
        }

        .title-group {
          margin-bottom: 1rem;
          width: 100%;
        }

        .main-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #fefefe;
          margin: 0 0 0.8rem 0;
          line-height: 1.1;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .title-underline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .underline-gold {
          height: 2px;
          background: #dda629;
          width: 50px;
          border-radius: 1px;
        }

        .underline-dot {
          width: 4px;
          height: 4px;
          background: #dda629;
          border-radius: 50%;
        }

        .subtitle {
          font-size: 1.3rem;
          color: #dda629;
          margin: 0 0 1rem 0;
          font-weight: 600;
          line-height: 1.3;
          font-style: italic;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .description {
          font-size: 1rem;
          line-height: 1.5;
          color: rgba(254, 254, 254, 0.9);
          margin: 0 auto 1.5rem;
          font-weight: 300;
          max-width: 90%;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        /* Drink Features */
        .drink-features {
          display: flex;
          justify-content: center;
          gap: 0.8rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          width: 100%;
          max-width: 300px;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          padding: 0.8rem;
          background: rgba(221, 166, 41, 0.1);
          border: 1px solid rgba(221, 166, 41, 0.3);
          border-radius: 8px;
          transition: all 0.3s ease;
          min-width: 90px;
          flex: 1;
        }

        .feature-item:hover {
          background: rgba(221, 166, 41, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(221, 166, 41, 0.2);
        }

        .feature-icon {
          color: #dda629;
        }

        .feature-item span {
          color: #fefefe;
          font-size: 0.8rem;
          font-weight: 500;
          text-align: center;
        }

        .cta-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
          max-width: 300px;
        }

        .cta-btn {
          padding: 0.9rem 1.5rem;
          border: none;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
          width: 100%;
          max-width: 250px;
        }

        .cta-btn.primary {
          background: #dda629;
          color: #000000;
        }

        .cta-btn.primary:hover {
          background: #fefefe;
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(221, 166, 41, 0.4);
        }

        .cta-btn.secondary {
          background: transparent;
          color: #fefefe;
          border: 2px solid rgba(254, 254, 254, 0.4);
          border-radius: 6px;
        }

        .cta-btn.secondary:hover {
          border-color: #dda629;
          color: #dda629;
          transform: translateY(-2px);
          background: rgba(221, 166, 41, 0.1);
        }

        /* Tablet */
        @media (min-width: 768px) {
          .video-content {
            padding: 2rem;
          }

          .content-wrapper {
            padding: 3rem 2rem;
          }

          .main-title {
            font-size: 3.5rem;
          }

          .subtitle {
            font-size: 1.6rem;
          }

          .description {
            font-size: 1.1rem;
            max-width: 600px;
          }

          .premium-badge {
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .badge-text {
            font-size: 0.8rem;
            letter-spacing: 3px;
          }

          .badge-line {
            max-width: 60px;
          }

          .drink-features {
            gap: 1.5rem;
            max-width: 400px;
            margin-bottom: 2.5rem;
          }

          .feature-item {
            min-width: 110px;
            padding: 1rem;
          }

          .cta-group {
            flex-direction: row;
            max-width: 500px;
          }

          .cta-btn {
            width: auto;
            padding: 1rem 2rem;
          }
        }

        /* Desktop */
        @media (min-width: 1024px) {
          .main-title {
            font-size: 4rem;
          }

          .subtitle {
            font-size: 1.8rem;
          }

          .description {
            font-size: 1.2rem;
          }

          .drink-features {
            max-width: 500px;
          }

          .feature-item {
            min-width: 120px;
          }

          .cta-btn {
            padding: 1.1rem 2.2rem;
          }
        }

        /* Large Desktop */
        @media (min-width: 1440px) {
          .content-wrapper {
            padding: 4rem 2rem;
          }
        }

        /* Safe area support for notches */
        @supports (padding: max(0px)) {
          .video-content {
            padding-left: max(1rem, env(safe-area-inset-left));
            padding-right: max(1rem, env(safe-area-inset-right));
            padding-bottom: max(1rem, env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </div>
  );
}
