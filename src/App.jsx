import React, { useState, useEffect, useRef } from 'react';

const menuData = {
    "Tiger Series": [
        { name: 'Perfect Ceylon Muscovado Tiger Milk Tea', price: '1,900 LKR', desc: 'Authentic Ceylon tea infused with rich muscovado sugar and tiger stripes.', image: '/bev (1).jpg' },
        { name: 'Creamy Ceylon Muscovado Tiger Milk Tea', price: '1,900 LKR', desc: 'A velvety smooth blend of Ceylon tea and muscovado syrup.', image: '/bev (2).jpg' },
        { name: 'Creamy Ceylon Muscovado Tiger Cream Cheese', price: '1,950 LKR', desc: 'Signature tiger milk tea topped with a decadent cream cheese layer.', image: '/bev (3).jpg' },
        { name: 'Hot Muscovado Tiger Milk Tea Latte', price: '850 LKR', desc: 'A warming, rich latte version of our classic tiger series.', image: '/bev (4).jpg' }
    ],
    "Fruit & Shakes": [
        { name: 'Mango / Strawberry Cream Cheese Milk Tea', price: '1,500 LKR', desc: 'Refreshing fruit-infused milk tea with a silky cream cheese top.', image: '/bev (5).jpg' },
        { name: 'Oreo Cream Cheese Milk Tea', price: '1,820 LKR', desc: 'Indulgent milk tea blended with Oreo crumbles and cream cheese.', image: '/bev (6).jpg' },
        { name: 'Oreo Choco Shake', price: '2,150 LKR', desc: 'Premium chocolate shake loaded with Oreo goodness.', image: '/bev (7).jpg' },
        { name: 'Wildberry Snow Shake', price: '1,500 LKR', desc: 'A frosty, blended treat featuring wild mountain berries.', image: '/bev (8).jpg' },
        { name: 'Earl Grey Iced Cream Tea Shake', price: '1,500 LKR', desc: 'Sophisticated Earl Grey notes blended into a creamy dessert shake.', image: '/bev (9).jpg' }
    ],
    "Iced & Mojitos": [
        { name: 'Iced Fruit Teas (Mango, Peach, Lemon)', price: '940 LKR', desc: 'Classic Ceylon iced tea with your choice of tropical fruit nectar.', image: '/bev (10).jpg' },
        { name: 'Iced Strawberry / Wildberry Fruit Tea', price: '980 LKR', desc: 'Berry-infused iced tea, perfect for a sunny island afternoon.', image: '/bev (11).jpg' },
        { name: 'Chamomile Mansi / Peachy Lemon Blast', price: '1,500 LKR', desc: 'Invigorating herbal and fruit blends for a refreshing kick.', image: '/bev (12).jpg' },
        { name: 'Tea Mojito', price: '1,100 LKR', desc: 'A fizzy, minty twist on our premium tea collection.', image: '/bev (13).jpg' }
    ]
};

const signatureImages = [
    "/unnamed (10).webp",
    "/unnamed (12).webp",
    "/unnamed (15).webp"
];

