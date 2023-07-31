import { useRouter } from "next/router";
import AuthLayout from "../../layouts/authLayout";
import MainLayout from "../../layouts/mainLayout";


const Layout = ({ children }) => {
    const { pathname } = useRouter();

    if (pathname === "/login" || pathname === "/register") {
        return <AuthLayout>{children}</AuthLayout>;
    }

    return <MainLayout>{children}</MainLayout>;
};

export default Layout;
