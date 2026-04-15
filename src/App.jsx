import { useEffect, useMemo, useState } from "react";
import "./App.css";

const BOARD_SIZE = 20;
const COLUMN_COUNT = 5;
const ROW_COUNT = 4;
const FEATURED_POSITIONS = [4, 9, 14, 19];

const gamePool = [
  {
    id: "it-takes-two",
    name: "It Takes Two",
    genre: "Co-op adventure",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    blurb:
      "A playful co-op journey built around teamwork, timing, and shared wins.",
  },
  {
    id: "rocket-league",
    name: "Rocket League",
    genre: "Sports action",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
    blurb:
      "Quick matches, bold moves, and the kind of chaos that makes date night fun.",
  },
  {
    id: "minecraft",
    name: "Minecraft",
    genre: "Sandbox survival",
    image:
      "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=900&q=80",
    blurb:
      "Build a world together, wander for hours, and turn tiny ideas into shared memories.",
  },
  {
    id: "mario-kart",
    name: "Mario Kart",
    genre: "Party racing",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
    blurb:
      "Fast, colorful, competitive, and always ready to create an instant vibe.",
  },
  {
    id: "fall-guys",
    name: "Fall Guys",
    genre: "Party platformer",
    image:
      "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=900&q=80",
    blurb:
      "Cute chaos, easy laughs, and low-pressure fun that never feels too serious.",
  },
  {
    id: "stardew-valley",
    name: "Stardew Valley",
    genre: "Cozy simulation",
    image:
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
    blurb:
      "A calm, cozy pick for players who want to talk, relax, and build something sweet.",
  },
  {
    id: "fortnite",
    name: "Fortnite",
    genre: "Battle royale",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
    blurb:
      "Big energy, bold teamwork, and nonstop moments that keep the date alive.",
  },
  {
    id: "overcooked",
    name: "Overcooked",
    genre: "Co-op chaos",
    image:
      "https://images.unsplash.com/photo-1511882150382-421056c89033?auto=format&fit=crop&w=900&q=80",
    blurb:
      "Messy teamwork, funny mistakes, and a perfect way to test your chemistry.",
  },
];

const cellThemes = {
  1: { label: "Start", tone: "warm", detail: "Roll into the date" },
  2: { label: "Vibe Check", tone: "sun", detail: "Set the mood" },
  3: { label: "Quick Match", tone: "pink", detail: "Easy opener" },
  5: { label: "Flirty Round", tone: "berry", detail: "Playful energy" },
  6: { label: "Cozy Pick", tone: "cream", detail: "Slow and sweet" },
  7: { label: "Laugh Break", tone: "sun", detail: "Keep it light" },
  8: { label: "Duo Boost", tone: "warm", detail: "Team up" },
  10: { label: "Late Night", tone: "berry", detail: "Stay a little longer" },
  11: { label: "Voice Chat", tone: "cream", detail: "Talk while playing" },
  12: { label: "Mini Win", tone: "pink", detail: "Celebrate the moment" },
  13: { label: "Sweet Spot", tone: "sun", detail: "The vibe is working" },
  15: { label: "Pick Again", tone: "warm", detail: "One more round" },
  16: { label: "Date Mode", tone: "berry", detail: "More than a game" },
  17: { label: "Best Match", tone: "pink", detail: "Built for chemistry" },
  18: { label: "Glow Up", tone: "cream", detail: "Level up the night" },
  20: { label: "Finish", tone: "sun", detail: "Your winner is here" },
};

const boardRows = [
  [16, 17, 18, 19, 20],
  [15, 14, 13, 12, 11],
  [6, 7, 8, 9, 10],
  [5, 4, 3, 2, 1],
];

const experiences = [
  {
    title: "Game-first matchmaking",
    text: "Play Bae turns game taste into a fun way to discover your next shared experience.",
  },
  {
    title: "Built for online dates",
    text: "Use quick picks, cute prompts, and co-op energy to break awkward silences fast.",
  },
  {
    title: "Random but useful",
    text: "The board keeps it playful while still landing on a real recommendation you can use.",
  },
];

const steps = [
  "Roll the board to move across 20 playful spaces.",
  "Land on one of the 4 game-image tiles picked for this round.",
  "Use the game details to start your Play Bae date instantly.",
];