const App = () => {
    const [activeCategory, setActiveCategory] = useState('Tiger Series');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Slideshow State
    const [sigIndex, setSigIndex] = useState(0);
    const [prevSigIndex, setPrevSigIndex] = useState(-1);

    const heroImgRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2800);

        // Signature Slideshow Timer
        const sigTimer = setInterval(() => {
            setSigIndex((prev) => {
                setPrevSigIndex(prev);
                return (prev + 1) % signatureImages.length;
            });
        }, 5000);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            if (heroImgRef.current) {
                const value = window.scrollY;
                heroImgRef.current.style.transform = `scale(${1 + value * 0.0005}) translateY(${value * 0.15}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(60px) scale(0.98)';
            section.style.transition = 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)';
            revealObserver.observe(section);
        });

        const sections = document.querySelectorAll('section, header');
        sections.forEach(section => {
            for (let i = 0; i < 3; i++) {
                const leaf = document.createElement('div');
                leaf.className = 'leaf';
                leaf.style.left = Math.random() * 100 + '%';
                leaf.style.top = Math.random() * 100 + '%';
                leaf.style.animationDelay = Math.random() * 10 + 's';
                leaf.style.animationDuration = (15 + Math.random() * 20) + 's';
                section.appendChild(leaf);
            }
        });

        return () => {
            clearTimeout(timer);
            clearInterval(sigTimer);
            window.removeEventListener('scroll', handleScroll);
            revealObserver.disconnect();
        };
    }, []);


    return (
        <>
            <div id="preloader" style={{ opacity: isLoading ? 1 : 0, visibility: isLoading ? 'visible' : 'hidden' }}>
                <div className="loader-content">
                    <div className="loader-logo">ISLAND TEA & COFFEE</div>
                    <p style={{ letterSpacing: '2px', opacity: 0.7, fontSize: '0.8rem' }}>SIPPING PARADISE</p>
                </div>
            </div>

            <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
                <div className="container nav-content">
                    <a href="#" className="logo">Island TEA & Ceylon Coffee</a>
                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <a href="#about" onClick={() => setIsMenuOpen(false)}>Our Story</a>
                        <a href="#menu" onClick={() => setIsMenuOpen(false)}>Menu</a>
                        <a href="#experience" onClick={() => setIsMenuOpen(false)}>Ambience</a>
                        <a href="#visit" className="btn btn-outline" style={{ padding: '0.5rem 1.5rem' }} onClick={() => setIsMenuOpen(false)}>Visit</a>
                    </div>
                    <button
                        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        id="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            <header className="hero">
                <img
                    ref={heroImgRef}
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop"
                    alt="Tropical Cafe Atmosphere"
                    className="hero-video-bg"
                    id="hero-img"
                />
                <div className="hero-content">
                    <span>EST. 1924</span>
                    <h1>Sophistication in Every Sip</h1>
                    <p>A curated journey through the mountain estates of Ceylon and the soul of the island's finest coffee beans.</p>
                    <div className="hero-btns">
                        <a href="#menu" className="btn btn-primary">Explore Menu</a>
                        <a href="#visit" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>Book a Table</a>
                    </div>
                </div>
            </header>

            <section id="about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-img">
                            <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop" alt="Lush Cafe Interior" />
                        </div>
                        <div className="about-text">
                            <span>Our Heritage</span>
                            <h3>The Tale of Two High Lands</h3>
                            <p>From the misty peaks of Nuwara Eliya to the sun-kissed valleys where our coffee beans ripen, Island Tea & Ceylon Coffee Club brings you a century of tradition refined for the modern connoisseur.</p>
                            <p style={{ marginTop: '1rem' }}>We believe in more than just a beverage; we offer a sanctuary where time slows down and every flavor tells a story of the island's rich soil and vibrant culture.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="signatures" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                <div className="container">
                    <div className="section-title">
                        <span style={{ color: 'var(--accent)' }}>Chef's Choice</span>
                        <h2 style={{ color: 'white' }}>Signature Creations</h2>
                    </div>
                    <div className="about-grid">
                        <div className="about-text">
                            <span style={{ color: 'var(--accent)' }}>Best Seller</span>
                            <h3 style={{ color: 'white' }}>Perfect Muscovado Tiger</h3>
                            <p>Our masterpiece. Hand-painted tiger stripes of rich muscovado syrup, layered with fresh milk and our premium Ceylon black tea infusion. A texture and flavor that defined a movement.</p>
                            <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
                                <div>
                                    <h4 style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>100%</h4>
                                    <p style={{ fontSize: '0.8rem' }}>Authentic Ceylon</p>
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--accent)', fontSize: '1.5rem' }}>Small Batch</h4>
                                    <p style={{ fontSize: '0.8rem' }}>Artisanal Syrup</p>
                                </div>
                            </div>
                        </div>
                        <div className="about-img signature-slideshow">
                            {signatureImages.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    className={idx === sigIndex ? 'sig-image-in' : (idx === prevSigIndex ? 'sig-image-out' : '')}
                                    alt={`Signature ${idx}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="menu" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <div className="section-title">
                        <span>The Collection</span>
                        <h2>A Curated Selection</h2>
                    </div>

                    <div className="menu-tabs">
                        {Object.keys(menuData).map((category) => (
                            <button
                                key={category}
                                className={`tab-btn ${activeCategory === category ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div id="menu-container" className="menu-grid">
                        {menuData[activeCategory].map((item, index) => (
                            <div
                                key={index}
                                className="menu-item"
                                style={{
                                    opacity: 1,
                                    transform: 'translateY(0)',
                                    transition: `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${index * 0.1}s`
                                }}
                            >
                                <div className="menu-item-img">
                                    <img src={item.image} alt={item.name} loading="lazy" />
                                </div>
                                <div className="menu-item-info">
                                    <h4>{item.name} <span className="price">{item.price}</span></h4>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="experience" className="experience">
                <div className="container">
                    <div className="section-title">
                        <span>Experience</span>
                        <h2>The Island Ambience</h2>
                    </div>
                    <div className="gallery-grid">
                        <div className="gallery-item"><img src="/unnamed (1).jpg" alt="Gallery 1" /></div>
                        <div className="gallery-item"><img src="/unnamed (10).webp" alt="Gallery 2" /></div>
                        <div className="gallery-item"><img src="/unnamed (11).webp" alt="Gallery 3" /></div>
                        <div className="gallery-item"><img src="/unnamed (12).webp" alt="Gallery 4" /></div>
                        <div className="gallery-item"><img src="/unnamed (13).webp" alt="Gallery 5" /></div>
                        <div className="gallery-item"><img src="/unnamed (14).webp" alt="Gallery 6" /></div>
                        <div className="gallery-item"><img src="/unnamed (15).webp" alt="Gallery 7" /></div>
                        <div className="gallery-item"><img src="/unnamed (16).webp" alt="Gallery 8" /></div>
                        <div className="gallery-item"><img src="/unnamed (17).webp" alt="Gallery 9" /></div>
                    </div>
                </div>
            </section>

            <section id="visit">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-title">
                        <span>Contact</span>
                        <h2>Find Us in Paradise</h2>
                    </div>
                    <div className="about-grid" style={{ textAlign: 'left' }}>
                        <div>
                            <h3>Location</h3>
                            <p>12/3 Ocean Breeze Walk,<br />Colombo 07, Sri Lanka</p>
                            <h3 style={{ marginTop: '2rem' }}>Hours</h3>
                            <p>Monday - Friday: 8am - 10pm<br />Saturday - Sunday: 7am - 11pm</p>

                            <div style={{ marginTop: '3rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
                                <p style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '0.5rem' }}>Join the Club</p>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Follow us @IslandTeaCeylon for daily blends and secret recipes.</p>
                            </div>
                        </div>
                        <div className="visit-form-container" style={{ background: 'white', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            <form id="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent to Paradise! We will get back to you soon.'); }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>YOUR NAME</label>
                                    <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '1rem', background: '#f8f9fa', border: '1px solid transparent', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>EMAIL ADDRESS</label>
                                    <input type="email" placeholder="john@example.com" style={{ width: '100%', padding: '1rem', background: '#f8f9fa', border: '1px solid transparent', borderRadius: '12px', outline: 'none' }} required />
                                </div>
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--primary)' }}>MESSAGE</label>
                                    <textarea placeholder="How can we help?" style={{ width: '100%', padding: '1rem', background: '#f8f9fa', border: '1px solid transparent', borderRadius: '12px', outline: 'none', height: '100px', resize: 'none' }}></textarea>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', borderRadius: '12px' }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <div
                className="scroll-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '50px',
                    height: '50px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    zIndex: 900,
                    opacity: isScrolled ? 1 : 0,
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                }}
            >
                ↑
            </div>

            <footer style={{ background: 'var(--primary)', padding: '4rem 0', color: 'white', textAlign: 'center' }}>
                <div className="container">
                    <h2 className="logo" style={{ color: 'white', marginBottom: '2rem' }}>Island TEA & Ceylon Coffee</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
                        <a href="#">Instagram</a>
                        <a href="#">Facebook</a>
                        <a href="#">X</a>
                    </div>
                    <p>&copy; 2024 Island Tea & Ceylon Coffee Club. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default App;
