// components/SimpleVideoParallax.tsx
"use client";

import { Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

interface SimpleVideoParallaxProps {
  videoId?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

export default function SimpleVideoParallax({
  videoId = "lcU3pruVyUw",
  title = "Culinary Excellence",
  subtitle = "Where Tradition Meets Innovation",
  description = "Immerse yourself in an unparalleled dining experience where master chefs transform the finest ingredients into edible art",
}: SimpleVideoParallaxProps) {
  return (
    <div className="simple-video-section">
      {/* YouTube Video Background */}
      <div className="video-background">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
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
            <span className="badge-text">EXCLUSIVE DINING EXPERIENCE</span>
            <div className="badge-line"></div>
          </div>

          <div className="title-group">
            <h1 className={`main-title ${playfair.className}`}>{title}</h1>
            <div className="title-underline">
              <div className="underline-gold"></div>
              <div className="underline-dot"></div>
              <div className="underline-gold"></div>
            </div>
          </div>

          <h2 className={`subtitle ${cormorant.className}`}>{subtitle}</h2>

          <p className={`description ${cormorant.className}`}>{description}</p>

          <div className="cta-group">
            <button className="cta-btn primary">
              <span className="btn-text">Reserve Your Table</span>
            </button>
            <Link href={"/menu"}>
              <button className="cta-btn secondary">
                <span className="btn-text">Explore Our Menu</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .simple-video-section {
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
          height: 100vh;
          transform: translate(-50%, -50%);
          pointer-events: none;
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

        /* Rest of the styles remain the same as Solution 1 */
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

          .cta-group {
            flex-direction: column;
            align-items: center;
          }

          .cta-btn {
            width: 100%;
            max-width: 250px;
          }
        }
      `}</style>
    </div>
  );
}
