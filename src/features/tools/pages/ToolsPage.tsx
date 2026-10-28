import { PageHeader } from "../../../components/layout/PageHeader";
import { RecentFiles } from "../components/RecentFiles";
import { FileSearch } from "../components/FileSearch";
import { FileDetails } from "../components/FileDetails";
import { useFiles } from "../hooks/useFiles";
import "../../../styles/ToolsPage.css";

export function ToolsPage() {
    const {
        recentFiles,
        filteredFiles,
        visibleRecentFiles,
        visibleSearchResults,
        selectedFile,

        searchQuery,
        fileType,
        location,

        showAllRecent,
        showAllResults,

        selectFile,
        clearSelectedFile,
        updateSearchQuery,
        updateFileType,
        updateLocation,
        toggleRecentFiles,
        toggleSearchResults,
    } = useFiles();

    return (
        <section className="tools-page">
        <PageHeader
            title="Herramientas"
            subtitle="Explorá y consultá tus archivos"
            variant="tools"
        />

        <div className="tools-page-content">
            <RecentFiles
            files={visibleRecentFiles}
            selectedFileId={selectedFile?.id}
            showAll={showAllRecent}
            onSelectFile={selectFile}
            onToggleShowAll={toggleRecentFiles}
            />

            <FileSearch
            files={visibleSearchResults}
            totalResults={filteredFiles.length}
            selectedFileId={selectedFile?.id}
            searchQuery={searchQuery}
            fileType={fileType}
            location={location}
            showAllResults={showAllResults}
            onSearchChange={updateSearchQuery}
            onFileTypeChange={updateFileType}
            onLocationChange={updateLocation}
            onSelectFile={selectFile}
            onToggleShowAll={toggleSearchResults}
            />

            <FileDetails
            selectedFile={selectedFile}
            onClearSelection={clearSelectedFile}
            />
        </div>
        </section>
    );
}
