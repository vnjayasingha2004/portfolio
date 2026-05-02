import { CometField } from "@/components/CometField";

export function GalaxyBackground() {
  return (
    <div className="global-galaxy-bg" aria-hidden="true">
      <div className="global-galaxy-image" />
      <div className="global-galaxy-overlay" />
      <CometField />
    </div>
  );
}