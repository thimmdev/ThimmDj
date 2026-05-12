import Navbar        from "./components/Navbar"
import Hero          from "./components/Hero"
import Bio           from "./components/Bio"
import Music         from "./components/Music"
import Shows         from "./components/Shows"
import Gallery       from "./components/Gallery"
import Testimonials  from "./components/Testimonials"
import Contact       from "./components/Contact"
import Footer        from "./components/Footer"
import CustomCursor  from "./components/CustomCursor"
import LoadingScreen from "./components/LoadingScreen"

function App() {
  return (
    <div style={{ background: "var(--color-bg-base)" }}>
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Bio />
        <Music />
        <Shows />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
