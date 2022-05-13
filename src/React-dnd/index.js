// import { memo, useState, useCallback } from 'react'
// import update from 'immutability-helper'

// import { DndProvider, useDrag, useDrop } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

// export const ItemTypes = {
//     FOOD: 'food',
//     GLASS: 'glass',
//     PAPER: 'paper',
// }

// const style = {
//     border: '1px dashed gray',
//     backgroundColor: 'white',
//     padding: '0.5rem 1rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     cursor: 'move',
//     float: 'left',
// }

// const dustStyle = {
//     height: '12rem',
//     width: '12rem',
//     marginRight: '1.5rem',
//     marginBottom: '1.5rem',
//     color: 'white',
//     padding: '1rem',
//     textAlign: 'center',
//     fontSize: '1rem',
//     lineHeight: 'normal',
//     float: 'left',
// }

// export const Box = ({ name, type, isDropped }) => {
//     const [{ isDragging }, drag] = useDrag({
//         type,
//         item: { name },
//         isDragging(monitor) {
//             const item = monitor.getItem()
//             return name === item.name
//         },
//         collect: (monitor) => ({
//             isDragging: monitor.isDragging(),
//         }),
//     })
//     const opacity = isDragging ? 0.4 : 1
//     return (
//         <div ref={drag} style={{ ...style, opacity }}>
//             {isDropped ? <s>{name}</s> : name}
//         </div>
//     )
// }

// export const Dustbin = memo(function Dustbin({
//     lastDroppedItem,
//     accepts: accept,
//     onDrop,
// }) {
//     const [{ isOver, canDrop }, drop] = useDrop(
//         () => ({
//             accept,
//             collect: (monitor) => ({
//                 isOver: monitor.isOver(),
//                 canDrop: monitor.canDrop(),
//             }),
//             drop: (item) => onDrop(item),
//         }),
//         [accept],
//     )
//     const isActive = isOver && canDrop
//     let backgroundColor = '#222'
//     if (isActive) {
//         backgroundColor = 'darkgreen'
//     } else if (canDrop) {
//         backgroundColor = 'darkkhaki'
//     }
//     return (
//         <div ref={drop} style={{ ...dustStyle, backgroundColor }}>
//             {isActive
//                 ? 'Release to drop'
//                 : `This dustbin accepts: ${accept.join(', ')}`}

//             {lastDroppedItem && (
//                 <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
//             )}
//         </div>
//     )
// })

// function ReactDND() {

//     const [dustbins, setDustbins] = useState([
//         { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
//         { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
//         {
//             accepts: [ItemTypes.PAPER, ItemTypes.GLASS],
//             lastDroppedItem: null,
//         },
//         { accepts: [ItemTypes.PAPER], lastDroppedItem: null },
//     ])

//     const [boxes, setBoxes] = useState([
//         { name: 'Bottle', type: ItemTypes.GLASS },
//         { name: 'Banana', type: ItemTypes.FOOD },
//         { name: 'Magazine', type: ItemTypes.PAPER },
//     ])
//     const [droppedBoxNames, setDroppedBoxNames] = useState([])


//     const isDropped = (boxName) => droppedBoxNames.indexOf(boxName) > -1
//     const handleDrop = useCallback(
//         (index, item) => {
//             const { name } = item
//             setDustbins(
//                 update(dustbins, {
//                     [index]: {
//                         lastDroppedItem: {
//                             $set: item,
//                         },
//                     },
//                 }),
//             )
//             setDroppedBoxNames(
//                 update(
//                     droppedBoxNames,
//                     name
//                         ? {
//                             $push: [name],
//                         }
//                         : {},
//                 ),
//             )
//         },
//         [dustbins, droppedBoxNames],
//     )

//     return (
//         <div className="App">
//             <DndProvider backend={HTML5Backend}>
//                 <div>
//                     <div style={{ overflow: 'hidden', clear: 'both' }}>
//                         {dustbins.map(({ accepts, lastDroppedItem }, index) => (
//                             <Dustbin
//                                 accepts={accepts}
//                                 lastDroppedItem={lastDroppedItem}
//                                 onDrop={(item) => handleDrop(index, item)}
//                                 key={index}
//                             />
//                         ))}
//                     </div>

//                     <div style={{ overflow: 'hidden', clear: 'both' }}>
//                         {boxes.map(({ name, type }, index) => (
//                             <Box
//                                 name={name}
//                                 type={type}
//                                 isDropped={isDropped(name)}
//                                 key={index}
//                             />
//                         ))}
//                     </div>
//                 </div>
//             </DndProvider>
//         </div>
//     )
// }

// export default ReactDND;

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Example from "./Example";
import "./styles.css"

function ReactDND() {
    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <Example />
            </DndProvider>
        </div>
    );
}

export default ReactDND;
