import Mainscreen from "./screens/Mainscreen";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <Mainscreen />
    </NativeBaseProvider>
  );
}
