import { useState, useEffect, useRef } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [shouldRenderSidebar, setShouldRenderSidebar] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle function
  const toggleSidebar = () => {
    if (!isSidebarOpen) {
      // Opening: render sidebar first
      setShouldRenderSidebar(true);
    } else {
      // Closing: trigger close animation
      if (sidebarRef.current) {
        sidebarRef.current.classList.remove("sidebar-open");
        sidebarRef.current.classList.add("sidebar-close");
      }
      // Unmount after animation
      setTimeout(() => {
        setShouldRenderSidebar(false);
      }, 300); // Must match CSS animation duration
    }
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add open class after sidebar mounts
  useEffect(() => {
    if (shouldRenderSidebar && isSidebarOpen && sidebarRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (sidebarRef.current) {
          sidebarRef.current.classList.add("sidebar-open");
          sidebarRef.current.classList.remove("sidebar-close");
        }
      }, 10);
    }
  }, [shouldRenderSidebar, isSidebarOpen]);

  return (
    <div>
      {/* Navbar with hamburger button */}
      <div className="navbar">
        <button
          className={`hamburger ${isSidebarOpen ? "open" : ""}`}
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Conditionally render sidebar */}
      {shouldRenderSidebar && (
        <div ref={sidebarRef} className="sidebar">
          <div className="sliding-div-container item-style">
            <div className="sliding-div div-style">
              <h2>HOME</h2>
            </div>
            <div className="sliding-div-two div-style">
              <h2>PRODUCTS</h2>
            </div>
            <div className="sliding-div-three div-style">
              <h2>SERVICES</h2>
            </div>
            <div className="sliding-div-four div-style">
              <h2>CONTACT</h2>
            </div>
            <div className="sliding-div-five div-style">
              <h2>ABOUT US</h2>
            </div>
          </div>
        </div>
      )}

      <div className="wrapper">
        <div className="page-text">
          <h1>ABHISHEK</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
