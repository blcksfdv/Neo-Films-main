// import MintPage from "../Components/MintPage/MintPage";
import {LandingPage} from "../pages/Landingpage";
import {MainPage} from "../pages/MainPage/MainPage";
import {createRoutes} from "./createRoutes";
import {Routes} from "./Routepath";
import NetworkSwitchPage from "../pages/NetworkSwitchPage";
import MintPage from "../Components/MintPage/MintPage";


export const routes = [

    createRoutes({
        path: Routes.home,
        element: MainPage,
        children: [
            createRoutes({
                path: Routes.home,
                element: MintPage,
            }),
            createRoutes({
                path: Routes.mint,
                element: NetworkSwitchPage,
            })
        ]
    }),
]
