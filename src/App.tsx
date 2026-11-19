import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Menu, X, Play, Instagram, Youtube, Send, Ticket } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { createAtmosphere } from './components/Atmosphere'
gsap.registerPlugin(ScrollTrigger)

const topics = ['Film & cinema', 'Behind the scenes', 'Pop culture', 'Interviews', 'Stories worth sharing']
const cinemaFilms = [
  {
    slug: 'king', title: 'KING', tag: 'UPCOMING RELEASE', image: './images/king-poster.webp', note: '24 DECEMBER 2026',
    genre: 'ACTION · THRILLER', year: '2026', release: '24 December 2026', language: 'Hindi', format: '2D', runtime: 'Not announced', certificate: 'Not announced', status: 'COMING SOON',
    synopsis: 'KING is ready to roar in cinemas on 24 December 2026.',
    cast: ['Shah Rukh Khan', 'Suhana Khan', 'Abhishek Bachchan', 'Deepika Padukone'],
    crew: ['Siddharth Anand — Director', 'Siddharth Anand — Producer', 'Gauri Khan — Producer', 'Red Chillies Entertainment — Producer'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/king/ET00455480',
    tagLine: 'KING IS READY TO ROAR.', trailerId: 'Uu2QK9Z9X5E', trailerLabel: 'OFFICIAL TITLE REVEAL · RED CHILLIES ENTERTAINMENT'
  },
  {
    slug: 'ramayana', title: 'RAMAYANA', tag: 'THE EPIC UNFOLDS', image: './images/ramayana-poster.webp', note: '5 NOVEMBER 2026',
    genre: 'ACTION · ADVENTURE · DRAMA', year: '2026', release: '5 November 2026', language: 'Hindi, Malayalam + 3 languages', format: '2D · EPIQ 3D · Dolby Cinema 2D · 3D ScreenX and more', runtime: '3h 15m', certificate: 'U', status: 'IN CINEMAS',
    synopsis: 'The immortal story of Rama and Ravana defined a culture and moved generations. It now arrives as a cinematic landmark of our time. Ramayana is a timeless saga reborn through the lens of modern Indian cinema.',
    cast: ['Ranbir Kapoor as Rama', 'Yash as Ravana', 'Ravie Dubey as Lakshman', 'Sai Pallavi as Sita', 'Sunny Deol as Hanuman', 'Arun Govil as Dashrath', 'Indira Krishnan as Kaushalya', 'Sonal Jha as Sumitra', 'Lara Dutta as Kaikeyi', 'Rakul Preet Singh as Surpanakha', 'Kunal Kapoor as Indra', 'Shobana as Kaikesi', 'Vivek Oberoi as Vidyutjiva', 'Ajinkya Deo as Vishwamitra', 'Anupam Kher as Jatayu', 'Kajal Aggarwal as Mandodari', 'Addinath M. Kothare as Bharat', 'Faisal Malik as Kumbhakaran', 'Saurabh Sachdeva as Mareech', 'Sheeba Chaddha as Manthara', 'Chetan Hansraj as Mali'],
    crew: ['Nitesh Tiwari — Director', 'Namit Malhotra — Producer', 'Yash — Producer', 'A. R. Rahman — Musician', 'Hans Zimmer — Musician'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/ramayana/ET00451914',
    tagLine: 'THE IMMORTAL SAGA RETURNS.', trailerId: 'BOJw7TYH-fE', trailerLabel: 'TRAILER 2 · HINDI · T-SERIES'
  },
  {
    slug: 'yeh-prem-mol-liya', title: 'YEH PREM MOL LIYA', tag: 'FAMILY · ROMANCE', image: './images/ypml-poster.webp', note: '27 NOVEMBER 2026',
    genre: 'DRAMA · FAMILY · ROMANTIC', year: '2026', release: '27 November 2026', language: 'Hindi', format: '2D', runtime: 'Not announced', certificate: 'Not announced', status: 'COMING SOON',
    synopsis: 'They are ready to pay the price of love! Experience the emotions of Yeh Prem Mol Liya.',
    cast: ['Ayushmann Khurrana', 'Sharvari Wagh', 'Anupam Kher', 'Seema Pahwa', 'Supriya Pathak Kapur', 'Swanand Kirkire', 'Geeta Aggarwal Sharma', 'Saumya Tandon', 'Shaad Randhawa', 'Shruti Seth', 'Rajesh Kumar', 'Girish Kulkarni', 'Jameel Khan'],
    crew: ['Sooraj R. Barjatya — Director', 'Kamal Kumar Barjatya — Producer', 'Rajkumar Barjatya — Producer', 'Ajit Kumar Barjatya — Producer', 'Mahaveer S. Jain — Producer', 'Himesh Reshammiya — Musician'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/yeh-prem-mol-liya/ET00496261',
    tagLine: 'THE PRICE OF LOVE.', trailerId: 'vdhNar4uxm4', trailerLabel: 'OFFICIAL TRAILER · RAJSHRI PRODUCTIONS'
  },
  {
    slug: 'avengers-doomsday', title: 'AVENGERS: DOOMSDAY', tag: 'THE MARVEL EVENT', image: './images/doomsday-poster.webp', note: '17 DECEMBER 2026',
    genre: 'ACTION · ADVENTURE · FANTASY · SCI-FI', year: '2026', release: '17 December 2026', language: 'English, Hindi + 2 languages', format: '2D · 3D · Dolby Cinema 3D · EPIQ 3D and more', runtime: '2h 35m', certificate: 'UA16+', status: 'COMING SOON',
    synopsis: 'Three beloved heroes from distinct universes are pulled onto a collision course, and they must face an existential threat unlike anything they have met before.',
    cast: ['Robert Downey Jr.', 'Chris Hemsworth as Thor', 'Anthony Mackie as Sam Wilson / Captain America', 'Pedro Pascal as Reed Richards / Mr. Fantastic', 'Sebastian Stan as Bucky Barnes / Winter Soldier', 'Tom Hiddleston as Loki', 'Paul Rudd as Ant-Man', 'Vanessa Kirby as Sue Storm / The Invisible Woman', 'Wyatt Russell as John Walker / U.S. Agent', 'Ebon Moss-Bachrach as Ben Grimm / Thing', 'Joseph Quinn as Johnny Storm / Human Torch', 'Kelsey Grammer as Dr. Henry McCoy / Beast', 'David Harbour as Red Guardian', 'Letitia Wright as Shuri', 'Winston Duke as M’Baku', 'Tenoch Huerta as Namor'],
    crew: ['Joe Russo — Director', 'Anthony Russo — Director', 'Jack Kirby — Writer', 'Stan Lee — Writer', 'Jeffrey Ford — Editor'],
    bookMyShow: 'https://in.bookmyshow.com/movies/mumbai/avengers-doomsday/ET00439706',
    tagLine: 'ONE THREAT. EVERY UNIVERSE.', trailerId: 'fxNh27fRdYA', trailerLabel: 'OFFICIAL TRAILER · MARVEL STUDIOS'
  },
  {
    slug: 'dune-part-three', title: 'DUNE: PART THREE', tag: 'THE EPIC CONCLUSION', image: './images/dune-poster.webp', note: '18 DECEMBER 2026',
    genre: 'ACTION · ADVENTURE · DRAMA · SCI-FI', year: '2026', release: '18 December 2026', language: 'English, Hindi', format: '2D · IMAX 2D', runtime: '2h 30m (as shown in supplied reference)', certificate: 'PG-13 (as shown in supplied reference)', status: 'COMING SOON',
    synopsis: 'Set nearly two decades after Paul Atreides seized control of the Imperium, Emperor Paul must face the consequences of his reign as old allies return, terrifying new threats emerge, and betrayal lurks in every shadow. Haunted by visions of Imperial collapse and the reappearance of his long-lost love, Paul is drawn into a sweeping conspiracy, with Chani at the heart of its unfolding mystery.',
    cast: ['Timothée Chalamet as Paul Atreides', 'Zendaya as Chani', 'Florence Pugh as Princess Irulan Corrino', 'Javier Bardem as Stilgar', 'Rebecca Ferguson as Lady Jessica Atreides', 'Robert Pattinson', 'Jason Momoa', 'Charlotte Rampling', 'Anya Taylor-Joy'],
    crew: ['Denis Villeneuve — Director, Producer and Screenplay', 'Brian K. Vaughan — Screenplay', 'Mary Parent — Producer', 'Cale Boyter — Producer', 'Tanya Lapointe — Producer', 'Hans Zimmer — Musician'],
    bookMyShow: 'https://in.bookmyshow.com/movies/national-capital-region-ncr/dune-part-three/ET00491771',
    tagLine: 'THE EPIC CONCLUSION.', trailerId: 'okkQl4_nkRs', trailerLabel: 'OFFICIAL TRAILER · WARNER BROS. INDIA'
  },
]

const jailer2Film = {
  slug: 'jailer-2', title: 'JAILER 2', tag: 'GRAND RELEASE', image: './images/jailer2-poster.webp', note: '2026',
  genre: 'CRIME · ACTION · DRAMA · DARK COMEDY', year: '2026', release: '15 October 2026', language: 'Tamil, Telugu, Hindi, Malayalam, Kannada', format: '2D · IMAX', runtime: '2h 45m', certificate: 'UA16+', status: 'NOW STREAMING',
  synopsis: 'Jailer 2 follows retired jailer Tiger Muthuvel Pandian as he tries to lead a quiet life while secretly working against an idol-smuggling network. His plans are disrupted when criminal Dileep and syndicate leader Bodhi Kalpak begin searching for the person responsible for their former leader’s death. As the threats grow, Muthuvel must protect his family and take on the criminal network once again.',
  cast: ['Rajinikanth as Muthuvel “Tiger” Pandian', 'S. J. Suryah as Bodhi Kalpak', 'Mithun Chakraborty as Champaklal Chaubey', 'Suraj Venjaramoodu as Dileep', 'Ramya Krishnan as Vijayalakshmi “Viji” Pandian', 'Vidya Balan as Kantha'],
  crew: ['Nelson Dilipkumar — Director', 'Anirudh Ravichander — Music', 'Sun Pictures — Production'],
  bookMyShow: 'https://www.district.in/movies/jailer-2-movie-tickets-MV187766', tagLine: 'THE TIGER RETURNS.', trailerId: 'ugzPkXEqff4', trailerLabel: 'OFFICIAL DATE ANNOUNCEMENT TEASER · SUN PICTURES', streamingPlatform: 'PRIME VIDEO', streamingUrl: 'https://www.primevideo.com/'
}
const blockbusterFilms = [
  jailer2Film,
  {
    slug: 'dhurandhar-the-revenge', title: 'DHURANDHAR: THE REVENGE', tag: 'BLOCKBUSTER · STREAMING', image: './images/dhurandhar-revenge-poster.png', note: '19 MARCH 2026',
    genre: 'ACTION · CRIME · THRILLER', year: '2026', release: '19 March 2026', language: 'Hindi, Tamil, Telugu, Malayalam, Kannada', format: '2D · IMAX 2D · Dolby Cinema 2D', runtime: '3h 49m', certificate: 'A', status: 'NOW STREAMING',
    synopsis: 'Dhurandhar The Revenge introduces Jaskirat Singh Rangi, tracing the chain of events that compel him to become Hamza Ali Mazari, and follows his rise as he operates deep inside Pakistan. The spy-action thriller follows Hamza through a volatile world of gang warfare, institutional corruption and dangerous enemies.',
    cast: ['Ranveer Singh as Hamza Ali Mazari / Jaskirat Singh Rangi', 'Sanjay Dutt as SP Chaudhary Aslam', 'R. Madhavan as Ajay Sanyal', 'Arjun Rampal as Major Iqbal', 'Sara Arjun as Yalina Jamali', 'Rakesh Bedi as Jameel Jamali', 'Danish Pandor', 'Gaurav Gera'],
    crew: ['Aditya Dhar — Writer, Director & Producer', 'Jyoti Deshpande — Producer', 'Lokesh Dhar — Producer', 'Shashwat Sachdev — Music', 'Vikash Nowlakha — Cinematography', 'Shivkumar V. Panicker — Editor', 'Jio Studios — Studio', 'B62 Studios — Production House'],
    bookMyShow: 'https://in.bookmyshow.com/explore/movies', tagLine: 'THE STORY BEHIND THE LEGEND.', trailerId: 'Pb2KJlBGids', trailerLabel: 'OFFICIAL TRAILER · JIO STUDIOS',
    streamingPlatform: 'JIOHOTSTAR', streamingUrl: 'https://www.hotstar.com/in'
  },
  {
    slug: 'spider-man-brand-new-day', title: 'SPIDER-MAN: BRAND NEW DAY', tag: 'MARVEL · DIGITAL', image: './images/spiderman-brand-new-day-poster.png', note: '30 JULY 2026',
    genre: 'ACTION · ADVENTURE · SCI-FI', year: '2026', release: '30 July 2026', language: 'English, Hindi, Tamil, Telugu', format: '2D · 3D · IMAX', runtime: '2h 25m', certificate: 'UA13+', status: 'NOW ON DIGITAL',
    synopsis: 'It’s a BRAND NEW DAY for Peter Parker. Fighting crime full-time as Spider-Man in a world that doesn’t remember him — and the pressure of seeing his old friends move on without him — sparks a change in Peter that he may not have the power to control. That transformation might also be the only thing that can stop a shocking new threat to the city and those he loves.',
    cast: ['Tom Holland as Peter Parker / Spider-Man', 'Zendaya as MJ', 'Sadie Sink', 'Jacob Batalon as Ned Leeds', 'Jon Bernthal as Frank Castle / Punisher', 'Mark Ruffalo as Bruce Banner / Hulk', 'Tramell Tillman', 'Michael Mando'],
    crew: ['Destin Daniel Cretton — Director', 'Chris McKenna — Writer', 'Erik Sommers — Writer', 'Kevin Feige — Producer', 'Amy Pascal — Producer', 'Avi Arad — Producer'],
    bookMyShow: 'https://in.bookmyshow.com/explore/movies', tagLine: 'THE WORLD FORGOT HIM. HE NEVER FORGOT.', trailerId: '62bIsvRcPv0', trailerLabel: 'OFFICIAL TRAILER · SONY PICTURES',
    streamingPlatform: 'DIGITAL · PRIME VIDEO / APPLE TV', streamingUrl: 'https://www.sonypictures.com/movies/spidermanbrandnewday'
  },
  {
    slug: 'scene', title: 'SCENE', tag: 'IN CINEMAS', image: './images/scene-poster.png', note: '6 NOVEMBER 2026',
    genre: 'ACTION · COMEDY · CRIME · DRAMA', year: '2026', release: '6 November 2026', language: 'Tamil, Telugu, Malayalam', format: '2D · EPIQ · HDR by Barco · Dolby Cinema 2D', runtime: '2h 29m', certificate: 'UA16+', status: 'IN CINEMAS',
    synopsis: 'Inbaraj, a police officer, is forced to reopen a case he left unfinished years ago. This time, he must solve it with a chaotic and troublesome team. As they struggle to work together and deal with the twists and turns of the case, the investigation takes them on a chaotic and unpredictable ride.',
    cast: ['Suriya Sivakumar as Inbaraj', 'Nazriya Nazim as Maya', 'Naslen as Eeswaran', 'Anandaraj as Irudhayaraj', 'Lal', 'Raj Priyan'],
    crew: ['Jithu Madhavan — Writer & Director', 'Jyotika — Producer', 'Suriya — Producer', 'Sushin Shyam — Music', 'Vineeth Augustian — Cinematography', 'Ajmal Sabu — Editor', '2D Entertainment — Production', 'Zhagaram Studios — Production'],
    bookMyShow: 'https://in.bookmyshow.com/explore/movies', tagLine: 'ONE CASE. ONE CHAOTIC TEAM.', trailerId: 'LM4ByXufv2w', trailerLabel: 'OFFICIAL TRAILER · SONY MUSIC SOUTH',
    streamingPlatform: 'NETFLIX · EXPECTED 4 DECEMBER', streamingUrl: 'https://www.netflix.com/in/'
  },
  {
    slug: 'drishyam-the-conclusion', title: 'DRISHYAM: THE CONCLUSION', tag: 'THE FINAL CHAPTER', image: './images/drishyam-conclusion-poster.png', note: '2 OCTOBER 2026',
    genre: 'DRAMA · MYSTERY · THRILLER · CRIME', year: '2026', release: '2 October 2026', language: 'Hindi', format: '2D · IMAX 2D · EPIQ · Dolby Cinema 2D', runtime: '2h 28m', certificate: 'UA', status: 'COMING TO OTT',
    synopsis: 'Years after outsmarting the police, Vijay Salgaonkar and his family are once again caught in a tense battle to protect their carefully guarded secret. When Meera Deshmukh continues searching for answers about her missing son, the investigation takes a fresh turn with the involvement of a new Crime Branch officer. As new evidence threatens to unravel Vijay’s carefully constructed alibi, he must stay ahead of the law and protect his family.',
    cast: ['Ajay Devgn as Vijay Salgaonkar', 'Tabu as Meera Deshmukh', 'Shriya Saran as Nandini Salgaonkar', 'Ishita Dutta as Anju Salgaonkar', 'Jaideep Ahlawat as SP Rajveer Singh Tomar', 'Prakash Raj as Public Prosecutor Indrajith Shetty', 'Rajat Kapoor', 'Mrunal Jadhav'],
    crew: ['Abhishek Pathak — Director', 'Kumar Mangat Pathak — Producer', 'Ajit Andhare — Producer', 'Alok Jain — Producer', 'Aamil Keeyan Khan — Writer', 'Ravi Basrur — Music'],
    bookMyShow: 'https://in.bookmyshow.com/explore/movies', tagLine: 'EVERY SCENE HIDES A SECRET.', trailerId: 'fneuVQ7uO_w', trailerLabel: 'OFFICIAL TRAILER · STAR STUDIOS',
    streamingPlatform: 'NETFLIX · 27 NOVEMBER', streamingUrl: 'https://www.netflix.com/in/'
  }
]
const allFilms = [...cinemaFilms, ...blockbusterFilms]
// Keep every movie listing in ascending release-date order. Titles without a
// confirmed calendar date (currently Jailer 2) are placed after dated films.
const getReleaseTimestamp = (film: typeof allFilms[number]) => {
  const match = film.release.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/)
  if (!match) return Number.POSITIVE_INFINITY
  const timestamp = Date.parse(`${match[2]} ${match[1]}, ${match[3]}`)
  return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp
}
const filmsByReleaseDate = [...allFilms].sort((a, b) => getReleaseTimestamp(a) - getReleaseTimestamp(b) || a.title.localeCompare(b.title))
const heroFilms = [...cinemaFilms, jailer2Film].filter(film => film.slug !== 'yeh-prem-mol-liya')
const universeFilms = cinemaFilms
const posterWall = [...heroFilms, ...heroFilms]




function App() {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [activeFilm, setActiveFilm] = useState(() => allFilms.find(f => window.location.hash === `#/film/${f.slug}`) || null)
  useEffect(() => {
    const syncRoute = () => { setActiveFilm(allFilms.find(f => window.location.hash === `#/film/${f.slug}`) || null); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', syncRoute)
    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])
  useEffect(() => {
    if (!trailerOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setTrailerOpen(false) }
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [trailerOpen])
  useEffect(() => { setTrailerOpen(false) }, [activeFilm?.slug])
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
    <header className="topbar"><a href="#home" className="wordmark" onClick={closeMenu} aria-label="MMD Exclusive home"><span className="mmd-logo" aria-hidden="true">MMD</span><span className="wordmark-divider"/><span className="wordmark-name">EXCLUSIVE</span></a><nav className={menuOpen ? 'nav open' : 'nav'}><a href="#universe" onClick={closeMenu}>THE UNIVERSE</a><a href="#universe-films" onClick={closeMenu}>FILMS</a><a href="#blockbusters" onClick={closeMenu}>BLOCKBUSTERS</a><a href="#about" onClick={closeMenu}>OUR WORLD</a><a href="#contact" onClick={closeMenu}>CONTACT</a></nav><a className="top-cta" href="#universe-films">ENTER THE WORLD <ArrowUpRight size={14}/></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button></header>
    <main>
      {activeFilm ? <>
      <section className="film-detail" key={activeFilm.slug}>
        <div className="film-detail-backdrop" style={{ backgroundImage: `url(${activeFilm.image})` }} />
        <div className="film-detail-backdrop-wash" />
        <div className="film-detail-inner">
          <a className="film-back" href="#home"><ArrowDown size={15}/> ALL FILMS</a>
          <section className="film-trailer-feature" aria-label={`${activeFilm.title} film feature`} style={{ backgroundImage: `url(https://img.youtube.com/vi/${activeFilm.trailerId}/maxresdefault.jpg), url(https://img.youtube.com/vi/${activeFilm.trailerId}/hqdefault.jpg), url(${activeFilm.image})` }}>
            <div className="film-trailer-backdrop-overlay" />
            <div className="film-trailer-feature-main">
              <div className="film-detail-poster">
                <img src={activeFilm.image} alt={`${activeFilm.title} official poster`} decoding="async" fetchPriority="high" />
                <span className="film-poster-brand">MMD <b>EXCLUSIVE</b></span>
              </div>
              <div className="film-trailer-feature-copy">
                <span className="film-trailer-eyebrow"><i/> MMD EXCLUSIVE <b>·</b> FILM FILE / {activeFilm.year}</span>
                <h1>{activeFilm.title}</h1>
                <p className="film-trailer-tagline">{activeFilm.tagLine}</p>
                <div className="film-trailer-meta"><span>{activeFilm.release}</span><i/><span>{activeFilm.genre.split(' · ').slice(0, 3).join(' · ')}</span><i/><span>{activeFilm.status}</span></div>
                <div className="film-trailer-facts">
                  <div><span>RUNTIME</span><b>{activeFilm.runtime}</b></div>
                  <div><span>LANGUAGE</span><b>{activeFilm.language}</b></div>
                  <div><span>RATING</span><b>{activeFilm.certificate}</b></div>
                </div>
                <div className="film-trailer-actions film-booking-actions">
                  <a className="booking-button booking-button-bms" href={activeFilm.bookMyShow || 'https://in.bookmyshow.com/explore/movies'} target="_blank" rel="noopener noreferrer" aria-label={`Find ${activeFilm.title} tickets on BookMyShow`}>
                    <Ticket size={16}/><span>BOOK ON BOOKMYSHOW</span><ArrowUpRight size={15}/>
                  </a>
                  <a className="booking-button booking-button-district" href="https://www.district.in/movies/" target="_blank" rel="noopener noreferrer" aria-label={`Find ${activeFilm.title} tickets on District`}>
                    <Ticket size={16}/><span>BOOK ON DISTRICT</span><ArrowUpRight size={15}/>
                  </a>
                  {'streamingPlatform' in activeFilm && activeFilm.streamingPlatform && <a className="booking-button booking-button-ott" href={activeFilm.streamingUrl} target="_blank" rel="noopener noreferrer" aria-label={`Watch ${activeFilm.title} on ${activeFilm.streamingPlatform}`}>
                    <Play size={15}/><span>{activeFilm.streamingPlatform}</span><ArrowUpRight size={15}/>
                  </a>}
                  <a className="film-back-link" href="#home">EXPLORE MORE FILMS</a>
                </div>
              </div>
              <button className="film-trailer-play" type="button" onClick={() => setTrailerOpen(true)} aria-label={`Play ${activeFilm.title} film video`}>
                <span className="film-trailer-play-ring"><Play size={28} fill="currentColor"/></span>
                <span className="film-trailer-play-label">WATCH FILM VIDEO <ArrowUpRight size={15}/></span>
              </button>
            </div>
            <div className="film-trailer-feature-foot"><span>PRESS PLAY TO ENTER THE STORY</span><span>OFFICIAL VIDEO · YOUTUBE</span></div>
          </section>
        </div>
      </section>
      <section className="film-information section-pad">
        <div className="film-overview-block">
          <div className="film-section-heading"><span>01 / THE STORY</span><h2>OVERVIEW</h2></div>
          <div className="film-overview-content"><p>{activeFilm.synopsis}</p><div className="film-genre-tags">{activeFilm.genre.split(' · ').map(g => <span key={g}>{g}</span>)}</div></div>
        </div>
        <div className="film-cast-block">
          <div className="film-section-heading"><span>02 / THE PEOPLE</span><h2>CAST & CHARACTERS</h2></div>
          <div className="film-cast-rail" aria-label={`${activeFilm.title} cast`}>
            {activeFilm.cast.map((entry, index) => {
              const parts = entry.split(' as ')
              const actor = parts[0]
              const role = parts[1] || 'Cast'
              const initials = actor.split(/\s+/).filter(Boolean).slice(0, 2).map(n => n[0]).join('').toUpperCase()
              return <article className="film-cast-card" key={entry}>
                <div className={`film-cast-avatar avatar-${index % 6}`}><span>{initials}</span><small>0{index + 1}</small></div>
                <h3>{actor}</h3><p>{role}</p>
              </article>
            })}
          </div>
        </div>
        <div className="film-crew-block">
          <div className="film-section-heading"><span>03 / BEHIND THE FILM</span><h2>CREW & CREATORS</h2></div>
          <div className="film-crew-list">{activeFilm.crew.map((person, index) => { const [name, role] = person.split(' — '); return <div className="film-crew-item" key={person}><span>0{index + 1}</span><b>{name}</b><em>{role || 'CREW'}</em></div> })}</div>
        </div>
        <div className="film-detail-index">MMD CINEMA FILE <b>/{activeFilm.slug.toUpperCase()}</b><a href="#home">DISCOVER MORE FILMS <ArrowUpRight size={14}/></a></div>
      </section>
      </> : <>
      <section className="hero" id="home"><div className="hero-grid"/><div className="hero-glow"/><div className="hero-orb"><div className="orb-inner"/><span className="orb-label">MMD · EST. 2023</span></div><div className="hero-content"><div className="hero-kicker"><span className="live-dot"/> INDEPENDENT ENTERTAINMENT UNIVERSE <span className="kicker-line"/></div><h1 className="hero-title">A WORLD<br/><em>OF FILMS.</em></h1><p className="hero-copy">CINEMA. CULTURE. EXCLUSIVES.</p><div className="hero-actions"><a href="#universe-films" className="button-primary">EXPLORE FILMS <ArrowUpRight size={16}/></a><a href="#about" className="text-link"><span className="play-icon"><Play size={12} fill="currentColor"/></span> DISCOVER MMD</a></div></div><div className="poster-wall" aria-label="Featured movie posters"><div className="poster-track">{posterWall.map((p, i) => <a className="moving-poster" href={`#/film/${p.slug}`} key={`${p.slug}-${i}`} aria-label={`Open ${p.title} film page`}><img className="poster-image" src={p.image} alt={`${p.title} movie poster`} loading={i < 5 ? 'eager' : 'lazy'} decoding="async" /><div className="poster-shade"/><span className="poster-tag">{p.tag}</span><div className="poster-caption"><strong>{p.title}</strong><span className="poster-number">{p.note}</span></div></a>)}</div></div><div className="hero-side-note"><span>01 — 05</span><i/> THE MMD FILM COLLECTION</div><a className="scroll-cue" href="#universe"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a><div className="hero-index">MMD<span>®</span></div></section>
      <section className="manifesto section-pad" id="universe"><div className="section-label reveal"><span><br></br><br></br><br></br><br></br><br></br>01 — THE UNIVERSE</span><span><br></br><br></br><br></br><br></br>BUILT FOR THE CURIOUS</span></div><div className="universe-film-heading feature-heading reveal" id="universe-films"><h2>CURATED FOR<br/><em>THE BIG SCREEN.</em></h2><p>Perspectives, moments and stories<br/>from the world of entertainment.</p></div><div className="universe-film-rail reveal" aria-label="MMD Exclusive featured films">{universeFilms.map((film, index) => <a className="universe-film-card" href={`#/film/${film.slug}`} key={film.slug} aria-label={`Open ${film.title} film page`}><div className="universe-film-image"><img src={film.image} alt={`${film.title} official poster`} loading="lazy" decoding="async"/><span className="universe-film-index">0{index+1} / 05</span><span className="universe-film-open"><ArrowUpRight size={19}/></span></div><div className="universe-film-meta"><span>{film.tag}</span><span>{film.year}</span></div><h3>{film.title}</h3><p>{film.note}</p></a>)}</div><div className="manifesto-foot reveal"><span>THE ART OF LOOKING CLOSER</span><div className="foot-line"/><span>EST. MMXXIII</span></div></section>
      <section className="blockbusters-section section-pad" id="blockbusters"><br></br><br></br><br></br>
        <div className="section-label reveal"><span>02 — BLOCKBUSTERS</span><span>THE BIGGEST STORIES. THE BIGGEST SCREEN.</span></div>
        <div className="blockbusters-heading reveal"><span className="blockbusters-kicker">THE NEXT WAVE OF CINEMA</span><h2>A WORLD<br/><em>OF BLOCKBUSTERS.</em></h2></div>
        <div className="blockbuster-rail reveal" aria-label="MMD Exclusive blockbusters">
          {blockbusterFilms.map((film, index) => <a className={`blockbuster-card ${index === 0 ? 'blockbuster-featured' : ''}`} href={`#/film/${film.slug}`} key={film.slug} aria-label={`Open ${film.title} film page`}>
            <div className="blockbuster-poster"><img src={film.image} alt={`${film.title} official poster`} loading="lazy" decoding="async"/><span className="blockbuster-count">0{index + 1} / 05</span><span className="blockbuster-open"><ArrowUpRight size={20}/></span>{index === 0 && <span className="blockbuster-status">FEATURED BLOCKBUSTER</span>}</div>
            <div className="blockbuster-card-info"><span>{film.genre}</span><h3>{film.title}</h3><p>{film.note} <b>{film.year}</b></p></div>
          </a>)}
        </div>
        <div className="blockbusters-foot reveal"><span>MORE TITLES. MORE WORLDS.</span><i/><span>STAY TUNED <ArrowUpRight size={13}/></span></div>
      </section>
      <section className="topics-section section-pad" id="about"><br></br><br></br><br></br><br></br><div className="section-label reveal"><span>03 — OUR WORLD</span><span>ONE UNIVERSE. MANY ANGLES.</span></div><div className="topics-layout"><div className="topics-intro reveal"><h2>THE CULTURE<br/>IS <em>ALWAYS</em><br/>MOVING.</h2><p>We follow the stories shaping entertainment today — and the voices shaping what comes next.</p></div><div className="topic-list reveal">{topics.map((t, i) => <div className="topic-row" key={t}><span>0{i+1}</span><b>{t}</b><ArrowUpRight size={19}/></div>)}</div></div><div className="quote-panel reveal"><span className="quote-mark">“</span><p>Bringing you closer<br/>to the world of <em>cinema.</em></p><span className="quote-by">— THE MMD PROMISE</span></div></section>
      <section className="contact-section section-pad" id="contact"><div className="contact-orbit"/><br></br><br></br><br></br><div className="section-label reveal"><span>04 — STAY IN THE FRAME</span><span>THE NEXT CHAPTER STARTS HERE</span></div><div className="contact-content reveal"><span className="contact-kicker">THE MMD SIGNAL</span><h2>DON'T JUST<br/><em>HEAR ABOUT IT.</em><br/>BE THERE.</h2><p>Get closer to the stories, conversations and moments<br/>that make entertainment unforgettable.</p><form className="signup" onSubmit={submit}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" required placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)}/><button type="submit" aria-label="Subscribe"><Send size={17}/></button></form><span className="form-note">{subscribed ? 'YOU’RE ON THE LIST. WELCOME TO MMD.' : 'NO NOISE. JUST THE GOOD STUFF.'}</span></div></section>
      </>}
    </main>
    {activeFilm && trailerOpen && <div className="trailer-modal" role="dialog" aria-modal="true" aria-label={`${activeFilm.title} video player`} onMouseDown={() => setTrailerOpen(false)}>
      <div className="trailer-modal-shell" onMouseDown={event => event.stopPropagation()}>
        <div className="trailer-modal-top"><div><span className="trailer-modal-live"/><span>NOW PLAYING</span><b>{activeFilm.title} · {activeFilm.trailerLabel}</b></div><button type="button" onClick={() => setTrailerOpen(false)} aria-label="Close trailer player"><X size={22}/></button></div>
        <div className="trailer-modal-content">
          <div className="trailer-video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${activeFilm.trailerId}?autoplay=1&rel=0&modestbranding=1`} title={`${activeFilm.title} official video`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
          <aside className="trailer-video-library" aria-label={`${activeFilm.title} video library`}>
            <div className="trailer-library-heading"><span>THE FILM LIBRARY</span><b>MORE FROM THIS FILM</b><small>Explore official videos and related releases.</small></div>
            <a className="trailer-library-current" href={`https://www.youtube.com/watch?v=${activeFilm.trailerId}`} target="_blank" rel="noreferrer"><span className="trailer-library-thumb"><img src={`https://img.youtube.com/vi/${activeFilm.trailerId}/mqdefault.jpg`} alt=""/><i><Play size={13} fill="currentColor"/></i></span><span><b>{activeFilm.trailerLabel}</b><small>NOW PLAYING · OPEN VIDEO <ArrowUpRight size={11}/></small></span></a>
            {[
              ['Official teaser', 'official teaser'],
              ['Songs & soundtrack', 'official songs soundtrack'],
              ['Behind the scenes', 'behind the scenes making'],
              ['Cast interviews', 'cast interviews'],
              ['Promos & announcements', 'official promo announcement']
            ].map(([label, query]) => <a className="trailer-library-link" key={label} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${activeFilm.title} ${query}`)}`} target="_blank" rel="noreferrer"><span><Play size={12}/></span><b>{label}</b><ArrowUpRight size={13}/></a>)}
          </aside>
        </div>
        <div className="trailer-modal-bottom"><span>MMD EXCLUSIVE SCREENING ROOM <i/> VIDEO DIMENSIONS OPTIMIZED</span><a href={`https://www.youtube.com/watch?v=${activeFilm.trailerId}`} target="_blank" rel="noreferrer">OPEN ON YOUTUBE <ArrowUpRight size={14}/></a></div>
      </div>
    </div>}
    <footer className="footer"><div className="footer-top"><div className="footer-copy"><a href="#home" className="footer-brand"><span className="mmd-logo footer-mmd-logo">MMD</span><span className="wordmark-divider"/><span className="wordmark-name">EXCLUSIVE</span></a><p>Cinema. Conversations. Exclusives.<br/>Bringing you closer to the world of cinema.</p></div><div className="socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram/></a><a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube/></a><a href="https://x.com/mmddivyansh" target="_blank" rel="noreferrer" aria-label="X"><span className="x-social">𝕏</span></a></div></div><div className="footer-bottom"><span>© 2026 MMD EXCLUSIVE. ALL RIGHTS RESERVED.</span><span>MADE FOR THE LOVE OF CINEMA <span className="blue-dot">✳</span></span><a href="#home">BACK TO TOP ↑</a></div></footer>
  </div>
}
export default App
