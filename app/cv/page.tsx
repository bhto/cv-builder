"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Mail, MapPin, Calendar, Flag, Phone, Download } from "lucide-react";
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

  useEffect(() => {
    drag(drop(ref));
  }, [drag, drop])

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
    ...(d.nationality
      ? [{ icon: <Flag size={14} />, text: d.nationality }]
      : []),
    { icon: <Phone size={14} />, text: d.phone },
  ];
  return (
    <div>
      <SidebarSectionTitle>À PROPOS</SidebarSectionTitle>
      <ul className="space-y-2 text-[12px] text-gray-700">
        {rows.map((r) => (
          <li key={r.text} className="flex items-center gap-2 text-[14.5px]">
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
      <div className="space-y-4 text-[15px] text-gray-800 ">
        {cvData.langues.map((l) => {
          const name = typeof l === "string" ? l : l.name;
          const percent = typeof l === "string" ? 80 : l.levelPercent;
          return (
            <div key={name}>
              <p className="font-semibold text-gray-800">{name}</p>
              <div className="w-full bg-gray-300 h-1 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-gray-800 h-full rounded-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AtoutsBlock() {
  if (!cvData.atouts || cvData.atouts.length === 0) return null;
  return (
    <div>
      <SidebarSectionTitle>ATOUTS</SidebarSectionTitle>
      <ul className="space-y-1.5 text-[12.5px]">
        {cvData.atouts.map((a, i) => (
          <li key={i} className="font-semibold text-[15px] text-gray-800 leading-snug">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReferencesBlock() {
  if (!cvData.references || cvData.references.length === 0) return null;
  return (
    <div>
      <SidebarSectionTitle>RÉFÉRENCES</SidebarSectionTitle>
      <div className="flex flex-col space-y-2.5 text-[12px] text-gray-700">
        {cvData.references.map((r, i) => (
          <div key={i} className="flex flex-col leading-snug">
            <span className="font-bold text-gray-900 text-[14px]">{r.name}</span>
            <span className="text-gray-700 text-[13px] mt-0.5">{r.role}</span>
            <span className="text-gray-600 text-[13px] mt-0.5">{r.phone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CentresInteretBlock() {
  return (
    <div>
      <SidebarSectionTitle>CENTRES D&apos;INTÉRÊT</SidebarSectionTitle>
      <div className="space-y-1.5 text-gray-800">
        {cvData.centresInteret.map((c) => (
          <div key={c.name} className="leading-snug">
            <span className="font-bold text-[14px]">{c.name}</span>
            {c.detail && (
              <span className="ml-1 font-normal text-gray-600 text-[12.5px]">
                {c.detail}
              </span>
            )}
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
      <p className="text-[14px] text-justify text-gray-800 leading-[1.7]">
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
  { id: "references", render: () => <ReferencesBlock /> },
  { id: "centresInteret", render: () => <CentresInteretBlock /> },
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
              <p className="text-[16px] mb-4 font-semibold text-[#2bbcc4] mt-1.5 tracking-wide whitespace-pre-line leading-tight">
                {cvData.title}
              </p>
            </div>

            {/* Blocs déplaçables de la sidebar */}
            <div className="space-y-6 flex-1">
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
