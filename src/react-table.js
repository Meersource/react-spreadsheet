import React from 'react'
import { useTable, usePagination } from 'react-table'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

const thStyle = { padding: '1.5rem', border: '0.5px solid #f2f4f6' }

const Table = ({ columns, data }) => {
    const [records, setRecords] = React.useState(data)

    const getRowId = React.useCallback(row => row.id, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
    } = useTable({
        data: records,
        columns,
        getRowId,
    }, usePagination)

    const moveRow = (dragIndex, hoverIndex) => {
        const dragRecord = records[dragIndex]
        setRecords(
            update(records, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRecord],
                ],
            })
        )
    }

    const selectRow = (e, id) => {
        const index = records.findIndex(x => x.id === id);
        const data = records.filter(x => x.id === id)[0];
        data.select = true;
        setRecords(update(records, {
            $splice: [
                [index, 1],
                [index, 0, data]],
        }))
    }
    console.log(page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize)
    return (
        <DndProvider backend={HTML5Backend}>
            <table {...getTableProps()} style={{ borderSpacing: 0, border: '0.5px solid #f2f4f6' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr style={{ ...thStyle, color: '#c63545', resize: 'horizontal', overflow: 'auto' }} {...headerGroup.getHeaderGroupProps()}>
                            {/* <th></th> */}
                            {headerGroup.headers.map(column => (
                                <th style={thStyle}  {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, index) =>
                            prepareRow(row) || (
                                <Row
                                    index={index}
                                    row={row}
                                    moveRow={moveRow}
                                    onClick={selectRow}
                                    {...row.getRowProps()}
                                />
                            )
                    )}
                </tbody>
            </table>
        </DndProvider>
    )
}

const DND_ITEM_TYPE = 'row'

const Row = ({ row, index, moveRow, onClick }) => {
    const dropRef = React.useRef(null)
    const dragRef = React.useRef(null)

    const [, drop] = useDrop({
        accept: DND_ITEM_TYPE,
        hover(item, monitor) {
            if (!dropRef.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = dropRef.current.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveRow(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag, preview] = useDrag({
        item: { index },
        type: DND_ITEM_TYPE,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const style = { backgroundColor: row.original.select === true ? '#87ceeb' : index % 2 === 0 ? '#f7f7f7' : '#ffffff', opacity: isDragging ? 0 : 1 }
    preview(drop(dropRef))
    drag(dragRef)

    console.log(dragRef, dropRef)
    return (
        <tr ref={dropRef} style={{ ...thStyle, ...style, }}>
            {/* <td style={thStyle} ref={dragRef}>move</td> */}
            {row.cells.map(cell => {
                return <td
                    style={thStyle}
                    {...cell.getCellProps()}
                    onClick={(e) => onClick(e, cell.row.id)}
                    id={cell.column.id}
                    ref={cell.column.id === 'position' ? dragRef : null}
                >
                    {cell.render('Cell')}
                </td>
            })}
        </tr>
    )
}

const ReactTable = () => {
    const columns = [
        {
            Header: 'Position', id: 'position', accessor: (row) => (
                <div className="center-block text-center">
                    {row.position === true ? (
                        <span
                            style={{
                                height: ' 15px',
                                width: '15px',
                                backgroundColor: 'green',
                                borderRadius: '50%',
                                display: 'inline-block',
                            }}
                        />
                    ) : (
                        <span
                            style={{
                                height: ' 15px',
                                width: '15px',
                                backgroundColor: 'gray',
                                borderRadius: '50%',
                                display: 'inline-block',
                            }}
                        />
                    )}
                </div>
            )
        },
        { Header: 'ID', id: 'id', accessor: 'id', },
        { Header: 'First Name', id: 'firstName', accessor: 'firstName', },
        { Header: 'Last Name', id: 'lastName', accessor: 'lastName', },
        { Header: 'Class', id: 'class', accessor: 'class', },
        { Header: 'Group', id: 'group', accessor: 'group', },
    ];

    const data = [
        { id: 1, position: true, firstName: "tax", lastName: "lizards", class: 'class1', group: 'group1', },
        { id: 2, position: false, firstName: "cart", lastName: "library", class: 'class2', group: 'group2', },
        { id: 3, position: false, firstName: "earthquake", lastName: "drop", class: 'class3', group: 'group3', },
        { id: 4, position: false, firstName: "exchange", lastName: "departure", class: 'class4', group: 'group4', },
        { id: 5, position: false, firstName: "employment", lastName: "product", class: 'class5', group: 'group5', },
    ];

    return (
        <div>
            <Table columns={columns} data={data} />
        </div>
    )
}

export default ReactTable;
