import {
    FileText,
    FileSpreadsheet,
    FileCode2,
    Presentation,
    File,
    Folder,
    Info,
    Copy,
} from "lucide-react";

import type { FileItem, FileType } from "../types/file.types";

interface FileTableProps {
    files: FileItem[];
    selectedFileId?: string;
    onSelectFile: (file: FileItem) => void;
}

function getFileIcon(type: FileType) {
    switch (type) {
        case "pdf":
        case "text":
        return FileText;

        case "excel":
        case "csv":
        return FileSpreadsheet;

        case "python":
        case "jupyter":
        return FileCode2;

        case "powerpoint":
        return Presentation;

        default:
        return File;
    }
    }

    function getFileTypeLabel(type: FileType): string {
    const labels: Record<FileType, string> = {
        pdf: "PDF",
        excel: "Excel",
        jupyter: "Jupyter",
        powerpoint: "PowerPoint",
        text: "Texto",
        python: "Python",
        csv: "CSV",
    };

    return labels[type];
    }

    function formatFileSize(bytes: number): string {
    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(0)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    function formatFileDate(date: string): string {
    return new Date(date).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
    }

    export function FileTable({
    files,
    selectedFileId,
    onSelectFile,
    }: FileTableProps) {
    async function handleCopyLocation(file: FileItem) {
        const fileLocation = `${file.location}/${file.name}`;

        try {
        await navigator.clipboard.writeText(fileLocation);
        } catch (error) {
        console.error("Failed to copy file location:", error);
        }
    }

    if (files.length === 0) {
        return (
        <div className="tools-empty-results">
            <File size={24} />
            <p>No se encontraron archivos.</p>
        </div>
        );
    }

    return (
        <div className="tools-table-scroll">
        <table className="tools-table">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Ubicación</th>
                <th>Última modificación</th>
                <th>Tamaño</th>
                <th aria-label="Acciones" />
            </tr>
            </thead>

            <tbody>
            {files.map((file) => {
                const Icon = getFileIcon(file.type);
                const isSelected = selectedFileId === file.id;

                return (
                <tr
                    key={file.id}
                    className={
                    isSelected
                        ? "tools-table-row--selected"
                        : undefined
                    }
                >
                    <td>
                    <button
                        type="button"
                        className="tools-file-name"
                        onClick={() => onSelectFile(file)}
                        title="Ver información del archivo"
                    >
                        <span
                        className={`tools-file-icon tools-file-icon--${file.type}`}
                        >
                        <Icon size={17} />
                        </span>

                        <span>{file.name}</span>
                    </button>
                    </td>

                    <td>
                    <span
                        className={`tools-type-badge tools-type-badge--${file.type}`}
                    >
                        {getFileTypeLabel(file.type)}
                    </span>
                    </td>

                    <td>
                    <span className="tools-file-location">
                        <Folder size={15} />
                        {file.location}
                    </span>
                    </td>

                    <td>{formatFileDate(file.modifiedAt)}</td>

                    <td>{formatFileSize(file.size)}</td>

                    <td>
                    <div className="tools-row-actions">
                        <button
                        type="button"
                        className="tools-icon-button"
                        onClick={() => onSelectFile(file)}
                        title="Ver detalles"
                        aria-label={`Ver detalles de ${file.name}`}
                        >
                        <Info size={16} />
                        </button>

                        <button
                        type="button"
                        className="tools-icon-button"
                        onClick={() => handleCopyLocation(file)}
                        title="Copiar ubicación"
                        aria-label={`Copiar ubicación de ${file.name}`}
                        >
                        <Copy size={16} />
                        </button>
                    </div>
                    </td>
                </tr>
                );
            })}
            </tbody>
        </table>
        </div>
    );
}
