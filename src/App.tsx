import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, X, Play, Instagram, Youtube, Send, Film, Clapperboard, Sparkles, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAtmosphere } from './components/Atmosphere'
gsap.registerPlugin(ScrollTrigger)

const films = [
  { n: '01', title: 'THE LAST FRAME', type: 'CINEMA / EDITORIAL', year: '2026', tone: 'ember', desc: 'Every ending leaves a story behind.' },
  { n: '02', title: 'AFTER THE LIGHTS', type: 'CULTURE / STORIES', year: '2026', tone: 'blue', desc: 'Where the real conversations begin.' },
  { n: '03', title: 'BEYOND THE SCREEN', type: 'EXCLUSIVE / PEOPLE', year: '2026', tone: 'violet', desc: 'A closer look at the minds that move us.' },
]
const topics = ['Film & cinema', 'Behind the scenes', 'Pop culture', 'Interviews', 'Stories worth sharing']
const cinemaFilms = [
  {
    slug: 'king', title: 'KING', tag: 'UPCOMING RELEASE', image: './images/king-poster.webp', note: '24 DECEMBER 2026',
    genre: 'ACTION · THRILLER', year: '2026', release: '24 December 2026', language: 'Hindi', format: '2D', runtime: 'Not announced', certificate: 'Not announced', status: 'COMING SOON',
    synopsis: 'KING is ready to roar in cinemas on 24 December 2026.',
    cast: ['Shah Rukh Khan', 'Suhana Khan', 'Abhishek Bachchan', 'Deepika Padukone'],
    crew: ['Siddharth Anand — Director', 'Siddharth Anand — Producer', 'Gauri Khan — Producer', 'Red Chillies Entertainment — Producer'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/king/ET00455480',
    tagLine: 'KING IS READY TO ROAR.'
  },
  {
    slug: 'ramayana', title: 'RAMAYANA', tag: 'THE EPIC UNFOLDS', image: './images/ramayana-poster.webp', note: '5 NOVEMBER 2026',
    genre: 'ACTION · ADVENTURE · DRAMA', year: '2026', release: '5 November 2026', language: 'Hindi, Malayalam + 3 languages', format: '2D · EPIQ 3D · Dolby Cinema 2D · 3D ScreenX and more', runtime: '3h 15m', certificate: 'U', status: 'IN CINEMAS',
    synopsis: 'The immortal story of Rama and Ravana defined a culture and moved generations. It now arrives as a cinematic landmark of our time. Ramayana is a timeless saga reborn through the lens of modern Indian cinema.',
    cast: ['Ranbir Kapoor as Rama', 'Yash as Ravana', 'Ravie Dubey as Lakshman', 'Sai Pallavi as Sita', 'Sunny Deol as Hanuman', 'Arun Govil as Dashrath', 'Indira Krishnan as Kaushalya', 'Sonal Jha as Sumitra', 'Lara Dutta as Kaikeyi', 'Rakul Preet Singh as Surpanakha', 'Kunal Kapoor as Indra', 'Shobana as Kaikesi', 'Vivek Oberoi as Vidyutjiva', 'Ajinkya Deo as Vishwamitra', 'Anupam Kher as Jatayu', 'Kajal Aggarwal as Mandodari', 'Addinath M. Kothare as Bharat', 'Faisal Malik as Kumbhakaran', 'Saurabh Sachdeva as Mareech', 'Sheeba Chaddha as Manthara', 'Chetan Hansraj as Mali'],
    crew: ['Nitesh Tiwari — Director', 'Namit Malhotra — Producer', 'Yash — Producer', 'A. R. Rahman — Musician', 'Hans Zimmer — Musician'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/ramayana/ET00451914',
    tagLine: 'THE IMMORTAL SAGA RETURNS.'
  },
  {
    slug: 'yeh-prem-mol-liya', title: 'YEH PREM MOL LIYA', tag: 'FAMILY · ROMANCE', image: './images/ypml-poster.webp', note: '27 NOVEMBER 2026',
    genre: 'DRAMA · FAMILY · ROMANTIC', year: '2026', release: '27 November 2026', language: 'Hindi', format: '2D', runtime: 'Not announced', certificate: 'Not announced', status: 'COMING SOON',
    synopsis: 'They are ready to pay the price of love! Experience the emotions of Yeh Prem Mol Liya.',
    cast: ['Ayushmann Khurrana', 'Sharvari Wagh', 'Anupam Kher', 'Seema Pahwa', 'Supriya Pathak Kapur', 'Swanand Kirkire', 'Geeta Aggarwal Sharma', 'Saumya Tandon', 'Shaad Randhawa', 'Shruti Seth', 'Rajesh Kumar', 'Girish Kulkarni', 'Jameel Khan'],
    crew: ['Sooraj R. Barjatya — Director', 'Kamal Kumar Barjatya — Producer', 'Rajkumar Barjatya — Producer', 'Ajit Kumar Barjatya — Producer', 'Mahaveer S. Jain — Producer', 'Himesh Reshammiya — Musician'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/yeh-prem-mol-liya/ET00496261',
    tagLine: 'THE PRICE OF LOVE.'
  },
  {
    slug: 'avengers-doomsday', title: 'AVENGERS: DOOMSDAY', tag: 'THE MARVEL EVENT', image: './images/doomsday-poster.webp', note: '17 DECEMBER 2026',
    genre: 'ACTION · ADVENTURE · FANTASY · SCI-FI', year: '2026', release: '17 December 2026', language: 'English, Hindi + 2 languages', format: '2D · 3D · Dolby Cinema 3D · EPIQ 3D and more', runtime: '2h 35m', certificate: 'UA16+', status: 'COMING SOON',
    synopsis: 'Three beloved heroes from distinct universes are pulled onto a collision course, and they must face an existential threat unlike anything they have met before.',
    cast: ['Robert Downey Jr.', 'Chris Hemsworth as Thor', 'Anthony Mackie as Sam Wilson / Captain America', 'Pedro Pascal as Reed Richards / Mr. Fantastic', 'Sebastian Stan as Bucky Barnes / Winter Soldier', 'Tom Hiddleston as Loki', 'Paul Rudd as Ant-Man', 'Vanessa Kirby as Sue Storm / The Invisible Woman', 'Wyatt Russell as John Walker / U.S. Agent', 'Ebon Moss-Bachrach as Ben Grimm / Thing', 'Joseph Quinn as Johnny Storm / Human Torch', 'Kelsey Grammer as Dr. Henry McCoy / Beast', 'David Harbour as Red Guardian', 'Letitia Wright as Shuri', 'Winston Duke as M’Baku', 'Tenoch Huerta as Namor'],
    crew: ['Joe Russo — Director', 'Anthony Russo — Director', 'Jack Kirby — Writer', 'Stan Lee — Writer', 'Jeffrey Ford — Editor'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/avengers-doomsday/ET00439706',
    tagLine: 'ONE THREAT. EVERY UNIVERSE.'
  },
  {
    slug: 'dune-part-three', title: 'DUNE: PART THREE', tag: 'THE EPIC CONCLUSION', image: './images/dune-poster.webp', note: '18 DECEMBER 2026',
    genre: 'ACTION · ADVENTURE · DRAMA · SCI-FI', year: '2026', release: '18 December 2026', language: 'English, Hindi', format: '2D · IMAX 2D', runtime: '2h 30m (as shown in supplied reference)', certificate: 'PG-13 (as shown in supplied reference)', status: 'COMING SOON',
    synopsis: 'Set nearly two decades after Paul Atreides seized control of the Imperium, Emperor Paul must face the consequences of his reign as old allies return, terrifying new threats emerge, and betrayal lurks in every shadow. Haunted by visions of Imperial collapse and the reappearance of his long-lost love, Paul is drawn into a sweeping conspiracy, with Chani at the heart of its unfolding mystery.',
    cast: ['Timothée Chalamet as Paul Atreides', 'Zendaya as Chani', 'Florence Pugh as Princess Irulan Corrino', 'Javier Bardem as Stilgar', 'Rebecca Ferguson as Lady Jessica Atreides', 'Robert Pattinson', 'Jason Momoa', 'Charlotte Rampling', 'Anya Taylor-Joy'],
    crew: ['Denis Villeneuve — Director, Producer and Screenplay', 'Brian K. Vaughan — Screenplay', 'Mary Parent — Producer', 'Cale Boyter — Producer', 'Tanya Lapointe — Producer', 'Hans Zimmer — Musician'],
    bookMyShow: 'https://in.bookmyshow.com/movies/national-capital-region-ncr/dune-part-three/ET00491771',
    tagLine: 'THE EPIC CONCLUSION.'
  },
]

const posterWall = [...cinemaFilms, ...cinemaFilms]


function App() {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [activeFilm, setActiveFilm] = useState(() => cinemaFilms.find(f => window.location.hash === `#/film/${f.slug}`) || null)
  useEffect(() => {
    const syncRoute = () => setActiveFilm(cinemaFilms.find(f => window.location.hash === `#/film/${f.slug}`) || null)
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])
  useEffect(() => {
    const stop = canvas.current ? createAtmosphere(canvas.current) : () => {}
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title, .hero-copy, .hero-actions', { y: 35, opacity: 0, duration: 1.1, stagger: .13, ease: 'power3.out', delay: .2 })
      gsap.from('.hero-side-note', { opacity: 0, x: 20, duration: 1, delay: .9 })
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.from(el, { y: 55, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } }))
      gsap.to('.hero-orb', { rotate: 360, duration: 70, repeat: -1, ease: 'none' })
      gsap.to('.hero-glow', { scale: 1.12, opacity: .65, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }, root)
    return () => { ctx.revert(); stop() }
  }, [])
  const submit = (e: React.FormEvent) => { e.preventDefault(); if (email.includes('@')) setSubscribed(true) }
  const closeMenu = () => setMenuOpen(false)
  return <div ref={root} className="site-shell">
    <div className="grain" /><canvas ref={canvas} className="atmosphere" />
    <header className="topbar"><a href="#home" className="wordmark" onClick={closeMenu} aria-label="MMD Exclusive home"><span className="mmd-logo" aria-hidden="true">MMD</span><span className="wordmark-divider"/><span className="wordmark-name">EXCLUSIVE</span></a><nav className={menuOpen ? 'nav open' : 'nav'}><a href="#universe" onClick={closeMenu}>THE UNIVERSE</a><a href="#stories" onClick={closeMenu}>FEATURED</a><a href="#about" onClick={closeMenu}>OUR WORLD</a><a href="#contact" onClick={closeMenu}>CONTACT</a></nav><a className="top-cta" href="#stories">ENTER THE WORLD <ArrowUpRight size={14}/></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button></header>
    <main>
      {activeFilm ? <section className="film-detail" key={activeFilm.slug}>
        <div className="film-detail-backdrop" style={{ backgroundImage: `url(${activeFilm.image})` }} />
        <div className="film-detail-inner">
          <a className="film-back" href="#home"><ArrowDown size={15}/> BACK TO MMD EXCLUSIVE</a>
          <div className="film-detail-poster"><img src={activeFilm.image} alt={`${activeFilm.title} poster`} decoding="async" fetchPriority="high" /></div>
          <div className="film-detail-copy">
            <span className="film-detail-kicker">MMD EXCLUSIVE / FILM FILE {activeFilm.year}</span>
            <h1>{activeFilm.title}</h1>
            <p className="film-tagline">{activeFilm.tagLine}</p>
            <div className="film-detail-meta"><span>{activeFilm.genre}</span><i/><span>{activeFilm.status}</span></div>
            <p className="film-synopsis">{activeFilm.synopsis}</p>
            <div className="film-facts">
              <div><span>RELEASE</span><b>{activeFilm.release}</b></div>
              <div><span>RUNTIME</span><b>{activeFilm.runtime}</b></div>
              <div><span>CERTIFICATE</span><b>{activeFilm.certificate}</b></div>
              <div><span>LANGUAGE</span><b>{activeFilm.language}</b></div>
              <div className="wide"><span>FORMAT</span><b>{activeFilm.format}</b></div>
            </div>
            <div className="film-credits"><div><span className="credits-label">CAST</span><div className="credit-chips">{activeFilm.cast.map(name => <span key={name}>{name}</span>)}</div></div><div><span className="credits-label">CREW</span><div className="credit-chips">{activeFilm.crew.map(name => <span key={name}>{name}</span>)}</div></div></div>
            <div className="film-detail-actions"><a className="button-primary" href={activeFilm.bookMyShow} target="_blank" rel="noreferrer">FILM DETAILS & TICKETS <ArrowUpRight size={16}/></a><a className="film-back-link" href="#home">BACK TO THE UNIVERSE</a></div>
            <div className="film-detail-index">MMD CINEMA FILE <b>/{activeFilm.slug.toUpperCase()}</b></div>
          </div>
        </div>
      </section> : <>
      <section className="hero" id="home"><div className="hero-grid"/><div className="hero-glow"/><div className="hero-orb"><div className="orb-inner"/><span className="orb-label">MMD · EST. 2023</span></div><div className="hero-content"><div className="hero-kicker"><span className="live-dot"/> INDEPENDENT ENTERTAINMENT UNIVERSE <span className="kicker-line"/></div><h1 className="hero-title">THE WORLD<br/>IS A <em>SCREEN.</em><br/><span>WE GO BEYOND.</span></h1><p className="hero-copy">Cinema. Conversations. Exclusives.<br/><strong>Bringing you closer to the world of cinema.</strong></p><div className="hero-actions"><a href="#universe" className="button-primary">DISCOVER MMD <ArrowUpRight size={16}/></a><a href="#stories" className="text-link"><span className="play-icon"><Play size={12} fill="currentColor"/></span> EXPLORE THE STORIES</a></div></div><div className="poster-wall" aria-label="Featured movie posters"><div className="poster-track">{posterWall.map((p, i) => <a className="moving-poster" href={`#/film/${p.slug}`} key={`${p.slug}-${i}`} aria-label={`Open ${p.title} film page`}><img className="poster-image" src={p.image} alt={`${p.title} movie poster`} loading={i < 5 ? 'eager' : 'lazy'} decoding="async" /><div className="poster-shade"/><span className="poster-tag">{p.tag}</span><div className="poster-caption"><strong>{p.title}</strong><span className="poster-number">{p.note}</span></div></a>)}</div></div><div className="hero-side-note"><span>01 / 05</span><i/> FEATURED ON MMD<br/>ON ENTERTAINMENT</div><a className="scroll-cue" href="#universe"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a><div className="hero-index">MMD<span>®</span></div></section>
      <section className="manifesto section-pad" id="universe"><div className="section-label reveal"><span>01 — THE UNIVERSE</span><span>BUILT FOR THE CURIOUS</span></div><div className="manifesto-layout"><h2 className="manifesto-title reveal">NOT JUST<br/>WHAT YOU <em>WATCH.</em><br/>WHAT YOU <em>FEEL.</em></h2><div className="manifesto-copy reveal"><div className="mini-rule"/><p className="large-copy">Stories are everywhere.<br/><span>We bring you closer to them.</span></p><p className="body-copy">MMD Exclusive is an independent entertainment and recreation universe built around the magic of cinema, the people behind it, and the conversations that stay with you long after the credits roll.</p><a href="#about" className="under-link">GET TO KNOW MMD <ArrowUpRight size={15}/></a></div></div><div className="manifesto-foot reveal"><span>THE ART OF LOOKING CLOSER</span><div className="foot-line"/><span>EST. MMXXIII</span></div></section>
      <section className="feature-section section-pad" id="stories"><div className="section-label reveal"><span>02 — SELECTED STORIES</span><span>THE MMD EDITION</span></div><div className="feature-heading reveal"><h2>CURATED FOR<br/><em>THE BIG SCREEN.</em></h2><p>Perspectives, moments and stories<br/>from the world of entertainment.</p></div><div className="story-list">{films.map((f, i) => <article className={`story-card ${f.tone} reveal`} key={f.n}><div className="story-art"><div className="art-ring ring-one"/><div className="art-ring ring-two"/><div className="art-visual">{i === 0 ? <Film/> : i === 1 ? <Sparkles/> : <Clapperboard/>}</div><span className="art-index">{f.n} / 03</span><span className="art-stamp">MMD<br/>EXCLUSIVE</span></div><div className="story-info"><div className="story-meta"><span>{f.type}</span><span>{f.year}</span></div><h3>{f.title}</h3><p>{f.desc}</p><a href="#contact" aria-label={`Explore ${f.title}`}><ArrowUpRight/></a></div></article>)}</div><div className="stories-bottom reveal"><span>MORE STORIES. MORE PERSPECTIVES.</span><span className="stories-line"/><span>COMING INTO FOCUS <ChevronRight size={14}/></span></div></section>
      <section className="topics-section section-pad" id="about"><div className="section-label reveal"><span>03 — OUR WORLD</span><span>ONE UNIVERSE. MANY ANGLES.</span></div><div className="topics-layout"><div className="topics-intro reveal"><h2>THE CULTURE<br/>IS <em>ALWAYS</em><br/>MOVING.</h2><p>We follow the stories shaping entertainment today — and the voices shaping what comes next.</p></div><div className="topic-list reveal">{topics.map((t, i) => <div className="topic-row" key={t}><span>0{i+1}</span><b>{t}</b><ArrowUpRight size={19}/></div>)}</div></div><div className="quote-panel reveal"><span className="quote-mark">“</span><p>Bringing you closer<br/>to the world of <em>cinema.</em></p><span className="quote-by">— THE MMD PROMISE</span></div></section>
      <section className="contact-section section-pad" id="contact"><div className="contact-orbit"/><div className="section-label reveal"><span>04 — STAY IN THE FRAME</span><span>THE NEXT CHAPTER STARTS HERE</span></div><div className="contact-content reveal"><span className="contact-kicker">THE MMD SIGNAL</span><h2>DON'T JUST<br/><em>HEAR ABOUT IT.</em><br/>BE THERE.</h2><p>Get closer to the stories, conversations and moments<br/>that make entertainment unforgettable.</p><form className="signup" onSubmit={submit}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}/><button type="submit" aria-label="Subscribe"><Send size={17}/></button></form><span className="form-note">{subscribed ? 'YOU’RE ON THE LIST. WELCOME TO MMD.' : 'NO NOISE. JUST THE GOOD STUFF.'}</span></div></section>
      </>}
    </main>
    <footer className="footer"><div className="footer-top"><div className="footer-copy"><a href="#home" className="footer-brand"><span className="mmd-logo footer-mmd-logo">MMD</span><span className="wordmark-divider"/><span className="wordmark-name">EXCLUSIVE</span></a><p>Cinema. Conversations. Exclusives.<br/>Bringing you closer to the world of cinema.</p></div><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube/></a><a href="https://x.com/mmddivyansh" target="_blank" rel="noreferrer" aria-label="X"><span className="x-social">𝕏</span></a></div></div><div className="footer-bottom"><span>© 2026 MMD EXCLUSIVE. ALL RIGHTS RESERVED.</span><span>MADE FOR THE LOVE OF CINEMA <span className="blue-dot">✳</span></span><a href="#home">BACK TO TOP ↑</a></div></footer>
  </div>
}
export default App
