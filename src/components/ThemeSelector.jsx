import modeIcon from '../assets/lightbulb.svg';
import { useTheme } from '../hooks/useTheme';

// Styles
import './ThemeSelector.css';

const themeColors = ['#58249c', '#249c6b', '#b70233'];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();

  const toggleMode = () => {
    changeMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="theme-selector">
      <div className="mode-toggle">
        <img
          src={modeIcon}
          alt="toggle mode"
          onClick={toggleMode}
          style={{ filter: mode === 'dark' ? 'invert(20%)' : 'invert(100%)' }}
        />
      </div>
      <div className="theme-buttons">
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
            className="theme-button"
          />
        ))}
      </div>
    </div>
  );
}
