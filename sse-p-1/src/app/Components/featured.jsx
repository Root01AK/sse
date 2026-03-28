import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { CheckCircle, Leaf, Shield, Sparkles, ArrowUpRight } from 'lucide-react';

export default function Featured() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bricksRef = useRef([]);
  const cardRefs = useRef([]);
  const gsapLoaded = useRef(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.async = true;
    
    script.onload = () => {
      gsapLoaded.current = true;
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const checkGSAP = setInterval(() => {
      if (window.gsap && gsapLoaded.current) {
        clearInterval(checkGSAP);
        
        const gsap = window.gsap;
        const ctx = gsap.context(() => {
          // Animate header
          if (titleRef.current) {
            gsap.from(titleRef.current, {
              duration: 1.2,
              y: 80,
              opacity: 0,
              ease: 'power3.out'
            });
          }

          // Animate bricks
          const validBricks = bricksRef.current.filter(brick => brick !== null);
          if (validBricks.length > 0) {
            gsap.from(validBricks, {
              duration: 1,
              scale: 0,
              opacity: 0,
              stagger: 0.08,
              ease: 'back.out(1.7)',
              delay: 0.3
            });

            // Continuous floating animation
            validBricks.forEach((brick, i) => {
              gsap.to(brick, {
                y: -12,
                duration: 2.5 + (i * 0.15),
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: i * 0.1
              });
            });
          }

          // Animate cards
          const validCards = cardRefs.current.filter(card => card !== null);
          if (validCards.length > 0) {
            gsap.from(validCards, {
              duration: 0.8,
              y: 60,
              opacity: 1,
              stagger: 0.15,
              ease: 'power3.out',
              delay: 0.5
            });
          }
        }, sectionRef);

        return () => ctx.revert();
      }
    }, 100);

    return () => clearInterval(checkGSAP);
  }, []);

  const features = [
    { 
      icon: Shield, 
      title: 'Built to Last',
      text: 'Long-lasting & weather-resistant'
    },
    { 
      icon: Leaf, 
      title: 'Eco-Friendly Choice',
      text: 'Sustainable and thermally efficient'
    },
    { 
      icon: CheckCircle, 
      title: 'Cost-Effective',
      text: 'Smart alternative to red bricks'
    },
    { 
      icon: Sparkles, 
      title: 'Premium Finish',
      text: 'Smooth surface, easy plastering'
    }
  ];

  return (
    <section className="featured-section" ref={sectionRef}>
      <div className="featured-container">
        <div className="section-header" ref={titleRef}>
          <p className="tagline">From precision engineering to sustainable solutions</p>
          <h1 className="main-title">
            Discover What Builds Better.
          </h1>
          <p className="subtitle">
            Explore eco-friendly fly ash bricks that care for your projects and the planet.
          </p>
        </div>

        <div className="featured-grid">
          {/* Large showcase card */}
          <div className="large-card" ref={el => cardRefs.current[0] = el}>
            <div className="brick-showcase">
              <div className="eco-badge">
                <Leaf className="eco-icon" />
                Eco-Friendly
              </div>
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" 
                alt="Fly Ash Bricks"
                className="brick-image"
              />
            </div>
            <div className="card-content">
              <h2 className="card-title">
                Crafted for a<br />Greener Life.
              </h2>
              <div className="arrow-button">
                <ArrowUpRight />
              </div>
            </div>
          </div>

          {/* Feature cards */}
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="small-card"
              ref={el => cardRefs.current[index + 1] = el}
            >
              <div className="card-header">
                <div className="feature-icon-wrapper">
                  <feature.icon className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
              </div>
              <p className="feature-description">{feature.text}</p>
              <div className="card-footer">
                <div className="small-arrow">
                  <ArrowUpRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}