import { useState } from "react";
import { Search, ChevronRight } from "lucide-react";
import { FileTable } from "./FileTable";
import type { FileItem, FileType } from "../types/file.types";

interface FileSearchProps {
    files: FileItem[];
    totalResults: number;
    selectedFileId?: string;

    searchQuery: string;
    fileType: FileType | "all";
    location: string;
    showAllResults: boolean;

    onSearchChange: (value: string) => void;
    onFileTypeChange: (value: FileType | "all") => void;
    onLocationChange: (value: string) => void;
    onSelectFile: (file: FileItem) => void;
    onToggleShowAll: () => void;
}

export function FileSearch({
    files,
    totalResults,
    selectedFileId,
    searchQuery,
    fileType,
    location,
    showAllResults,
    onSearchChange,
    onFileTypeChange,
    onLocationChange,
    onSelectFile,
    onToggleShowAll,
    }: FileSearchProps) {
    const [inputValue, setInputValue] = useState(searchQuery);

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onSearchChange(inputValue);
    }

    return (
        <section className="tools-panel">
        <div className="tools-section-header">
            <div className="tools-section-heading">
            <div className="tools-section-icon tools-section-icon--blue">
                <Search size={24} />
            </div>

            <div>
                <h2>Buscar archivos</h2>
                <p>Encontrá archivos por nombre, tipo o ubicación.</p>
            </div>
            </div>
        </div>

        <form
            className="tools-search-controls"
            onSubmit={handleSearch}
        >
            <div className="tools-search-field">
            <Search size={18} />

            <input
                type="search"
                placeholder="Buscar archivos..."
                aria-label="Buscar archivos"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            </div>

            <select
            className="tools-select"
            aria-label="Filtrar por tipo de archivo"
            value={fileType}
            onChange={(event) =>
                onFileTypeChange(event.target.value as FileType | "all")
            }
            >
            <option value="all">Todos los tipos</option>
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="jupyter">Jupyter</option>
            <option value="powerpoint">PowerPoint</option>
            <option value="text">Texto</option>
            <option value="python">Python</option>
            <option value="csv">CSV</option>
            </select>

            <select
            className="tools-select"
            aria-label="Filtrar por ubicación"
            value={location}
            onChange={(event) => onLocationChange(event.target.value)}
            >
            <option value="all">Todas las ubicaciones</option>
            <option value="Escritorio">Escritorio</option>
            <option value="Descargas">Descargas</option>
            <option value="Documentos">Documentos</option>
            </select>

            <button type="submit" className="tools-primary-button">
            Buscar
            </button>
        </form>

        <FileTable
            files={files}
            selectedFileId={selectedFileId}
            onSelectFile={onSelectFile}
        />

        <div className="tools-search-footer">
            <span>
            Mostrando {files.length} de {totalResults} resultados
            </span>

            {totalResults > 3 && (
            <button
                type="button"
                className="tools-text-button"
                onClick={onToggleShowAll}
            >
                {showAllResults
                ? "Mostrar menos"
                : "Ver todos los resultados"}

                <ChevronRight size={16} />
            </button>
            )}
        </div>
        </section>
    );
}
