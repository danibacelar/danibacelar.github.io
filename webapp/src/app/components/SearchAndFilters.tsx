"use client";

import { useEffect, useState } from "react";

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
] as const;

type GroupId = (typeof FILTER_GROUPS)[number]["group"];
type Selected = Record<GroupId, Set<string>>;

function novoVazio(): Selected {
  return { grade: new Set(), skill: new Set(), difficulty: new Set() };
}

function rotuloDaOpcao(group: GroupId, value: string): string {
  const grupo = FILTER_GROUPS.find((g) => g.group === group);
  return grupo?.options.find((o) => o.value === value)?.label ?? value;
}

export default function SearchAndFilters({ resultCount }: { resultCount: number }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [selected, setSelected] = useState<Selected>(novoVazio);

  // Clicar fora de um filtro aberto fecha ele.
  useEffect(() => {
    if (!openGroup) return;
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (!target.closest(".filter-dropdown")) {
        setOpenGroup(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openGroup]);

  function toggleOpcao(group: GroupId, value: string) {
    setSelected((atual) => {
      const proximo = new Set(atual[group]);
      if (proximo.has(value)) proximo.delete(value);
      else proximo.add(value);
      return { ...atual, [group]: proximo };
    });
  }

  function limparTudo() {
    setSelected(novoVazio());
  }

  const chips = FILTER_GROUPS.flatMap((grupo) =>
    [...selected[grupo.group]].map((value) => ({
      group: grupo.group,
      value,
      label: rotuloDaOpcao(grupo.group, value),
    }))
  );

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
        {FILTER_GROUPS.map((group) => {
          const count = selected[group.group].size;
          return (
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
                <span className="filter-dropdown-count" hidden={count === 0}>
                  {count}
                </span>
                <svg className="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div className="filter-dropdown-panel">
                {group.options.map((option) => (
                  <label className="filter-option" key={option.value}>
                    <input
                      type="checkbox"
                      checked={selected[group.group].has(option.value)}
                      onChange={() => toggleOpcao(group.group, option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="active-filters-row" hidden={chips.length === 0}>
        <div className="filter-chips">
          {chips.map((chip) => (
            <span className="filter-chip" key={`${chip.group}-${chip.value}`}>
              {chip.label}
              <button
                type="button"
                aria-label="Remover"
                onClick={() => toggleOpcao(chip.group, chip.value)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
        <button className="filter-clear-all" type="button" onClick={limparTudo}>
          Limpar tudo
        </button>
      </div>

      <div className="library-results-head" style={{ marginTop: 24 }}>
        <span className="library-count">{resultCount} atividades</span>
      </div>
    </>
  );
}
