import PortfolioPage from './PortfolioPage';
import { usePreview } from 'lib/sanity.preview';
import {
  type Project,
  type Settings,
  indexProjectQuery,
  settingsQuery,
} from 'lib/sanity.queries';

export default function PreviewPortfolioPage({
  token,
}: {
  token: null | string;
}) {
  const projects: Project[] = usePreview(token, indexProjectQuery) || [];
  const settings: Settings = usePreview(token, settingsQuery) || {};

  return (
    <div>
      <PortfolioPage preview projects={projects} settings={settings} />
    </div>
  );
}
