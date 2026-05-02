/**
 * SlideCraft Component Forge (P6) — Sprint 1+2+3
 * 
 * Drop-in module that registers animated slide types:
 *   Sprint 1: word-cascade, box-reveal, bullet-build
 *   Sprint 2: line-chart, comparison, timeline-vertical
 *   Sprint 3: progress-ring, number-wall, bar-race
 *
 * Usage: Add <script src="modules/component-forge/component-forge.js"></script>
 *        to any SlideCraft shell.html
 * 
 * Zero-dependency. Monkey-patches slideTypeRegistry.
 */
(function() {
    'use strict';

    // ===== INJECT CSS =====
    const style = document.createElement('style');
    style.textContent = `
        /* ===== WORD CASCADE ===== */
        @keyframes wordDrop {
            0% { opacity: 0; transform: translateY(-28px) scale(0.95); }
            60% { opacity: 1; transform: translateY(4px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes wordLand {
            0% { opacity: 0; transform: translateY(-28px) scale(0.95); }
            50% { opacity: 1; transform: translateY(6px) scale(1.08); }
            70% { transform: translateY(-2px) scale(1.02); }
            100% { opacity: 1; transform: translateY(0) scale(1); text-shadow: 0 0 30px var(--accent, #f97316); }
        }
        .slide-word-cascade {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            gap: 0.4em;
            padding: 2rem;
            min-height: 60vh;
        }
        .slide-word-cascade .wc-word {
            font-size: clamp(2rem, 5vw, 4.5rem);
            font-weight: 700;
            color: var(--text, #f1f5f9);
            opacity: 0;
            display: inline-block;
        }
        .slide-word-cascade .wc-word.wc-emphasis {
            color: var(--accent, #f97316);
            font-style: italic;
        }

        /* ===== BOX REVEAL ===== */
        @keyframes boxBounce {
            0% { opacity: 0; transform: scale(0) rotate(-5deg); }
            50% { opacity: 1; transform: scale(1.08) rotate(1deg); }
            70% { transform: scale(0.97) rotate(-0.5deg); }
            100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes shimmerBorder {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .slide-box-reveal {
            padding: 2rem;
        }
        .slide-box-reveal h2 {
            text-align: center;
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            margin-bottom: 2rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-box-reveal .br-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            max-width: 1000px;
            margin: 0 auto;
        }
        .slide-box-reveal .br-box {
            background: var(--card-bg, #2a2a2a);
            border: 1px solid var(--border, rgba(255,255,255,0.15));
            border-radius: 16px;
            padding: 1.8rem 1.5rem;
            text-align: center;
            opacity: 0;
            position: relative;
            overflow: hidden;
        }
        .slide-box-reveal .br-box::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 16px;
            padding: 1px;
            background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            background-size: 200% 100%;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            animation: shimmerBorder 4s ease-in-out infinite;
            pointer-events: none;
        }
        .slide-box-reveal .br-icon {
            font-size: 2.5rem;
            margin-bottom: 0.8rem;
            display: block;
        }
        .slide-box-reveal .br-icon-img {
            width: 48px;
            height: 48px;
            object-fit: contain;
            margin: 0 auto 0.8rem;
            display: block;
        }
        .slide-box-reveal .br-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--accent, #f97316);
            margin-bottom: 0.5rem;
        }
        .slide-box-reveal .br-text {
            font-size: 0.95rem;
            color: var(--text-muted, rgba(255,255,255,0.7));
            line-height: 1.5;
        }

        /* ===== BULLET BUILD ===== */
        @keyframes bulletSlide {
            0% { opacity: 0; transform: translateX(-30px); }
            60% { opacity: 1; transform: translateX(4px); }
            100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes dotPop {
            0% { transform: scale(0); }
            60% { transform: scale(1.4); }
            100% { transform: scale(1); }
        }
        .slide-bullet-build {
            padding: 2rem 3rem;
            max-width: 900px;
            margin: 0 auto;
        }
        .slide-bullet-build h2 {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            margin-bottom: 2rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-bullet-build .bb-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .slide-bullet-build .bb-item {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            padding: 0.8rem 0;
            font-size: clamp(1.1rem, 2.2vw, 1.6rem);
            color: var(--text, #f1f5f9);
            opacity: 0;
            border-bottom: 1px solid var(--border, rgba(255,255,255,0.08));
        }
        .slide-bullet-build .bb-item:last-child {
            border-bottom: none;
        }
        .slide-bullet-build .bb-dot {
            width: 12px;
            height: 12px;
            min-width: 12px;
            border-radius: 50%;
            background: var(--accent, #f97316);
            margin-top: 0.45em;
            opacity: 0;
        }
        .slide-bullet-build .bb-item.bb-emphasis {
            color: var(--accent, #f97316);
            font-weight: 600;
        }
        .slide-bullet-build .bb-subtitle {
            font-size: 0.85em;
            color: var(--text-muted, rgba(255,255,255,0.6));
            margin-top: 0.3rem;
            display: block;
        }

        /* ===== LINE CHART ===== */
        .slide-line-chart {
            padding: 2rem;
            max-width: 900px;
            margin: 0 auto;
        }
        .slide-line-chart h2 {
            text-align: center;
            font-size: clamp(1.3rem, 2.5vw, 2rem);
            margin-bottom: 1.5rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-line-chart .lc-chart {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
        }
        .slide-line-chart svg {
            width: 100%;
            height: 100%;
        }
        .slide-line-chart .lc-axis-label {
            fill: var(--text-muted, rgba(255,255,255,0.5));
            font-size: 12px;
            font-family: inherit;
        }
        .slide-line-chart .lc-grid-line {
            stroke: var(--border, rgba(255,255,255,0.1));
            stroke-width: 1;
        }
        .slide-line-chart .lc-data-line {
            fill: none;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-linejoin: round;
        }
        @keyframes drawLine {
            to { stroke-dashoffset: 0; }
        }
        .slide-line-chart .lc-dot {
            opacity: 0;
        }
        @keyframes dotAppear {
            0% { opacity: 0; r: 0; }
            60% { opacity: 1; r: 6; }
            100% { opacity: 1; r: 4.5; }
        }
        .slide-line-chart .lc-legend {
            display: flex;
            justify-content: center;
            gap: 2rem;
            margin-top: 1rem;
            opacity: 0;
            animation: wordDrop 0.5s ease 2.5s forwards;
        }
        .slide-line-chart .lc-legend-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.9rem;
            color: var(--text-muted, rgba(255,255,255,0.7));
        }
        .slide-line-chart .lc-legend-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
        }

        /* ===== COMPARISON ===== */
        @keyframes slideFromLeft {
            from { opacity: 0; transform: translateX(-60px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideFromRight {
            from { opacity: 0; transform: translateX(60px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes highlightPulse {
            0%, 100% { background: rgba(var(--accent-rgb, 249,115,22), 0.08); }
            50% { background: rgba(var(--accent-rgb, 249,115,22), 0.18); }
        }
        .slide-comparison {
            padding: 2rem;
            max-width: 950px;
            margin: 0 auto;
        }
        .slide-comparison h2 {
            text-align: center;
            font-size: clamp(1.4rem, 2.8vw, 2.2rem);
            margin-bottom: 2rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-comparison .cmp-grid {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            gap: 0;
            align-items: stretch;
        }
        .slide-comparison .cmp-col {
            opacity: 0;
            padding: 1.5rem;
        }
        .slide-comparison .cmp-col.cmp-left {
            animation: slideFromLeft 0.7s ease 0.3s forwards;
        }
        .slide-comparison .cmp-col.cmp-right {
            animation: slideFromRight 0.7s ease 0.5s forwards;
        }
        .slide-comparison .cmp-divider {
            width: 2px;
            background: linear-gradient(180deg, transparent, var(--accent, #f97316), transparent);
            opacity: 0;
            animation: wordDrop 0.5s ease 0.4s forwards;
        }
        .slide-comparison .cmp-label {
            font-size: 1.1rem;
            font-weight: 700;
            color: var(--accent, #f97316);
            margin-bottom: 1.2rem;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }
        .slide-comparison .cmp-item {
            padding: 0.8rem 1rem;
            margin-bottom: 0.6rem;
            border-radius: 10px;
            font-size: clamp(0.95rem, 1.8vw, 1.2rem);
            color: var(--text, #f1f5f9);
            background: var(--card-bg, #2a2a2a);
            border: 1px solid var(--border, rgba(255,255,255,0.1));
            transition: background 0.3s;
        }
        .slide-comparison .cmp-item.cmp-highlight {
            border-color: var(--accent, #f97316);
            animation: highlightPulse 3s ease-in-out 1.5s infinite;
        }

        /* ===== TIMELINE VERTICAL ===== */
        @keyframes drawDown {
            from { height: 0; }
            to { height: 100%; }
        }
        @keyframes nodePopIn {
            0% { opacity: 0; transform: scale(0) translateX(-50%); }
            60% { opacity: 1; transform: scale(1.15) translateX(-50%); }
            100% { opacity: 1; transform: scale(1) translateX(-50%); }
        }
        .slide-timeline-v {
            padding: 2rem;
            max-width: 750px;
            margin: 0 auto;
        }
        .slide-timeline-v h2 {
            text-align: center;
            font-size: clamp(1.3rem, 2.5vw, 2rem);
            margin-bottom: 2rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-timeline-v .tv-track {
            position: relative;
            padding-left: 40px;
            min-height: 300px;
        }
        .slide-timeline-v .tv-line {
            position: absolute;
            left: 14px;
            top: 0;
            width: 3px;
            height: 0;
            background: linear-gradient(180deg, var(--accent, #f97316), var(--accent2, #a855f7));
            border-radius: 2px;
            animation: drawDown 2s ease 0.3s forwards;
        }
        .slide-timeline-v .tv-node {
            position: relative;
            padding: 0.8rem 0 1.5rem 1.5rem;
            opacity: 0;
        }
        .slide-timeline-v .tv-dot {
            position: absolute;
            left: -33px;
            top: 0.9rem;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: var(--accent, #f97316);
            border: 3px solid var(--bg, #000);
            opacity: 0;
        }
        .slide-timeline-v .tv-year {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--accent, #f97316);
            letter-spacing: 0.05em;
            margin-bottom: 0.3rem;
        }
        .slide-timeline-v .tv-text {
            font-size: clamp(1rem, 1.8vw, 1.2rem);
            color: var(--text, #f1f5f9);
            line-height: 1.5;
        }
        .slide-timeline-v .tv-sub {
            font-size: 0.85rem;
            color: var(--text-muted, rgba(255,255,255,0.6));
            margin-top: 0.2rem;
        }

        /* ===== PROGRESS RING ===== */
        @keyframes ringFill {
            to { stroke-dashoffset: var(--ring-target); }
        }
        .slide-progress-ring {
            padding: 2rem;
            text-align: center;
        }
        .slide-progress-ring h2 {
            font-size: clamp(1.3rem, 2.5vw, 2rem);
            margin-bottom: 1.5rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-progress-ring .pr-wrap {
            position: relative;
            display: inline-block;
        }
        .slide-progress-ring svg {
            transform: rotate(-90deg);
        }
        .slide-progress-ring .pr-bg {
            fill: none;
            stroke: var(--surface, #1a1a1a);
            stroke-width: 12;
        }
        .slide-progress-ring .pr-fg {
            fill: none;
            stroke-width: 12;
            stroke-linecap: round;
        }
        .slide-progress-ring .pr-center {
            position: absolute;
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
        }
        .slide-progress-ring .pr-value {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 700;
            color: var(--text, #f1f5f9);
            line-height: 1;
        }
        .slide-progress-ring .pr-unit {
            font-size: 0.4em;
            color: var(--text-muted, rgba(255,255,255,0.6));
        }
        .slide-progress-ring .pr-subtitle {
            font-size: 0.95rem;
            color: var(--text-muted, rgba(255,255,255,0.6));
            margin-top: 1rem;
            opacity: 0;
            animation: wordDrop 0.5s ease 2.5s forwards;
        }

        /* ===== NUMBER WALL ===== */
        .slide-number-wall {
            padding: 2rem;
        }
        .slide-number-wall h2 {
            text-align: center;
            font-size: clamp(1.3rem, 2.5vw, 2rem);
            margin-bottom: 2rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-number-wall .nw-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1.5rem;
            max-width: 900px;
            margin: 0 auto;
        }
        .slide-number-wall .nw-cell {
            text-align: center;
            padding: 1.5rem 1rem;
            background: var(--card-bg, #2a2a2a);
            border: 1px solid var(--border, rgba(255,255,255,0.1));
            border-radius: 16px;
            opacity: 0;
        }
        .slide-number-wall .nw-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
            display: block;
        }
        .slide-number-wall .nw-icon-img {
            width: 36px;
            height: 36px;
            object-fit: contain;
            margin: 0 auto 0.5rem;
            display: block;
        }
        .slide-number-wall .nw-value {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
            font-weight: 700;
            color: var(--accent, #f97316);
            line-height: 1.1;
        }
        .slide-number-wall .nw-label {
            font-size: 0.9rem;
            color: var(--text-muted, rgba(255,255,255,0.6));
            margin-top: 0.3rem;
        }

        /* ===== BAR RACE ===== */
        @keyframes barGrow {
            from { width: 0; }
        }
        @keyframes barPulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(var(--bar-rgb, 255,255,255), 0.3); }
            50% { box-shadow: 0 0 12px 4px rgba(var(--bar-rgb, 255,255,255), 0.15); }
        }
        .slide-bar-race {
            padding: 2rem 3rem;
            max-width: 850px;
            margin: 0 auto;
        }
        .slide-bar-race h2 {
            text-align: center;
            font-size: clamp(1.3rem, 2.5vw, 2rem);
            margin-bottom: 2rem;
            opacity: 0;
            animation: wordDrop 0.6s ease 0.1s forwards;
        }
        .slide-bar-race .brc-row {
            display: grid;
            grid-template-columns: 120px 1fr 50px;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 0.8rem;
            opacity: 0;
        }
        .slide-bar-race .brc-label {
            font-size: clamp(0.85rem, 1.5vw, 1.05rem);
            color: var(--text, #f1f5f9);
            text-align: right;
            font-weight: 600;
        }
        .slide-bar-race .brc-track {
            height: 32px;
            background: var(--surface, #1a1a1a);
            border-radius: 8px;
            overflow: hidden;
            position: relative;
        }
        .slide-bar-race .brc-bar {
            height: 100%;
            border-radius: 8px;
            position: relative;
        }
        .slide-bar-race .brc-val {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--text-muted, rgba(255,255,255,0.6));
        }
        .slide-bar-race .brc-row.brc-leader .brc-val {
            color: var(--accent, #f97316);
        }

        /* ===== SHARED: Slide active overrides ===== */
        .slide-word-cascade,
        .slide-box-reveal,
        .slide-bullet-build,
        .slide-line-chart,
        .slide-comparison,
        .slide-timeline-v,
        .slide-progress-ring,
        .slide-number-wall,
        .slide-bar-race {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 70vh;
        }
        .slide-word-cascade {
            flex-direction: row;
            flex-wrap: wrap;
            align-content: center;
        }
    `;
    document.head.appendChild(style);

    // ===== REGISTER SLIDE TYPES =====

    /**
     * word-cascade: Words that drop into place
     * JSON: { type: "word-cascade", words: ["Every","student","deserves","to","be","*seen*"], speed: 200, finalPause: true }
     */
    function renderWordCascade(s) {
        const speed = s.speed || 200;
        const words = (s.words || []).map((w, i) => {
            const isEmphasis = w.startsWith('*') && w.endsWith('*');
            const cleanWord = isEmphasis ? w.slice(1, -1) : w;
            const isLast = i === (s.words || []).length - 1;
            const animName = (isEmphasis || (s.finalPause && isLast)) ? 'wordLand' : 'wordDrop';
            const cls = isEmphasis ? 'wc-word wc-emphasis' : 'wc-word';
            return `<span class="${cls}" style="animation: ${animName} 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * speed}ms forwards">${cleanWord}</span>`;
        }).join('');

        return `<div class="slide-word-cascade">${words}</div>`;
    }

    /**
     * box-reveal: Boxes that bounce in with glassmorphism borders
     * JSON: { type: "box-reveal", title: "...",
     *         boxes: [{ title: "...", text: "...", icon: "optional emoji", iconSrc: "optional/path.png" }, ...] }
     */
    function renderBoxReveal(s) {
        const boxes = (s.boxes || []).map((box, i) => {
            let iconHTML = '';
            if (box.iconSrc) {
                iconHTML = `<img class="br-icon-img" src="${box.iconSrc}" alt="${box.title || ''}">`;
            } else if (box.icon) {
                iconHTML = `<span class="br-icon">${box.icon}</span>`;
            }
            return `
            <div class="br-box" style="animation: boxBounce 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${300 + i * 250}ms forwards">
                ${iconHTML}
                <div class="br-title">${box.title || ''}</div>
                <div class="br-text">${box.text || ''}</div>
            </div>
        `;
        }).join('');

        return `
            <div class="slide-box-reveal">
                <h2>${s.title || ''}</h2>
                <div class="br-grid">${boxes}</div>
            </div>
        `;
    }

    /**
     * bullet-build: Progressive bullet point reveals
     * JSON: { type: "bullet-build", title: "...", items: ["Point 1", "*Emphasis point*", "Point with|subtitle"], auto: true, interval: 800 }
     */
    function renderBulletBuild(s) {
        const interval = s.interval || 600;
        const items = (s.items || []).map((item, i) => {
            const isEmphasis = item.startsWith('*') && item.endsWith('*');
            let text = isEmphasis ? item.slice(1, -1) : item;
            let subtitle = '';
            
            // Support "Main text|Subtitle" format
            if (text.includes('|')) {
                const parts = text.split('|');
                text = parts[0];
                subtitle = parts[1];
            }
            
            const cls = isEmphasis ? 'bb-item bb-emphasis' : 'bb-item';
            const delay = 400 + i * interval;
            
            return `
                <li class="${cls}" style="animation: bulletSlide 0.5s ease ${delay}ms forwards">
                    <span class="bb-dot" style="animation: dotPop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay - 100}ms forwards"></span>
                    <span>
                        ${text}
                        ${subtitle ? `<span class="bb-subtitle">${subtitle}</span>` : ''}
                    </span>
                </li>
            `;
        }).join('');

        return `
            <div class="slide-bullet-build">
                <h2>${s.title || ''}</h2>
                <ul class="bb-list">${items}</ul>
            </div>
        `;
    }

    // ===== SPRINT 2: LINE CHART =====

    /**
     * line-chart: SVG lines drawn with stroke-dashoffset animation
     * JSON: { type: "line-chart", title: "...", xLabel: "...", yLabel: "...",
     *         labels: ["2020","2021",...],
     *         series: [{ name: "...", color: "#6366f1", points: [12,18,25,34,56] }] }
     */
    function renderLineChart(s) {
        const W = 800, H = 400;
        const pad = { top: 30, right: 30, bottom: 50, left: 55 };
        const chartW = W - pad.left - pad.right;
        const chartH = H - pad.top - pad.bottom;
        const labels = s.labels || [];
        const series = s.series || [];

        // Calculate y range
        let allVals = series.flatMap(sr => sr.points || []);
        let yMin = Math.min(0, ...allVals);
        let yMax = Math.max(...allVals) * 1.15;

        const xScale = (i) => pad.left + (i / Math.max(1, labels.length - 1)) * chartW;
        const yScale = (v) => pad.top + chartH - ((v - yMin) / (yMax - yMin)) * chartH;

        // Grid lines (5 horizontal)
        let gridLines = '';
        for (let i = 0; i <= 4; i++) {
            const yVal = yMin + (i / 4) * (yMax - yMin);
            const y = yScale(yVal);
            gridLines += `<line class="lc-grid-line" x1="${pad.left}" y1="${y}" x2="${W - pad.right}" y2="${y}"/>`;
            gridLines += `<text class="lc-axis-label" x="${pad.left - 8}" y="${y + 4}" text-anchor="end">${Math.round(yVal)}</text>`;
        }

        // X labels
        let xLabels = labels.map((l, i) =>
            `<text class="lc-axis-label" x="${xScale(i)}" y="${H - pad.bottom + 25}" text-anchor="middle">${l}</text>`
        ).join('');

        // Axis labels
        let yAxisLabel = s.yLabel ? `<text class="lc-axis-label" x="15" y="${pad.top + chartH/2}" text-anchor="middle" transform="rotate(-90,15,${pad.top + chartH/2})">${s.yLabel}</text>` : '';
        let xAxisLabel = s.xLabel ? `<text class="lc-axis-label" x="${pad.left + chartW/2}" y="${H - 5}" text-anchor="middle">${s.xLabel}</text>` : '';

        // Data lines
        let linesHTML = '';
        let dotsHTML = '';
        series.forEach((sr, si) => {
            const pts = (sr.points || []).map((v, i) => `${xScale(i)},${yScale(v)}`).join(' ');
            // Calculate path length for dash animation
            const pathPoints = (sr.points || []).map((v, i) => ({ x: xScale(i), y: yScale(v) }));
            let pathLen = 0;
            for (let i = 1; i < pathPoints.length; i++) {
                pathLen += Math.hypot(pathPoints[i].x - pathPoints[i-1].x, pathPoints[i].y - pathPoints[i-1].y);
            }

            const delay = 0.5 + si * 0.8;
            linesHTML += `<polyline class="lc-data-line" points="${pts}" stroke="${sr.color || '#6366f1'}" 
                style="stroke-dasharray:${pathLen};stroke-dashoffset:${pathLen};animation:drawLine 2s ease ${delay}s forwards"/>`;

            // Dots at each point
            (sr.points || []).forEach((v, i) => {
                const dotDelay = delay + 0.3 + i * 0.15;
                dotsHTML += `<circle class="lc-dot" cx="${xScale(i)}" cy="${yScale(v)}" r="0" fill="${sr.color || '#6366f1'}" 
                    style="animation:dotAppear 0.4s ease ${dotDelay}s forwards"/>`;
            });
        });

        // Legend
        const legend = series.map(sr =>
            `<div class="lc-legend-item"><div class="lc-legend-dot" style="background:${sr.color}"></div>${sr.name || ''}</div>`
        ).join('');

        return `
            <div class="slide-line-chart">
                <h2>${s.title || ''}</h2>
                <div class="lc-chart">
                    <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet">
                        ${gridLines}
                        ${xLabels}
                        ${yAxisLabel}
                        ${xAxisLabel}
                        ${linesHTML}
                        ${dotsHTML}
                    </svg>
                </div>
                <div class="lc-legend">${legend}</div>
            </div>
        `;
    }

    // ===== SPRINT 2: COMPARISON =====

    /**
     * comparison: Side-by-side columns sliding in from opposite edges
     * JSON: { type: "comparison", title: "...",
     *         left: { label: "Utan", items: ["40 min/elev", ...] },
     *         right: { label: "Med", items: ["8 min/elev", ...] },
     *         highlights: [0, 1] }
     */
    function renderComparison(s) {
        const left = s.left || { label: '', items: [] };
        const right = s.right || { label: '', items: [] };
        const highlights = new Set(s.highlights || []);

        const renderItems = (items, side) => items.map((item, i) => {
            const hl = highlights.has(i) ? ' cmp-highlight' : '';
            const delay = (side === 'left' ? 0.6 : 0.8) + i * 0.15;
            return `<div class="cmp-item${hl}" style="opacity:0;animation:${side === 'left' ? 'slideFromLeft' : 'slideFromRight'} 0.5s ease ${delay}s forwards">${item}</div>`;
        }).join('');

        return `
            <div class="slide-comparison">
                <h2>${s.title || ''}</h2>
                <div class="cmp-grid">
                    <div class="cmp-col cmp-left">
                        <div class="cmp-label">${left.label || ''}</div>
                        ${renderItems(left.items || [], 'left')}
                    </div>
                    <div class="cmp-divider"></div>
                    <div class="cmp-col cmp-right">
                        <div class="cmp-label">${right.label || ''}</div>
                        ${renderItems(right.items || [], 'right')}
                    </div>
                </div>
            </div>
        `;
    }

    // ===== SPRINT 2: TIMELINE VERTICAL =====

    /**
     * timeline-vertical: Line drawn downward with nodes popping in
     * JSON: { type: "timeline-vertical", title: "...",
     *         nodes: [{ year: "2022", text: "...", sub: "optional detail" }, ...] }
     */
    function renderTimelineVertical(s) {
        const nodes = (s.nodes || []).map((node, i) => {
            const nodeDelay = 0.5 + i * 0.5;
            const dotDelay = nodeDelay - 0.1;
            return `
                <div class="tv-node" style="animation:bulletSlide 0.5s ease ${nodeDelay}s forwards">
                    <div class="tv-dot" style="animation:nodePopIn 0.4s cubic-bezier(0.34,1.56,0.64,1) ${dotDelay}s forwards"></div>
                    <div class="tv-year">${node.year || ''}</div>
                    <div class="tv-text">${node.text || ''}</div>
                    ${node.sub ? `<div class="tv-sub">${node.sub}</div>` : ''}
                </div>
            `;
        }).join('');

        return `
            <div class="slide-timeline-v">
                <h2>${s.title || ''}</h2>
                <div class="tv-track">
                    <div class="tv-line"></div>
                    ${nodes}
                </div>
            </div>
        `;
    }

    // ===== SPRINT 3: PROGRESS RING =====

    /**
     * progress-ring: Circular SVG gauge with countUp
     * JSON: { type: "progress-ring", title: "...", value: 78, max: 100, unit: "%",
     *         color: "#22c55e", subtitle: "Biologi, VT 2026" }
     */
    function renderProgressRing(s) {
        const val = s.value || 0;
        const max = s.max || 100;
        const pct = val / max;
        const R = 120, CX = 140, CY = 140;
        const C = 2 * Math.PI * R;
        const target = C * (1 - pct);
        const color = s.color || 'var(--accent, #f97316)';
        const uid = 'pr-' + Math.random().toString(36).slice(2, 8);

        // CountUp via inline script triggered after render
        setTimeout(() => {
            const el = document.getElementById(uid);
            if (!el) return;
            const duration = 2000;
            const start = performance.now();
            function tick(now) {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 4); // easeOutQuart
                el.textContent = Math.round(eased * val);
                if (t < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
        }, 500);

        return `
            <div class="slide-progress-ring">
                <h2>${s.title || ''}</h2>
                <div class="pr-wrap">
                    <svg width="280" height="280" viewBox="0 0 280 280">
                        <circle class="pr-bg" cx="${CX}" cy="${CY}" r="${R}"/>
                        <circle class="pr-fg" cx="${CX}" cy="${CY}" r="${R}"
                            stroke="${color}"
                            stroke-dasharray="${C}"
                            stroke-dashoffset="${C}"
                            style="--ring-target:${target};animation:ringFill 2s ease 0.4s forwards"/>
                    </svg>
                    <div class="pr-center">
                        <div class="pr-value"><span id="${uid}">0</span><span class="pr-unit">${s.unit || ''}</span></div>
                    </div>
                </div>
                ${s.subtitle ? `<div class="pr-subtitle">${s.subtitle}</div>` : ''}
            </div>
        `;
    }

    // ===== SPRINT 3: NUMBER WALL =====

    /**
     * number-wall: Grid of animated counters
     * JSON: { type: "number-wall", title: "...",
     *         numbers: [{ value: 268, label: "Slides", icon: "📊" }, ...] }
     */
    function renderNumberWall(s) {
        const nums = s.numbers || [];
        const cells = nums.map((n, i) => {
            const uid = 'nw-' + Math.random().toString(36).slice(2, 8);
            const delay = 300 + i * 200;

            // Schedule countUp
            setTimeout(() => {
                const el = document.getElementById(uid);
                if (!el) return;
                const target = n.value || 0;
                const duration = 1800;
                const start = performance.now();
                function tick(now) {
                    const t = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - t, 4);
                    el.textContent = Math.round(eased * target);
                    if (t < 1) requestAnimationFrame(tick);
                }
                requestAnimationFrame(tick);
            }, delay + 400);

            let iconHTML = '';
            if (n.iconSrc) {
                iconHTML = `<img class="nw-icon-img" src="${n.iconSrc}" alt="${n.label || ''}">`;
            } else if (n.icon) {
                iconHTML = `<span class="nw-icon">${n.icon}</span>`;
            }

            return `
                <div class="nw-cell" style="animation:boxBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms forwards">
                    ${iconHTML}
                    <div class="nw-value" id="${uid}">0</div>
                    <div class="nw-label">${n.label || ''}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="slide-number-wall">
                <h2>${s.title || ''}</h2>
                <div class="nw-grid">${cells}</div>
            </div>
        `;
    }

    // ===== SPRINT 3: BAR RACE =====

    /**
     * bar-race: Horizontal animated bars sorted by value
     * JSON: { type: "bar-race", title: "...", unit: "%",
     *         items: [{ label: "ChatGPT", value: 78, color: "#6366f1" }, ...] }
     */
    function renderBarRace(s) {
        const items = [...(s.items || [])].sort((a, b) => (b.value || 0) - (a.value || 0));
        const maxVal = items.length ? items[0].value : 1;
        const unit = s.unit || '';

        const rows = items.map((item, i) => {
            const pct = ((item.value || 0) / maxVal) * 100;
            const delay = 400 + i * 200;
            const isLeader = i === 0;
            const leaderClass = isLeader ? ' brc-leader' : '';
            const pulseAnim = isLeader ? ';animation-name:barPulse;animation-duration:3s;animation-delay:2.5s;animation-iteration-count:infinite' : '';

            return `
                <div class="brc-row${leaderClass}" style="animation:bulletSlide 0.5s ease ${delay}ms forwards">
                    <div class="brc-label">${item.label || ''}</div>
                    <div class="brc-track">
                        <div class="brc-bar" style="width:${pct}%;background:${item.color || 'var(--accent)'};animation:barGrow 1.2s ease ${delay + 100}ms both${pulseAnim}"></div>
                    </div>
                    <div class="brc-val">${item.value}${unit}</div>
                </div>
            `;
        }).join('');

        return `
            <div class="slide-bar-race">
                <h2>${s.title || ''}</h2>
                ${rows}
            </div>
        `;
    }

    // ===== MONKEY-PATCH REGISTRY =====
    const allTypes = {
        'word-cascade': renderWordCascade,
        'box-reveal': renderBoxReveal,
        'bullet-build': renderBulletBuild,
        'line-chart': renderLineChart,
        'comparison': renderComparison,
        'timeline-vertical': renderTimelineVertical,
        'progress-ring': renderProgressRing,
        'number-wall': renderNumberWall,
        'bar-race': renderBarRace
    };

    function registerTypes() {
        if (typeof window.slideTypeRegistry === 'object') {
            Object.assign(window.slideTypeRegistry, allTypes);
            console.log('[ComponentForge] Registered:', Object.keys(allTypes).join(', '));
        } else {
            setTimeout(registerTypes, 100);
        }
    }

    // Also patch watch.html renderSlideContent if in audience mode
    function patchWatchRenderer() {
        if (typeof window.renderSlideContent === 'function') {
            const original = window.renderSlideContent;
            window.renderSlideContent = function(data) {
                const s = data.slide || data;
                if (allTypes[s.type]) return allTypes[s.type](s);
                return original.apply(this, arguments);
            };
        }
    }

    // Init
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            registerTypes();
            patchWatchRenderer();
        });
    } else {
        registerTypes();
        patchWatchRenderer();
    }

    // Expose for external use
    window.__componentForge = allTypes;
})();
