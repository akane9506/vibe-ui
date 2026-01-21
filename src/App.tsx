import Card from "@/components/Card";
import FoldingLetter from "@/components/FoldingLetter";
import RippleButton from "./components/RippleButton";

function App() {
  return (
    <div className="flex flex-wrap gap-4">
      <Card
        title="Ripple Button"
        description="An interactive 3D letter animation that unfolds to reveal its contents."
        className="w-74 h-fit" // needs calculation based on the contentClassName
        contentClassName="h-60 w-70"
        tags={["button", "effect"]}
      >
        <RippleButton text="Ripple Button" duration={1000} />
      </Card>
      <Card
        title="Folding Letter"
        description="An interactive 3D letter animation that unfolds to reveal its contents."
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
