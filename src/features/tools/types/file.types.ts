export type FileType =
    | "pdf"
    | "excel"
    | "jupyter"
    | "powerpoint"
    | "text"
    | "python"
    | "csv";

export interface FileItem {
    id: string;
    name: string;
    type: FileType;
    location: string;
    size: number;
    modifiedAt: string;
    isRecent: boolean;
}
