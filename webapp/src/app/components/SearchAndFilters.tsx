"use client";

import { useState } from "react";

const FILTER_GROUPS = [
  {
    label: "Ano escolar",
    group: "grade",
    options: [
      { value: "3", label: "3º ano" },
      { value: "4", label: "4º ano" },
      { value: "5", label: "5º ano" },
      { value: "8", label: "8º ano" },
    ],
  },
  {
    label: "Habilidade",
    group: "skill",
    options: [
      { value: "Bilingual", label: "Bilíngue" },
      { value: "Grammar", label: "Gramática" },
      { value: "Vocabulary", label: "Vocabulário" },
      { value: "Reading", label: "Leitura" },
      { value: "Writing", label: "Escrita" },
      { value: "Listening", label: "Escuta" },
    ],
  },
  {
    label: "Dificuldade",
    group: "difficulty",
    options: [
      { value: "Beginner", label: "Iniciante" },
      { value: "Intermediate", label: "Intermediário" },
      { value: "Advanced", label: "Avançado" },
    ],
  },
];

export default function SearchAndFilters({ resultCount }: { resultCount: number }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Digite um nome..."
          aria-label="Buscar jogo pelo nome"
        />
        <button className="search-btn" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <span>Buscar</span>
        </button>
      </div>

      <div className="filter-toolbar">
        {FILTER_GROUPS.map((group) => (
          <div
            className={`filter-dropdown${openGroup === group.group ? " open" : ""}`}
            key={group.group}
          >
            <button
              className="filter-dropdown-btn"
              type="button"
              onClick={() =>
                setOpenGroup((current) => (current === group.group ? null : group.group))
              }
            >
              <span>{group.label}</span>
              <span className="filter-dropdown-count" hidden>
                0
              </span>
              <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className="filter-dropdown-panel">
              {group.options.map((option) => (
                <label className="filter-option" key={option.value}>
                  <input type="checkbox" />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="active-filters-row" hidden>
        <div className="filter-chips"></div>
        <button className="filter-clear-all">Limpar tudo</button>
      </div>

      <div className="library-results-head" style={{ marginTop: 24 }}>
        <span className="library-count">{resultCount} atividades</span>
      </div>
    </>
  );
}
