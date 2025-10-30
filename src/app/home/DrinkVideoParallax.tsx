"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="luxury-video-section">
      {/* YouTube Video Background */}
      <div className="video-background">
        <iframe
          src="https://www.youtube.com/embed/Tza4xFLph1Y?autoplay=1&mute=1&loop=1&playlist=Tza4xFLph1Y&controls=0&modestbranding=1&rel=0&playsinline=1"
          className="youtube-iframe"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="video-overlay"></div>
      </div>

      {/* Content */}
      <div className="video-content">
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
          height: 100vh;
          width: 100%;
          overflow: hidden;
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
          height: 115vh; /* Extra height to prevent cropping during resize */
          transform: translate(-50%, -50%);
          pointer-events: none;
          object-fit: cover;
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.6) 0%,
            rgba(0, 0, 0, 0.4) 50%,
            rgba(0, 0, 0, 0.6) 100%
          );
          z-index: 2;
        }

        .video-content {
          position: relative;
          z-index: 3;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #fefefe;
          padding: 2rem;
        }

        .content-wrapper {
          max-width: 800px;
          width: 100%;
        }

        .premium-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .badge-text {
          color: #dda629;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 3px;
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
          max-width: 60px;
        }

        .title-group {
          margin-bottom: 1.5rem;
        }

        .main-title {
          font-size: 4rem;
          font-weight: 700;
          color: #fefefe;
          margin: 0 0 1rem 0;
          line-height: 1.1;
          letter-spacing: 1px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .title-underline {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
        }

        .underline-gold {
          height: 2px;
          background: #dda629;
          width: 80px;
          border-radius: 1px;
        }

        .underline-dot {
          width: 6px;
          height: 6px;
          background: #dda629;
          border-radius: 50%;
        }

        .subtitle {
          font-size: 1.8rem;
          color: #dda629;
          margin: 0 0 1.5rem 0;
          font-weight: 600;
          line-height: 1.3;
          font-style: italic;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
        }

        .description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: rgba(254, 254, 254, 0.9);
          margin: 0 auto 2.5rem;
          font-weight: 300;
          max-width: 600px;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
        }

        /* Drink Features */
        .drink-features {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .feature-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(221, 166, 41, 0.1);
          border: 1px solid rgba(221, 166, 41, 0.3);
          border-radius: 12px;
          transition: all 0.3s ease;
          min-width: 120px;
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
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cta-group {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .cta-btn {
          padding: 1.1rem 2.2rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.5px;
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
          border-radius: 8px;
        }

        .cta-btn.secondary:hover {
          border-color: #dda629;
          color: #dda629;
          transform: translateY(-2px);
          background: rgba(221, 166, 41, 0.1);
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.3rem;
          }

          .description {
            font-size: 1rem;
          }

          .premium-badge {
            flex-direction: column;
            gap: 0.5rem;
          }

          .badge-text {
            font-size: 0.7rem;
            letter-spacing: 2px;
          }

          .drink-features {
            flex-direction: column;
            gap: 1rem;
            align-items: center;
          }

          .feature-item {
            flex-direction: row;
            justify-content: center;
            min-width: 200px;
          }

          .cta-group {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 250px;
          }
        }

        /* Extra small devices */
        @media (max-width: 480px) {
          .main-title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .video-content {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