const cafeHighlights = [
  {
    title: "Board Games",
    text: "Huge collection of fun games for casual hangs, date nights, and group play.",
  },
  {
    title: "Food",
    text: "Delicious snacks, meals, and drinks to keep the vibe going for hours.",
  },
  {
    title: "Art & Events",
    text: "Workshops, creative sessions, and events that make Play Bae more than a cafe.",
  },
];

const contactCards = [
  {
    title: "Phone",
    value: "+91 73389 98726",
    href: "tel:+917338998726",
  },
  {
    title: "Instagram",
    value: "@playbae.cafe",
    href: "https://instagram.com/playbae",
  },
  {
    title: "Email",
    value: "playbae@gmail.com",
    href: "mailto:playbae@gmail.com",
  },
  {
    title: "Timing",
    value: "11 AM - 11 PM",
  },
];

function shuffleGames() {
  return [...gamePool]
    .sort(() => Math.random() - 0.5)
    .slice(0, FEATURED_POSITIONS.length)
    .map((game, index) => ({
      ...game,
      position: FEATURED_POSITIONS[index],
    }));
}

function getDiceFace(value) {
  return ["", "\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"][value] || "\u2680";
}

function getBoardPath() {
  const cells = [];

  boardRows.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      cells.push({
        cell,
        x: columnIndex * 100 + 50,
        y: rowIndex * 100 + 50,
      });
    });
  });

  return cells
    .sort((left, right) => left.cell - right.cell)
    .map(({ x, y }) => `${x},${y}`)
    .join(" ");
}

