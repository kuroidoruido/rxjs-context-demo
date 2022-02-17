interface ShowConfig {
  label: string;
  selector: string;
  draw: (
    component: (context: { userId?: string; userName?: string }) => void
  ) => void;
  after3000: VoidFunction;
  after6000: VoidFunction;
  after9000: VoidFunction;
}

function componentFactory(div: HTMLDivElement, label: string) {
  return function component({
    userId,
    userName,
  }: {
    userId: string;
    userName: string;
  }) {
    div.innerHTML = `
    <fieldset>
      <legend>${label}</legend>
      <ul>
        <li>${userId}</li>
        <li>${userName}</li>
      </ul>
    </fieldset>
    `;
  };
}

export function show(config: ShowConfig) {
  const div = document.querySelector<HTMLDivElement>(config.selector)!;
  config.draw(componentFactory(div, config.label));
  setTimeout(config.after3000, 3000);
  setTimeout(config.after6000, 6000);
  setTimeout(config.after9000, 9000);
}
