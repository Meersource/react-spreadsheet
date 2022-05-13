import shortid from "shortid";

export const SIDEBAR_ITEM = "sidebarItem";
export const ROW = "row";
export const COLUMN = "column";
export const COMPONENT = "component";

export const SIDEBAR_ITEMS = [
    {
        id: shortid.generate(),
        type: SIDEBAR_ITEM,
        component: {
            type: "input",
            content: "Ciclo Normal"
        }
    },
    {
        id: shortid.generate(),
        type: SIDEBAR_ITEM,
        component: {
            type: "name",
            content: "Tiempo máquina"
        }
    },
    {
        id: shortid.generate(),
        type: SIDEBAR_ITEM,
        component: {
            type: "email",
            content: "Tiempo espera"
        }
    },
    {
        id: shortid.generate(),
        type: SIDEBAR_ITEM,
        component: {
            type: "phone",
            content: "Ocupación hombre"
        }
    },
    {
        id: shortid.generate(),
        type: SIDEBAR_ITEM,
        component: {
            type: "image",
            content: "Ocupación máquina"
        }
    },
    {
        id: shortid.generate(),
        type: SIDEBAR_ITEM,
        component: {
            type: "test",
            content: "Test"
        }
    }

];
