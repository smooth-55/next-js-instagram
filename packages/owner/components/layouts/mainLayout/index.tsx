import { Navbar } from "../../molecules";

const MainLayout = ({ children }) => (
    <>
        <Navbar />
        <div className="container mt-90">{children}</div>
    </>
);

export default MainLayout;
