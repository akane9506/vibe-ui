import { Theme } from "@radix-ui/themes";
// import "@radix-ui/themes/styles.css";
import "./theme.css";
import RippleButton from "./components/RippleButton";
import Card from "./components/Card";

function App() {
  return (
    <>
      <Theme accentColor="blue" grayColor="gray">
        <Card title="Ripple Button">
          <RippleButton text={"Ripple Button"} duration={1500} />
        </Card>
        <Card title="Ripple Button">
          <RippleButton text={"Ripple Button"} duration={1500} />
        </Card>
      </Theme>
    </>
  );
}

export default App;
