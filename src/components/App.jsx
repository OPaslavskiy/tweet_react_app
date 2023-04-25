import { GlobalStyle } from "../GlobalStyle";
import { Layout } from "../Layout";
import { TweeterList } from "./TweeterList/TweeterList";
import { AppBar } from "./AppBar/AppBar";
import { Home } from "../components/Home/Home";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <AppBar />
      <GlobalStyle />
      <Layout>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tweets" element={<TweeterList />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
