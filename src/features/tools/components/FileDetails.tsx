import { useRef, useState } from "react";
import type { ChangeEvent, DragEvent, KeyboardEvent } from "react";
import {
    FileText,
    Upload,
    X,
    File,
    HardDrive,
    CalendarDays,
    Folder,
} from "lucide-react";

import type { FileItem } from "../types/file.types";

interface FileDetailsProps {
    selectedFile: FileItem | null;
    onClearSelection: () => void;
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

function formatFileDate(date: string | number): string {
    return new Date(date).toLocaleString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
}

export function FileDetails({
    selectedFile,
    onClearSelection,
    }: FileDetailsProps) {
    const [localFile, setLocalFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const currentFile = localFile ?? selectedFile;

    function handleLocalFile(file?: File) {
        if (!file) return;

        setLocalFile(file);
        setIsDragging(false);
    }

    function handleFileInput(event: ChangeEvent<HTMLInputElement>) {
        handleLocalFile(event.target.files?.[0]);
        event.target.value = "";
    }

    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(false);

        handleLocalFile(event.dataTransfer.files[0]);
    }

    function handleDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(false);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        fileInputRef.current?.click();
        }
    }

    function handleClear() {
        setLocalFile(null);
        onClearSelection();
    }

    return (
        <section className="tools-panel">
        <div className="tools-section-header">
            <div className="tools-section-heading">
            <div className="tools-section-icon tools-section-icon--green">
                <FileText size={23} />
            </div>

            <div>
                <h2>Información de archivo</h2>
                <p>
                Seleccioná un archivo para consultar sus detalles.
                </p>
            </div>
            </div>

            {currentFile && (
            <button
                type="button"
                className="tools-icon-button"
                onClick={handleClear}
                aria-label="Limpiar selección"
                title="Limpiar selección"
            >
                <X size={18} />
            </button>
            )}
        </div>

        <div className="tools-details-layout">
            <div
            className={`tools-dropzone ${
                isDragging ? "tools-dropzone--dragging" : ""
            }`}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={handleKeyDown}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="Seleccionar un archivo del equipo"
            >
            <Upload size={24} />

            <span>Arrastrá un archivo aquí</span>

            <span className="tools-dropzone-link">
                o seleccioná un archivo
            </span>

            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileInput}
                hidden
            />
            </div>

            <div className="tools-file-details">
            {!currentFile ? (
                <div className="tools-details-placeholder">
                <FileText size={26} />

                <strong>No hay un archivo seleccionado</strong>

                <p>
                    Elegí un archivo para ver su información detallada.
                </p>
                </div>
            ) : (
                <div className="tools-details-content">
                <h3>{currentFile.name}</h3>

                <div className="tools-detail-row">
                    <File size={16} />
                    <span>Tipo</span>
                    <strong>
                    {localFile
                        ? localFile.type || "Desconocido"
                        : selectedFile?.type.toUpperCase()}
                    </strong>
                </div>

                <div className="tools-detail-row">
                    <HardDrive size={16} />
                    <span>Tamaño</span>
                    <strong>{formatFileSize(currentFile.size)}</strong>
                </div>

                <div className="tools-detail-row">
                    <CalendarDays size={16} />
                    <span>Modificación</span>
                    <strong>
                    {formatFileDate(
                        localFile
                        ? localFile.lastModified
                        : selectedFile!.modifiedAt
                    )}
                    </strong>
                </div>

                <div className="tools-detail-row">
                    <Folder size={16} />
                    <span>Ubicación</span>
                    <strong>
                    {localFile
                        ? "Archivo seleccionado del equipo"
                        : selectedFile?.location}
                    </strong>
                </div>
                </div>
            )}
            </div>
        </div>
        </section>
    );
}
