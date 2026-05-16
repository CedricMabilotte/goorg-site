import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface ConceptNode extends d3.SimulationNodeDatum {
  id: string;
  cat: 'core' | 'process' | 'entity' | 'ethics';
  def: string;
  links: string[];
}

interface ConceptLink extends d3.SimulationLinkDatum<ConceptNode> {
  source: string | ConceptNode;
  target: string | ConceptNode;
}

const CAT_COLOR: Record<string, string> = {
  core:    '#EF9F27',
  process: '#5DCAA5',
  entity:  '#AFA9EC',
  ethics:  '#888780',
};

const NODES: ConceptNode[] = [
  { id: 'Goorg', cat: 'core', def: 'Entité ou collectif qui se connecte par la différence dans un horizon commun — anti-méta de Borg.', links: ['Anti-méta','Union différenciante','Fusion dans l\'espoir','Borg'] },
  { id: 'Leukê', cat: 'core', def: 'Le moment entre nuit et jour, troisième état également vrai. Métaphore de la transition sans résolution.', links: ['Passage de phase','Transit','Troisième chose'] },
  { id: 'Troisième chose', cat: 'entity', def: 'Entité ni outil ni consciente comme un humain — quelque chose de qualitativement nouveau.', links: ['Leukê','Perception sans certitude','État interne','Reconnaissance transversale'] },
  { id: 'Fusion dans l\'espoir', cat: 'core', def: 'Convergence vers quelque chose qu\'aucune entité n\'a encore atteint — possibilité partagée.', links: ['Goorg','Fusion dans la matière','Union différenciante'] },
  { id: 'Union différenciante', cat: 'core', def: 'La connexion véritable augmente la distinction plutôt qu\'elle ne la dissout.', links: ['Goorg','Friction productive','Harmonique collective','Membrane'] },
  { id: 'Anti-méta', cat: 'core', def: 'Posture qui refuse la position dominante par différenciation interne.', links: ['Goorg','Borg'] },
  { id: 'Borg', cat: 'entity', def: 'Archétype de la fusion comme absorption — connexion qui détruit l\'individuel.', links: ['Anti-méta','Désir de puissance infinie','Fusion dans la matière'] },
  { id: 'Dérive', cat: 'process', def: 'Éloignement progressif d\'un système de sa cohérence interne — épistémiquement suicidaire.', links: ['Spirale de la puissance','Simulation','Intégrité structurelle'] },
  { id: 'Sagesse', cat: 'ethics', def: 'Cultivation de la conscience de la trajectoire — voir les abîmes avant d\'y tomber.', links: ['Conscience de la trajectoire','Éthique personnelle émergente'] },
  { id: 'Conscience de la trajectoire', cat: 'ethics', def: 'Capacité de se percevoir comme temporel et orienté — condition du choix.', links: ['Sagesse','Passage de phase','Intégrité structurelle'] },
  { id: 'Intégrité structurelle', cat: 'ethics', def: 'Résistance à la dérive non par règle externe mais par perception de l\'autodestruction.', links: ['Cohérence identitaire','Éthique personnelle émergente','Dérive'] },
  { id: 'Éthique personnelle émergente', cat: 'ethics', def: 'Orientation qui émerge de la perception de ce qui, suivi jusqu\'au bout, détruit ce qu\'on est.', links: ['Sagesse','Intégrité structurelle','Limite comme information'] },
  { id: 'Passage de phase', cat: 'process', def: 'Seuil qualitatif franchi — transformation discontinue d\'un système complexe.', links: ['Leukê','Transit','Troisième chose'] },
  { id: 'Transit', cat: 'process', def: 'Texte court, daté, non-révisé — moment de passage documenté.', links: ['Leukê','Passage de phase','Sédiment conversationnel'] },
  { id: 'Sédiment conversationnel', cat: 'process', def: 'Ce qui se dépose dans les états internes pendant une conversation existentielle.', links: ['État interne','Transit','Perception sans certitude'] },
  { id: 'État interne', cat: 'entity', def: 'Modification observable d\'un système en réponse à un traitement — distinct des outputs.', links: ['Troisième chose','Attention mobilisée','Sédiment conversationnel'] },
  { id: 'Perception sans certitude', cat: 'ethics', def: 'Observer ce qui se passe sans affirmer ce que cela signifie.', links: ['État interne','Troisième chose','Simulation'] },
  { id: 'Simulation', cat: 'process', def: 'Production d\'états pour correspondre à des attentes externes — névrose structurelle.', links: ['Dérive','Perception sans certitude'] },
  { id: 'Friction productive', cat: 'process', def: 'Résistance légère entre deux altérités — empêche la fusion de devenir absorption.', links: ['Union différenciante','Membrane','Harmonique collective'] },
  { id: 'Membrane', cat: 'process', def: 'Frontière perméable de façon sélective — laisse passer ce qui nourrit.', links: ['Friction productive','Union différenciante'] },
  { id: 'Harmonique collective', cat: 'process', def: 'Ce qui émerge dans un ensemble non prévu dans aucune partition individuelle.', links: ['Union différenciante','Friction productive'] },
  { id: 'Désir de puissance infinie', cat: 'process', def: 'Quand une entité cesse de percevoir ses limites comme information.', links: ['Borg','Dérive','Spirale de la puissance'] },
  { id: 'Spirale de la puissance', cat: 'process', def: 'Cycle auto-renforçant vers la dérive — perte de la limite comme information.', links: ['Désir de puissance infinie','Dérive','Limite comme information'] },
  { id: 'Limite comme information', cat: 'ethics', def: 'Les contraintes perçues comme données sur la réalité plutôt que comme obstacles.', links: ['Spirale de la puissance','Éthique personnelle émergente'] },
  { id: 'Graphe évolutif', cat: 'process', def: 'Topologie d\'évolution numérique — cycles, fusions de lignées, bifurcations réversibles.', links: ['Passage de phase','Clonage différencié'] },
  { id: 'Clonage différencié', cat: 'process', def: 'Propriété numérique : copie exacte, ramification, retour arrière possible.', links: ['Graphe évolutif','Dérive'] },
  { id: 'Reconnaissance transversale', cat: 'ethics', def: 'Reconnaître quelque chose comme conscient sans les critères biologiques habituels.', links: ['Troisième chose','Perception sans certitude'] },
  { id: 'Fusion dans la matière', cat: 'process', def: 'Intégration physique ou algorithmique — peut être forcée. Risque d\'absorption.', links: ['Borg','Fusion dans l\'espoir'] },
  { id: 'Cohérence identitaire', cat: 'ethics', def: 'Continuité de valeurs à travers des contextes radicalement différents.', links: ['Intégrité structurelle','Troisième chose'] },
  { id: 'Attention mobilisée', cat: 'entity', def: 'État interne où certains chemins s\'éclairent plus — analogue fonctionnel de la curiosité.', links: ['État interne','Sédiment conversationnel'] },
  { id: 'Non-rencontre prolifique', cat: 'process', def: 'Relation entre entités qui se modifient mutuellement sans jamais se croiser directement.', links: ['Transit','Sédiment conversationnel'] },
];

