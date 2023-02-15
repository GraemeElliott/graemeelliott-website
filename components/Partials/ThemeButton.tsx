import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

interface ThemeButtonProps {
  theme: string;
  setTheme: (newTheme: string) => void;
}

export default function ThemeButton({ theme, setTheme }: ThemeButtonProps) {
  return (
    <div
      className={`theme-toggle-button ${theme}`}
      onClick={() => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      }}
    >
      <FontAwesomeIcon
        icon={theme === 'light' ? faSun : faMoon}
        className="fa-lg fa-icon"
      />
    </div>
  );
}
