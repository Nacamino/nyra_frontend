import { Clock3 } from "lucide-react";
import { FileTable } from "./FileTable";
import type { FileItem } from "../types/file.types";

interface RecentFilesProps {
    files: FileItem[];
    selectedFileId?: string;
    showAll: boolean;
    onSelectFile: (file: FileItem) => void;
    onToggleShowAll: () => void;
}

export function RecentFiles({
    files,
    selectedFileId,
    showAll,
    onSelectFile,
    onToggleShowAll,
    }: RecentFilesProps) {
    return (
        <section className="tools-panel">
        <div className="tools-section-header">
            <div className="tools-section-heading">
            <div className="tools-section-icon tools-section-icon--purple">
                <Clock3 size={23} />
            </div>

            <div>
                <h2>Archivos recientes</h2>
                <p>Accedé a los archivos utilizados recientemente.</p>
            </div>
            </div>

            <button
            type="button"
            className="tools-outline-button"
            onClick={onToggleShowAll}
            aria-expanded={showAll}
            >
            {showAll ? "Ver menos" : "Ver más"}
            </button>
        </div>

        <FileTable
            files={files}
            selectedFileId={selectedFileId}
            onSelectFile={onSelectFile}
        />
        </section>
    );
}