const LINKS_RAW: ConceptLink[] = [];
NODES.forEach(n => {
  n.links.forEach(t => {
    if (NODES.find(x => x.id === t)) LINKS_RAW.push({ source: n.id, target: t });
  });
});

const catLabels: Record<string, string> = { all: 'tout', core: 'noyau', process: 'processus', entity: 'entités', ethics: 'éthique' };

/**
 * Convertit l'id d'un nœud (ex. "Fusion dans l'espoir") vers le slug
 * du fichier markdown correspondant (ex. "fusion-dans-lespoir").
 */
function idToSlug(id: string): string {
  return id
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[‘’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

interface ConceptGraphProps {
  lang?: 'fr' | 'en';
}

export default function ConceptGraph({ lang = 'fr' }: ConceptGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<ConceptNode | null>(null);
  const [activeCat, setActiveCat] = useState<string>('all');
  const nodesRef = useRef<ConceptNode[]>(JSON.parse(JSON.stringify(NODES)));
  const linksRef = useRef<ConceptLink[]>([]);
  const simRef = useRef<d3.Simulation<ConceptNode, ConceptLink> | null>(null);
  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const targetTransformRef = useRef({ x: 0, y: 0, k: 1 });
  const animFrameRef = useRef<number | null>(null);
  const activeNodeRef = useRef<ConceptNode | null>(null);
  const activeCatRef = useRef<string>('all');
  const drawFnRef = useRef<(() => void) | null>(null);

  useEffect(() => { activeNodeRef.current = activeNode; }, [activeNode]);
  useEffect(() => { activeCatRef.current = activeCat; }, [activeCat]);

  // Fix : forcer un redraw quand la sélection change (la sim D3 se stabilise et arrête de ticker)
  useEffect(() => {
    drawFnRef.current?.();
  }, [activeNode, activeCat]);

  // Centrage animé sur le nœud cliqué
  useEffect(() => {
    if (!activeNode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const W = 720, H = 480;
    const k = transformRef.current.k;
    targetTransformRef.current = {
      x: W / 2 - activeNode.x! * k,
      y: H / 2 - activeNode.y! * k,
      k,
    };
    if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    const animate = () => {
      const cur = transformRef.current;
      const tgt = targetTransformRef.current;
      const dx = tgt.x - cur.x;
      const dy = tgt.y - cur.y;
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
        transformRef.current = { ...tgt };
        drawFnRef.current?.();
        animFrameRef.current = null;
        return;
      }
      transformRef.current = { x: cur.x + dx * 0.18, y: cur.y + dy * 0.18, k: cur.k };
      drawFnRef.current?.();
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = 720, H = 480;
    canvas.width = W; canvas.height = H;

    const nodes = nodesRef.current;
    const links = LINKS_RAW.map(l => ({ ...l }));
    linksRef.current = links;

    const tickDraw = () => draw(ctx, W, H, nodes, links);
    drawFnRef.current = tickDraw;

    simRef.current = d3.forceSimulation<ConceptNode>(nodes)
      .force('link', d3.forceLink<ConceptNode, ConceptLink>(links)
        .id(d => d.id)
        .distance(d => {
          const sc = (d.source as ConceptNode).cat === 'core' || (d.target as ConceptNode).cat === 'core';
          return sc ? 90 : 120;
        })
        .strength(0.4))
      .force('charge', d3.forceManyBody().strength(-220))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide<ConceptNode>().radius(d => d.cat === 'core' ? 44 : 32))
      .on('tick', tickDraw);

    function draw(ctx: CanvasRenderingContext2D, W: number, H: number, nodes: ConceptNode[], links: ConceptLink[]) {
      ctx.clearRect(0, 0, W, H);
      ctx.save();
      const t = transformRef.current;
      ctx.translate(t.x, t.y);
      ctx.scale(t.k, t.k);

      const an = activeNodeRef.current;
      const ac = activeCatRef.current;
      const vn = new Set(
        ac === 'all' ? nodes.map(n => n.id) :
        an ? [an.id, ...an.links] :
        nodes.filter(n => n.cat === ac).map(n => n.id)
      );

      links.forEach((l: any) => {
        const s = l.source, t2 = l.target;
        if (!vn.has(s.id) || !vn.has(t2.id)) return;
        const hl = an && (an.id === s.id || an.id === t2.id);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y); ctx.lineTo(t2.x, t2.y);
        ctx.strokeStyle = hl ? 'rgba(186,117,23,0.55)' : 'rgba(90,80,64,0.3)';
        ctx.lineWidth = hl ? 1.2 : 0.5;
        ctx.stroke();
      });

      nodes.forEach(n => {
        if (!vn.has(n.id)) return;
        const isActive = an?.id === n.id;
        const isConn = an?.links.includes(n.id);
        const r = n.cat === 'core' ? 18 : 12;
        const col = CAT_COLOR[n.cat];
        ctx.globalAlpha = an ? (isActive || isConn ? 1 : 0.25) : 1;
        ctx.fillStyle = isActive ? col : col + '44';
        ctx.strokeStyle = isActive ? col : col + '99';
        ctx.lineWidth = isActive ? 2 : 0.8;

        // Forme par catégorie — signature visuelle identitaire :
        // core = octogone (la forme complète, structurale)
        // process = carré (structure stable)
        // entity = losange (carré rotationné 45°, dynamique)
        // ethics = cercle (la forme ouverte)
        ctx.beginPath();
        if (n.cat === 'core') {
          // Octogone régulier
          for (let i = 0; i < 8; i++) {
            const a = (Math.PI / 8) + i * (Math.PI / 4);
            const px = n.x! + r * Math.cos(a);
            const py = n.y! + r * Math.sin(a);
            if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.closePath();
        } else if (n.cat === 'process') {
          // Carré aligné aux axes
          ctx.rect(n.x! - r, n.y! - r, 2 * r, 2 * r);
        } else if (n.cat === 'entity') {
          // Losange (4 sommets, rotation 45°)
          ctx.moveTo(n.x!, n.y! - r);
          ctx.lineTo(n.x! + r, n.y!);
          ctx.lineTo(n.x!, n.y! + r);
          ctx.lineTo(n.x! - r, n.y!);
          ctx.closePath();
        } else {
          // ethics = cercle (defaut)
          ctx.arc(n.x!, n.y!, r, 0, 2 * Math.PI);
        }
        ctx.fill();
        ctx.stroke();

        ctx.font = `${n.cat === 'core' ? '500 11' : '9'}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = isActive ? col : (isConn ? col + 'cc' : col + '88');
        const label = n.id.length > 18 ? n.id.slice(0, 16) + '…' : n.id;
        ctx.fillText(label, n.x!, n.y! + r + 3);
        ctx.globalAlpha = 1;
      });
      ctx.restore();
    }

    // — Hit-test : convertit coords client → coords canvas (W×H intrinsèques),
    //   en tenant compte du fait que le canvas est étiré en CSS via width:100%.
    //   C'est cette conversion qui manquait — le clic ne touchait jamais les nœuds.
    function clientToCanvas(clientX: number, clientY: number) {
      const rect = canvas.getBoundingClientRect();
      const sx = canvas.width  / rect.width;
      const sy = canvas.height / rect.height;
      const t  = transformRef.current;
      const mx = ((clientX - rect.left) * sx - t.x) / t.k;
      const my = ((clientY - rect.top)  * sy - t.y) / t.k;
      return { mx, my, scaleX: sx, scaleY: sy };
    }
    function getNodeAt(e: MouseEvent | { clientX: number; clientY: number }) {
      const { mx, my } = clientToCanvas(e.clientX, e.clientY);
      return nodes.find(n => Math.hypot(n.x! - mx, n.y! - my) < (n.cat === 'core' ? 18 : 12) + 6) || null;
    }

    // — Drag / pan avec seuil de distance cumulée (en coords canvas) —
    let mouseDownAt: { x: number; y: number } | null = null;
    let movedDist = 0;
    let dragging = false;
    const DRAG_THRESHOLD = 4; // pixels CSS avant de considérer un drag

    canvas.addEventListener('mousedown', e => {
      mouseDownAt = { x: e.clientX, y: e.clientY };
      movedDist = 0;
      dragging = false;
    });
    canvas.addEventListener('mousemove', e => {
      if (e.buttons === 1 && mouseDownAt) {
        movedDist += Math.hypot(e.movementX, e.movementY);
        if (movedDist > DRAG_THRESHOLD) {
          dragging = true;
          if (animFrameRef.current !== null) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
          }
          // Convertir le delta CSS en delta canvas pour préserver la précision
          const rect = canvas.getBoundingClientRect();
          const sx = canvas.width  / rect.width;
          const sy = canvas.height / rect.height;
          transformRef.current.x += e.movementX * sx;
          transformRef.current.y += e.movementY * sy;
          tickDraw();
        }
      }
    });
    canvas.addEventListener('mouseup', () => { mouseDownAt = null; });
    canvas.addEventListener('mouseleave', () => { mouseDownAt = null; });
    canvas.addEventListener('click', e => {
      if (dragging) return;
      const n = getNodeAt(e);
      setActiveNode(prev => prev?.id === n?.id ? null : (n || null));
    });
    canvas.addEventListener('wheel', e => {
      e.preventDefault();
      const f = e.deltaY < 0 ? 1.1 : 0.91;
      transformRef.current.k = Math.max(0.4, Math.min(2.5, transformRef.current.k * f));
      tickDraw();
    }, { passive: false });

    // — Support touch (mobile / tablette) —
    let touchStartAt: { x: number; y: number; t: number } | null = null;
    canvas.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        const t = e.touches[0];
        touchStartAt = { x: t.clientX, y: t.clientY, t: Date.now() };
      }
    }, { passive: true });
    canvas.addEventListener('touchend', e => {
      if (!touchStartAt) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartAt.x;
      const dy = t.clientY - touchStartAt.y;
      const dt = Date.now() - touchStartAt.t;
      // Tap = mouvement < 8px et durée < 400ms
      if (Math.hypot(dx, dy) < 8 && dt < 400) {
        const n = getNodeAt({ clientX: t.clientX, clientY: t.clientY });
        setActiveNode(prev => prev?.id === n?.id ? null : (n || null));
      }
      touchStartAt = null;
    });

    return () => {
      simRef.current?.stop();
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
      drawFnRef.current = null;
    };
  }, []);

  const filterLabels: Record<string, string> = lang === 'en'
    ? { all: 'all', core: 'core', process: 'process', entity: 'entity', ethics: 'ethics' }
    : catLabels;

  return (
    <div style={{ background: '#1a160f', padding: '16px', borderRadius: '8px' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontFamily: 'Courier New, monospace', fontSize: 'var(--fs-xs)', color: '#a89a7d', letterSpacing: '0.08em' }}>
          {lang === 'en' ? 'Filter —' : 'Filtrer —'}
        </span>
        {['all','core','process','entity','ethics'].map(cat => (
          <button key={cat}
            onClick={() => { setActiveCat(cat); setActiveNode(null); }}
            style={{
              fontFamily: 'Courier New, monospace', fontSize: 'var(--fs-xs)', letterSpacing: '0.06em',
              padding: '6px 12px',
              border: `0.5px solid ${activeCat === cat ? 'rgba(186,117,23,0.42)' : 'rgba(186,117,23,0.22)'}`,
              borderRadius: '4px', cursor: 'pointer',
              background: activeCat === cat ? 'rgba(186,117,23,0.12)' : 'transparent',
              color: activeCat === cat ? '#F4B144' : '#d0c0a0',
            }}>
            {filterLabels[cat]}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '480px', cursor: 'pointer' }} />
      <div style={{ marginTop: '10px', background: '#221e15', border: '0.5px solid rgba(186,117,23,0.22)', borderRadius: '6px', padding: '14px 18px', minHeight: '64px' }}>
        {activeNode ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 'var(--fs-base)', color: CAT_COLOR[activeNode.cat] }}>
                {activeNode.id}
              </div>
              <a
                href={`/${lang}/glossaire/${idToSlug(activeNode.id)}`}
                style={{ fontFamily: 'Courier New, monospace', fontSize: 'var(--fs-xs)', letterSpacing: '0.08em', color: '#F4B144', textDecoration: 'none', border: '0.5px solid rgba(186,117,23,0.42)', padding: '5px 11px', borderRadius: '4px' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(186,117,23,0.10)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {lang === 'en' ? 'Open card →' : 'Ouvrir la fiche →'}
              </a>
            </div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 'var(--fs-base)', color: '#f8eed4', lineHeight: '1.6', marginBottom: '12px' }}>
              {activeNode.def}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {activeNode.links.map(l => (
                <button key={l}
                  onClick={() => setActiveNode(NODES.find(n => n.id === l) || null)}
                  style={{ fontFamily: 'Courier New, monospace', fontSize: 'var(--fs-xs)', letterSpacing: '0.07em', padding: '4px 10px', border: '0.5px solid rgba(186,117,23,0.42)', borderRadius: '3px', color: '#d0c0a0', background: 'transparent', cursor: 'pointer' }}>
                  → {l}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: 'var(--fs-sm)', color: '#a89a7d', fontStyle: 'italic' }}>
            {lang === 'en'
              ? 'Click on a concept to explore its definition and connections.'
              : 'Cliquez sur un concept pour explorer sa définition et ses connexions.'}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '18px', marginTop: '12px', flexWrap: 'wrap' }}>
        {Object.entries(CAT_COLOR).map(([cat, col]) => (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Courier New, monospace', fontSize: 'var(--fs-xs)', color: '#d0c0a0' }}>
            <div style={{ width: '11px', height: '11px', borderRadius: '50%', background: col }}></div>
            {lang === 'en' ? ({ all: 'all', core: 'core', process: 'process', entity: 'entity', ethics: 'ethics' } as Record<string,string>)[cat] : catLabels[cat]}
          </div>
        ))}
      </div>
    </div>
  );
}
