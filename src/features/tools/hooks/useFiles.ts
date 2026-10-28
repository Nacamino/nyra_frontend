import { useMemo, useState } from "react";

import { mockFiles } from "../mocks/mockFiles";
import type { FileItem, FileType } from "../types/file.types";

export function useFiles() {
    const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [fileType, setFileType] = useState<FileType | "all">("all");
    const [location, setLocation] = useState("all");

    const [showAllRecent, setShowAllRecent] = useState(false);
    const [showAllResults, setShowAllResults] = useState(false);

    const recentFiles = useMemo(() => {
        return mockFiles
        .filter((file) => file.isRecent)
        .sort(
            (a, b) =>
            new Date(b.modifiedAt).getTime() -
            new Date(a.modifiedAt).getTime()
        );
    }, []);

    const filteredFiles = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return mockFiles.filter((file) => {
        const matchesSearch =
            query === "" ||
            file.name.toLowerCase().includes(query) ||
            file.location.toLowerCase().includes(query) ||
            file.type.toLowerCase().includes(query);

        const matchesType =
            fileType === "all" || file.type === fileType;

        const matchesLocation =
            location === "all" ||
            file.location.toLowerCase().includes(location.toLowerCase());

        return matchesSearch && matchesType && matchesLocation;
        });
    }, [searchQuery, fileType, location]);

    const visibleRecentFiles = showAllRecent
        ? recentFiles
        : recentFiles.slice(0, 5);

    const visibleSearchResults = showAllResults
        ? filteredFiles
        : filteredFiles.slice(0, 3);

    function selectFile(file: FileItem) {
        setSelectedFile(file);
    }

    function clearSelectedFile() {
        setSelectedFile(null);
    }

    function updateSearchQuery(value: string) {
        setSearchQuery(value);
        setShowAllResults(false);
    }

    function updateFileType(value: FileType | "all") {
        setFileType(value);
        setShowAllResults(false);
    }

    function updateLocation(value: string) {
        setLocation(value);
        setShowAllResults(false);
    }

    function toggleRecentFiles() {
        setShowAllRecent((previous) => !previous);
    }

    function toggleSearchResults() {
        setShowAllResults((previous) => !previous);
    }

    return {
        // Data
        recentFiles,
        filteredFiles,
        visibleRecentFiles,
        visibleSearchResults,
        selectedFile,

        // Filters
        searchQuery,
        fileType,
        location,

        // Display state
        showAllRecent,
        showAllResults,

        // Actions
        selectFile,
        clearSelectedFile,
        updateSearchQuery,
        updateFileType,
        updateLocation,
        toggleRecentFiles,
        toggleSearchResults,
    };
}
