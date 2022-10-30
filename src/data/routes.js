import Music from "@/components/Music";
import Photos from "@/components/Photos";
import Concerts from "@/components/Events";
import Contact from "@/components/Contact";
import Home from "@/components/Home";
import Bio from "@/components/Bio";
import Merch from "@/components/Merch";
import {events, photos} from '../data/store'


const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "/kontakt",
        component: Contact,
    },
    {
        path: "/hudba",
        component: Music,
    },
    {
        path: "/fotky",
        component: Photos,
        props: {items: photos}
    },
    {
        path: "/koncerty",
        component: Concerts,
        props: {items: events}
    },
    {
        path: "/bio",
        component: Bio,
    },
    {
        path: "/merch",
        component: Merch,
    },
    {
        path: "/kontact",
        component: Contact,
    }
]
export {routes}
