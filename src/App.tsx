import Card from "@/components/Card";
import FoldingLetter from "@/components/FoldingLetter";
import RippleButton from "./components/RippleButton";
import SweepButton from "./components/SweepButton";
import RadialGradientButton from "./components/RadialGradientButton";

function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Card
        title="Ripple Button"
        description="A button with animated ripple effects that expands from the click position, providing tactile visual feedback."
        className="w-74 h-fit" // needs calculation based on the contentClassName
        contentClassName="h-60 w-70"
        tags={["button", "effect"]}
      >
        <RippleButton text="Ripple Button" duration={1000} />
      </Card>
      <Card
        title="Sweep Button"
        description="A button with a smooth color fill animation that sweeps across on hover, creating an elegant transition effect."
        className="w-74 h-fit" // needs calculation based on the contentClassName
        contentClassName="h-60 w-70"
        tags={["button", "effect"]}
      >
        <SweepButton text="Sweep Button" duration={400} />
      </Card>
      <Card
        title="Gradient Button"
        description="A button with a dynamic radial gradient that follows your cursor and emits an expanding ripple on click."
        className="w-74 h-fit" // needs calculation based on the contentClassName
        contentClassName="h-60 w-70"
        tags={["button", "effect"]}
      >
        <RadialGradientButton text="Gradient Button" duration={600} />
      </Card>
      <Card
        title="Folding Letter"
        description="A 3D folding paper animation that unfolds from a single page to reveal three pages of text content on click."
        className="w-124" // needs calculation based on the contentClassName
        contentClassName="h-120 w-120"
        tags={["text", "3d-transform"]}
      >
        <FoldingLetter />
      </Card>
    </div>
  );
}

export default App;