export default function App() {
  const [position, setPosition] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [travelPath, setTravelPath] = useState([]);
  const [rollStep, setRollStep] = useState(0);
  const [totalRollSteps, setTotalRollSteps] = useState(0);
  const [featuredGames, setFeaturedGames] = useState(() => shuffleGames());
  const [statusText, setStatusText] = useState(
    "Roll the dice and let Play Bae pick the game vibe."
  );

  const gameByPosition = useMemo(
    () =>
      featuredGames.reduce((map, game) => {
        map[game.position] = game;
        return map;
      }, {}),
    [featuredGames]
  );

  const activeGame = gameByPosition[position];
  const boardPath = useMemo(() => getBoardPath(), []);
  const boardProgress = ((position - 1) / (BOARD_SIZE - 1)) * 100;

  useEffect(() => {
    if (!travelPath.length) {
      return undefined;
    }

    const progress =
      totalRollSteps > 1 ? rollStep / (totalRollSteps - 1) : 1;
    const stepDelay = Math.round(110 + progress * progress * 420);

    const timer = window.setTimeout(() => {
      const [nextStep, ...remainingSteps] = travelPath;
      setPosition(nextStep);
      setTravelPath(remainingSteps);
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      setRollStep((currentStep) => currentStep + 1);

      if (!remainingSteps.length) {
        setIsRolling(false);
        setRollStep(0);
        setTotalRollSteps(0);
        setDiceValue(Math.max(1, nextStep - position));
        if (gameByPosition[nextStep]) {
          setStatusText(`You landed on ${gameByPosition[nextStep].name}.`);
        } else {
          setStatusText(
            `You stopped on ${cellThemes[nextStep]?.label || `Space ${nextStep}`}.`
          );
        }
      }
    }, stepDelay);

    return () => window.clearTimeout(timer);
  }, [travelPath, gameByPosition, rollStep, position, totalRollSteps]);

  const rollDice = () => {
    if (isRolling || position === BOARD_SIZE) {
      return;
    }

    const nextDiceValue = Math.floor(Math.random() * 6) + 1;
    const targetPosition = Math.min(position + nextDiceValue, BOARD_SIZE);
    const path = [];

    for (let step = position + 1; step <= targetPosition; step += 1) {
      path.push(step);
    }

    setDiceValue(nextDiceValue);
    setIsRolling(true);
    setRollStep(0);
    setTotalRollSteps(path.length);
    setStatusText(`Rolling ${nextDiceValue} spaces... follow the token.`);
    setTravelPath(path);
  };

  const resetBoard = () => {
    setPosition(1);
    setIsRolling(false);
    setTravelPath([]);
    setRollStep(0);
    setTotalRollSteps(0);
    setDiceValue(1);
    setFeaturedGames(shuffleGames());
    setStatusText("Fresh board loaded. Roll again for a new Play Bae pick.");
  };

  return (
    <main className="site-shell">
      <section className="hero-section">
        <header className="topbar">
          <div className="brand">
            <span className="brand-mark">PB</span>
            <div>
              <strong>Play Bae</strong>
              <span>Games for better dates</span>
            </div>
          </div>

          <nav className="nav-links" aria-label="Primary">
            <a href="#board">Board</a>
            <a href="#cafe">Cafe</a>
            <a href="#how">How It Works</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <div className="hero-grid">
          <div className="hero-copy hero-copy-main">
            <p className="eyebrow">Play Bae Experience</p>
            <h1>Play. Eat. Chill. Find your next game.</h1>
            <p className="hero-text">
              Play Bae is a game cafe experience with food, art, events, and a
              playful board that helps you pick what to play next. Roll the
              dice, stop on a space, and let the board decide the vibe.
            </p>

            <div className="hero-actions">
              <a className="primary-link" href="#board">
                Try the board
              </a>
              <a className="secondary-link" href="#cafe">
                Visit the cafe
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>4 random picks</strong>
                <span>Every board shows a fresh set of game options.</span>
              </div>
              <div>
                <strong>20 styled spaces</strong>
                <span>No empty squares, every stop keeps the experience alive.</span>
              </div>
              <div>
                <strong>1 final result</strong>
                <span>Wherever the token lands becomes the selected game.</span>
              </div>
            </div>
          </div>

          <div className="hero-card">
            <p className="mini-label">Tonight's Mood</p>
            <h2>Board games, food, art, and events under one roof.</h2>
            <p>
              Built from your real Play Bae cafe vibe while keeping the
              snakes-and-ladders game picker in the experience.
            </p>
            <div className="mood-pills">
              <span>Co-op</span>
              <span>Food</span>
              <span>Party</span>
              <span>Art</span>
              <span>Events</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-strip">
        {experiences.map((item) => (
          <article key={item.title} className="feature-card">
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="board-section" id="board">
        <div className="section-heading">
          <p className="eyebrow">Interactive Board</p>
          <h2>Roll the Play Bae board</h2>
        </div>

        <div className="board-layout">
          <div className="board-panel">
            <div className="board-panel-top">
              <div>
                <div className="board-title">Snakes &amp; Ladders</div>
                <p className="board-subtitle">
                  Stop on a game-image tile and that becomes your date-night pick.
                </p>
              </div>

              <div className="control-cluster">
                <div className={`dice-card ${isRolling ? "rolling" : ""}`}>
                  <span className="dice-label">Dice</span>
                  <span className="dice-face" aria-live="polite">
                    {getDiceFace(diceValue)}
                  </span>
                  <span className="dice-value">
                    {isRolling ? "Token is moving..." : `Move ${diceValue} spaces`}
                  </span>
                </div>

                <div className="button-row">
                  <button type="button" onClick={rollDice} disabled={isRolling}>
                    {isRolling ? "Rolling..." : "Roll Dice"}
                  </button>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={resetBoard}
                  >
                    New Games
                  </button>
                </div>
              </div>
            </div>

            <p className="status-pill">{statusText}</p>

            <div className="board-frame">
              <div className="board-progress">
                <div
                  className="board-progress-fill"
                  style={{ width: `${boardProgress}%` }}
                />
              </div>

              <svg
                className="board-paths board-flow"
                viewBox={`0 0 ${COLUMN_COUNT * 100} ${ROW_COUNT * 100}`}
                aria-hidden="true"
              >
                <polyline className="flow-shadow" points={boardPath} />
                <polyline className="flow-line" points={boardPath} />
                <polyline className="flow-dots" points={boardPath} />
                <path className="snake-path" d="M120 330C165 280 210 325 250 250C285 185 230 170 210 120C190 78 245 35 320 55" />
                <path className="ladder-rail" d="M355 330L445 150" />
                <path className="ladder-rail" d="M330 318L420 138" />
                <path className="ladder-rung" d="M336 304L362 316" />
                <path className="ladder-rung" d="M353 270L379 282" />
                <path className="ladder-rung" d="M370 236L396 248" />
                <path className="ladder-rung" d="M387 202L413 214" />
                <path className="ladder-rung" d="M404 168L430 180" />
              </svg>

              <div className="flow-note">
                <span>Start on 1</span>
                <span>{isRolling ? "Rolling with slow finish" : "Follow the playful path"}</span>
                <span>Finish on 20</span>
              </div>

              <div className="board-grid">
                {boardRows.flat().map((cell) => {
                  const game = gameByPosition[cell];
                  const theme = cellThemes[cell];
                  const isCurrent = cell === position;

                  return (
                    <article
                      key={cell}
                      className={`cell tone-${theme?.tone || "warm"} ${
                        game ? "game-cell" : ""
                      } ${isCurrent ? "current-cell" : ""}`}
                    >
                      <span className="cell-number">{cell}</span>

                      {game ? (
                        <div className="game-chip">
                          <img src={game.image} alt={game.name} />
                          <strong>{game.name}</strong>
                          <span>{game.genre}</span>
                        </div>
                      ) : (
                        <div className="cell-copy">
                          <strong>{theme.label}</strong>
                          <span>{theme.detail}</span>
                        </div>
                      )}

                      {isCurrent ? <span className="token" /> : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="detail-panel" id="games">
            <div className="detail-header">
              <p className="eyebrow">Current Stop</p>
              <h2>{activeGame ? activeGame.name : cellThemes[position]?.label}</h2>
            </div>

            {activeGame ? (
              <div className="game-detail-card">
                <img
                  className="detail-image"
                  src={activeGame.image}
                  alt={activeGame.name}
                />
                <div className="detail-copy">
                  <p className="genre-tag">{activeGame.genre}</p>
                  <p>{activeGame.blurb}</p>
                  <p>
                    The token stopped on position {position}, so this is the game
                    Play Bae picked for the date.
                  </p>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <strong>{cellThemes[position]?.label}</strong>
                <p>{cellThemes[position]?.detail}</p>
                <p>Keep rolling until you land on one of the 4 game-photo spaces.</p>
              </div>
            )}

            <div className="legend">
              <p className="legend-title">This round's game picks</p>
              <div className="legend-list">
                {featuredGames.map((game) => (
                  <div key={game.id} className="legend-item">
                    <img src={game.image} alt={game.name} />
                    <div>
                      <strong>{game.name}</strong>
                      <span>Position {game.position}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="cafe-section" id="cafe">
        <div className="section-heading">
          <p className="eyebrow">Play Bae Cafe</p>
          <h2>Why choose us?</h2>
        </div>

        <div className="cafe-hero">
          <div className="cafe-overlay">
            <h3>Play Bae Cafe</h3>
            <p>Board Games | Food | Art | Events</p>
            <div className="hero-actions">
              <a className="primary-link" href="#contact">
                Contact Us
              </a>
              <a className="secondary-link" href="#board">
                Explore Games
              </a>
            </div>
          </div>
        </div>

        <div className="cards-grid">
          {cafeHighlights.map((item) => (
            <article key={item.title} className="feature-card cafe-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div className="visit-card">
          <div>
            <p className="eyebrow">Visit Us</p>
            <h3>Thoraipakkam, Chennai</h3>
          </div>
          <p>Open every day from 11 AM - 11 PM</p>
        </div>
      </section>

      <section className="info-section" id="how">
        <div className="section-heading">
          <p className="eyebrow">How It Works</p>
          <h2>Simple enough for a first click</h2>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <article key={step} className="step-card">
              <span className="step-badge" />
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-heading">
          <p className="eyebrow">Contact Play Bae</p>
          <h2>Come visit, play and chill with us</h2>
        </div>

        <div className="contact-layout">
          <div className="contact-stack">
            {contactCards.map((item) => {
              const content = (
                <article key={item.title} className="contact-card">
                  <h3>{item.title}</h3>
                  <p>{item.value}</p>
                </article>
              );

              return item.href ? (
                <a key={item.title} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                  {content}
                </a>
              ) : (
                content
              );
            })}
          </div>

          <div className="map-card">
            <iframe
              title="Play Bae map"
              src="https://www.google.com/maps?q=Play%20Bae&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div>
          <p className="eyebrow">Play Bae</p>
          <h2>Make picking a game feel like part of the date.</h2>
        </div>
        <a className="primary-link" href="#board">
          Roll again
        </a>
      </section>

      <footer className="site-footer">
        <p>© 2026 Play Bae Cafe</p>
      </footer>
    </main>
  );
}
