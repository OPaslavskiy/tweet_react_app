import { GlobalStyle } from "../GlobalStyle";
import { Layout } from "../Layout";
import { TweeterList } from "./TweeterList/TweeterList";

function App() {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <TweeterList />
      </Layout>
    </>
  );
}

export default App;
