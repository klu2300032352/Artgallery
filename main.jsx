

import Payment from './pages/Payment';
import Home from './pages/Home';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/app" element={<App />} />
  <Route path="/artworks" element={<Artworks />} />
  <Route path="/upload" element={<Upload />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/payment" element={<Payment />} />
    </Routes>
  </BrowserRouter>
)
