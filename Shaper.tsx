import React, {useMemo, useState, useEffect, useRef, useCallback} from 'react'
import './Shape.css'
const Shape = ({data}) => {
  const [selected, setIsSelected] = useState(new Set())
  const [unloading, setUnloading] = useState(false)
  const timerRef = useRef(null)
  const totalVisibleBoxes = useMemo(() => {
    return data.flat().filter((col) => col === 1).length
  }, [data])

  console.log(totalVisibleBoxes)
  const handleEvent = useCallback(
    (event) => {
      const index = event.target.getAttribute('data-index')
      if (index === null || unloading) {
        return
      } else {
        setIsSelected((prev) => {
          let newSet = new Set(prev)
          newSet.add(index)
          return newSet
        })
      }
    },
    [unloading],
  )

  useEffect(() => {
    if (selected.size === totalVisibleBoxes) {
      unload()
    }
  }, [selected])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const unload = () => {
    setUnloading(true)
    const keys = Array.from(selected)
    const remove = () => {
      if (keys.length) {
        let currentKey = keys.shift()
        setIsSelected((prev) => {
          let newSet = new Set(prev)
          newSet.delete(currentKey)
          return newSet
        })
        timerRef.current = setTimeout(() => {
          remove()
        }, 500)
      } else {
        setUnloading(false)
      }
    }
    timerRef.current = setTimeout(() => {
      remove()
    }, 500)
  }
  return (
    <div class="boxes" onClick={handleEvent}>
      {data.map((row, rowIndex) => {
        return (
          <div className="row" key={`${rowIndex}`}>
            {row.map((column, columnIndex) => {
              const identifier = `${rowIndex}_${columnIndex}`
              const isSelected = selected.has(identifier)
              return column === 1 ? (
                <div
                  className={`box ${isSelected ? 'selected' : ''}`}
                  data-index={identifier}
                  aria-pressed={isSelected}
                  tabIndex={columnIndex}
                  role="button"
                ></div>
              ) : (
                <div className="box_placeholder"></div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default Shape
