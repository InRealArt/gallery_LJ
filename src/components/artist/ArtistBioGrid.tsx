import ArtistBioSection from "./ArtistBioSection";

interface BioSectionData {
  label: string;
  content: string;
}

interface ArtistBioGridProps {
  sections: BioSectionData[];
}

export default function ArtistBioGrid({ sections }: ArtistBioGridProps) {
  const colClass =
    sections.length === 1
      ? "grid-cols-1 max-w-lg"
      : "grid-cols-1 md:grid-cols-2";

  return (
    <div className={`bio-sections-grid grid gap-x-16 gap-y-14 ${colClass}`}>
      {sections.map((section) => (
        <ArtistBioSection
          key={section.label}
          label={section.label}
          html={section.content}
        />
      ))}
    </div>
  );
}
