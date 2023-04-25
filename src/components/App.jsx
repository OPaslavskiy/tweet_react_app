import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import { GlobalStyle } from "../GlobalStyle";
import { Layout } from "../Layout";
import { AppBar } from "./AppBar/AppBar";

const Home = lazy(() => import("../components/Home/Home"));
const TweeterList = lazy(() =>
  import("../../src/components/TweeterList/TweeterList")
);

function App() {
  return (
    <>
      <AppBar />
      <GlobalStyle />
      <Layout>
        <Suspense fallback={<div>Loading subpage...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="tweets" element={<TweeterList />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
}

export default App;
