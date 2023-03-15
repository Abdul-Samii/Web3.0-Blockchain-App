import { Navbar, Welcome, Footer, Services, Transactions } from "./components"
import './index.css'

const App = () => {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <div>
        <Services />
        <Transactions />
        <Footer />
      </div>
    </div>
  )
}

export default App
