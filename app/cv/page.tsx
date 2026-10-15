"use client";

import { useRef, useCallback, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Mail, MapPin, Calendar, Phone, Download } from "lucide-react";
import { cvData } from "./cv-source";

const ITEM_TYPE = "CV_BLOCK";

interface DragItem {
  index: number;
  column: "sidebar" | "main";
}

function DraggableBlock({
  id,
  index,
  column,
  moveBlock,
  children,
}: {
  id: string;
  index: number;
  column: "sidebar" | "main";
  moveBlock: (
    dragIndex: number,
    hoverIndex: number,
    column: "sidebar" | "main"
  ) => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: (): DragItem => ({ index, column }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: DragItem, monitor) {
      if (!ref.current) return;
      if (item.column !== column) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveBlock(dragIndex, hoverIndex, column);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.4 : 1 }}
      className="cursor-grab active:cursor-grabbing transition-opacity"
    >
      {children}
    </div>
  );
}

/* ─── Social Icons ─── */
function GithubIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function YoutubeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/* ─── Sidebar section components (Template initial) ─── */

function SidebarSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2.5 mt-1.5">
      <div className="h-px bg-gray-300 flex-1" />
      <h3 className="text-[14.5px] font-semibold tracking-wider text-gray-800 whitespace-nowrap">
        {children}
      </h3>
      <div className="h-px bg-gray-300 flex-1" />
    </div>
  );
}

