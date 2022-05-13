import { COMPONENT, ROW, COLUMN } from "./constants";

const initialData = {
    layout: [
        {
            type: ROW,
            id: "row0",
            children: [
                {
                    type: COLUMN,
                    id: "column0",
                    children: [
                        {
                            type: COMPONENT,
                            id: "component0"
                        },
                        {
                            type: COMPONENT,
                            id: "component1"
                        }
                    ]
                },
                {
                    type: COLUMN,
                    id: "column1",
                    children: [
                        {
                            type: COMPONENT,
                            id: "component2"
                        }
                    ]
                }
            ]
        },
        {
            type: ROW,
            id: "row1",
            children: [
                {
                    type: COLUMN,
                    id: "column2",
                    children: [
                        {
                            type: COMPONENT,
                            id: "component3"
                        },
                        {
                            type: COMPONENT,
                            id: "component0"
                        },
                        {
                            type: COMPONENT,
                            id: "component2"
                        }
                    ]
                }
            ]
        }
    ],
    components: {
        component0: { id: "component0", type: "input", content: "Ciclo normal" },
        component1: { id: "component1", type: "image", content: "Tiempo máquina" },
        component2: { id: "component2", type: "email", content: "Tiempo espera" },
        component3: { id: "component3", type: "name", content: "Ocupación hombre" },
        component4: { id: "component4", type: "phone", content: "Ocupación máquina" },
        // component5: { id: "component5", type: "table", content: "Table" }
    }
};

export default initialData;
