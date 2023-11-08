import Login from "./pages/auth/login";
import {MantineProvider} from "@mantine/core";

export default function App() {
  return (
      <MantineProvider>
        <Login />
      </MantineProvider>

  );
} 