function AboutBlock() {
  const d = cvData.about;
  const rows: { icon: React.ReactNode; text: string }[] = [
    { icon: <Mail size={14} />, text: d.email },
    { icon: <MapPin size={14} />, text: d.address },
    { icon: <Calendar size={14} />, text: `Né le ${d.birthDate}` },
    { icon: <Phone size={14} />, text: d.phone },
  ];
  return (
    <div>
      <SidebarSectionTitle>À PROPOS</SidebarSectionTitle>
      <ul className="space-y-2 text-[12px] text-gray-700">
        {rows.map((r) => (
          <li key={r.text} className="flex items-center gap-2">
            <span className="w-4 flex-shrink-0 text-gray-800">{r.icon}</span>
            <span className="truncate" title={r.text}>
              {r.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LanguesBlock() {
  return (
    <div>
      <SidebarSectionTitle>LANGUES</SidebarSectionTitle>
      <ul className="space-y-1.5 text-[13px] text-gray-700">
        {cvData.langues.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

function AtoutsBlock() {
  return (
    <div>
      <SidebarSectionTitle>ATOUTS</SidebarSectionTitle>
      <ul className="space-y-2 text-[12px]">
        {cvData.atouts.map((a, i) => (
          <li key={i} className="font-bold text-gray-800 leading-snug">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CentresInteretBlock() {
  return (
    <div>
      <SidebarSectionTitle>CENTRES D&apos;INTÉRÊT</SidebarSectionTitle>
      <div className="space-y-1.5 text-[12.5px] text-gray-800">
        {cvData.centresInteret.map((c) => (
          <div key={c.name} className="leading-snug">
            <span className="font-bold">{c.name}</span>
            {c.detail && (
              <span className="ml-1 font-normal text-gray-600 text-[11.5px]">
                {c.detail}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReseauxSociauxBlock() {
  return (
    <div>
      <SidebarSectionTitle>RÉSEAUX SOCIAUX</SidebarSectionTitle>
      <div className="space-y-2 text-[12px] text-gray-700">
        {cvData.reseauxSociaux.map((r) => (
          <div key={r.handle} className="flex items-center gap-2">
            <span className="w-4 flex-shrink-0 text-gray-800">
              {r.platform === "github" ? <GithubIcon /> : <YoutubeIcon />}
            </span>
            <span className="font-medium">{r.handle}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main section components (Template initial) ─── */

function MainSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-2.5">
      <div className="h-px bg-[#2bbcc4] flex-1" />
      <h2 className="text-[17px] font-semibold tracking-wider text-[#2bbcc4] whitespace-nowrap">
        {children}
      </h2>
      <div className="h-px bg-[#2bbcc4] flex-1" />
    </div>
  );
}

function ProfilBlock() {
  if (!cvData.bio) return null;
  return (
    <div>
      <MainSectionTitle>PROFIL</MainSectionTitle>
      <p className="text-[13.5px] text-gray-800 leading-[1.7]">
        <span className="font-bold">
          Étudiant en Système Informatique et Logiciels
        </span>{" "}
        passionné par le développement logiciel. Je souhaite intégrer votre
        formation afin de consolider mes compétences en informatique et
        concrétiser mes projets professionnels.
      </p>
    </div>
  );
}

function DiplomesBlock() {
  return (
    <div>
      <MainSectionTitle>DIPLÔMES ET FORMATIONS</MainSectionTitle>
      <div className="space-y-3 text-gray-800">
        {cvData.diplomes.map((d, index) => (
          <div key={index} className="leading-relaxed">
            <p className="leading-normal">
              <span className="font-bold text-[14px] text-gray-900">{d.title}</span>{" "}
              <span className="text-gray-500 font-normal text-[13px]">{d.period}</span>
            </p>
            <p className="text-[#2bbcc4] text-[13px] leading-relaxed mt-0.5">
              {d.school}{" "}
              <span className="text-gray-800">{d.location}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperiencesBlock() {
  if (!cvData.experiences || cvData.experiences.length === 0) return null;
  return (
    <div>
      <MainSectionTitle>EXPÉRIENCES PROFESSIONNELLES</MainSectionTitle>
      <div className="space-y-3 text-gray-800">
        {cvData.experiences.map((e, index) => (
          <div key={index} className="leading-relaxed">
            <p className="leading-normal">
              <span className="font-bold text-[14px] text-gray-900">{e.title}</span>{" "}
              <span className="text-gray-500 font-normal text-[13px]">{e.period}</span>
            </p>
            {e.roleOrContext && (
              <p className="text-[#2bbcc4] text-[13px] font-medium leading-normal mt-0.5">
                {e.roleOrContext}
              </p>
            )}
            <p className="text-[13px] text-gray-700 leading-[1.7] mt-1">
              {e.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RealisationsBlock() {
  return (
    <div>
      <MainSectionTitle>RÉALISATIONS ET DISTINCTIONS</MainSectionTitle>
      <div className="space-y-3 text-gray-800">
        {cvData.realisations.map((r, index) => (
          <div key={index} className="leading-relaxed">
            <p className="leading-normal">
              <span className="font-bold text-[14px] text-gray-900">{r.title}</span>{" "}
              <span className="text-gray-500 font-normal text-[12.5px]">{r.period}</span>
            </p>
            <p className="text-[13px] text-gray-700 leading-[1.7] mt-1">
              {r.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompetencesBlock() {
  return (
    <div>
      <MainSectionTitle>COMPÉTENCES</MainSectionTitle>
      <div className="space-y-2.5 text-gray-800">
        {cvData.competences.map((c) => (
          <div key={c.title} className="leading-relaxed">
            <p className="font-bold text-[14px] text-gray-900 leading-normal">{c.title}</p>
            <p className="text-gray-700 text-[13px] leading-relaxed mt-0.5">{c.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Block registry ─── */

interface BlockDef {
  id: string;
  render: () => React.ReactNode;
}

const initialSidebarBlocks: BlockDef[] = [
  { id: "about", render: () => <AboutBlock /> },
  { id: "langues", render: () => <LanguesBlock /> },
  { id: "atouts", render: () => <AtoutsBlock /> },
  { id: "centresInteret", render: () => <CentresInteretBlock /> },
  { id: "reseauxSociaux", render: () => <ReseauxSociauxBlock /> },
];

const initialMainBlocks: BlockDef[] = [
  { id: "profil", render: () => <ProfilBlock /> },
  { id: "diplomes", render: () => <DiplomesBlock /> },
  { id: "experiences", render: () => <ExperiencesBlock /> },
  { id: "realisations", render: () => <RealisationsBlock /> },
  { id: "competences", render: () => <CompetencesBlock /> },
];

/* ─── Main CV component (Template initial) ─── */

export default function CvPage() {
  const [sidebarBlocks, setSidebarBlocks] = useState(initialSidebarBlocks);
  const [mainBlocks, setMainBlocks] = useState(initialMainBlocks);
  const cvRef = useRef<HTMLDivElement>(null);

  const moveBlock = useCallback(
    (dragIndex: number, hoverIndex: number, column: "sidebar" | "main") => {
      const setter = column === "sidebar" ? setSidebarBlocks : setMainBlocks;
      setter((prev) => {
        const updated = [...prev];
        const [removed] = updated.splice(dragIndex, 1);
        updated.splice(hoverIndex, 0, removed);
        return updated;
      });
    },
    []
  );

  const handleExportPdf = () => {
    window.print();
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6 print:bg-white print:py-0 print:m-0 print:block">
        {/* PDF Export button */}
        <button
          onClick={handleExportPdf}
          className="mb-4 px-5 py-2.5 bg-[#2bbcc4] text-white rounded-lg flex items-center gap-2 hover:bg-[#25a5ac] transition-colors shadow-md print:hidden cursor-pointer text-sm font-medium"
        >
          <Download size={16} />
          Exporter en PDF
        </button>

        {/* Format A4 exact (210mm x 297mm) */}
        <div
          ref={cvRef}
          className="w-[210mm] h-[297mm] max-h-[297mm] bg-white shadow-xl print:shadow-none flex overflow-hidden"
        >
          {/* ─── Sidebar gauche (Template initial : fond gris clair #f3f3f3) ─── */}
          <aside className="w-[35%] bg-[#f3f3f3] px-5 py-6 flex flex-col overflow-hidden">
            {/* Header dans la sidebar */}
            <div className="text-center mb-4">
              <h1 className="text-[23px] font-bold tracking-[0.15em] text-gray-900 leading-tight whitespace-pre-line">
                {cvData.name}
              </h1>
              <p className="text-[13.5px] font-semibold text-[#2bbcc4] mt-1.5 tracking-wide whitespace-pre-line leading-tight">
                {cvData.title}
              </p>
            </div>

            {/* Blocs déplaçables de la sidebar */}
            <div className="space-y-3.5 flex-1">
              {sidebarBlocks.map((block, i) => (
                <DraggableBlock
                  key={block.id}
                  id={block.id}
                  index={i}
                  column="sidebar"
                  moveBlock={moveBlock}
                >
                  {block.render()}
                </DraggableBlock>
              ))}
            </div>
          </aside>

          {/* ─── Zone principale droite (Template initial : fond blanc, titres cyan avec lignes) ─── */}
          <main className="flex-1 px-6 py-6 space-y-4 overflow-hidden">
            {mainBlocks.map((block, i) => (
              <DraggableBlock
                key={block.id}
                id={block.id}
                index={i}
                column="main"
                moveBlock={moveBlock}
              >
                {block.render()}
              </DraggableBlock>
            ))}
          </main>
        </div>
      </div>
    </DndProvider>
  );
}
