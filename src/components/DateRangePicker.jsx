import React, { useEffect, useMemo, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosCalendar, IoIosClose } from 'react-icons/io'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const formatDate = (date) => {
  if (!date) return ''
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function DateRangePicker({ ranges, setRanges }) {
  const containerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [view, setView] = useState('presets')
  const [selection, setSelection] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ])

  const buttonLabel = useMemo(() => {
    if (ranges.length > 0) {
      const latestRange = ranges[0]
      return `${formatDate(latestRange.startDate)} - ${formatDate(latestRange.endDate)}`
    }
    return 'Today'
  }, [ranges])

  const handleSelect = (item) => {
    setSelection([item.selection])
  }

  const applyRange = (startDate, endDate) => {
    setSelection([{ startDate, endDate, key: 'selection' }])
    setRanges((prev) => [
      {
        startDate,
        endDate,
        key: `${Date.now()}`,
      },
      ...prev,
    ])
    setOpen(false)
  }

  const handlePreset = (type) => {
    const today = new Date()

    if (type === 'today') {
      applyRange(new Date(today), new Date(today))
      return
    }

    if (type === 'yesterday') {
      const yesterday = new Date(today)
      yesterday.setDate(today.getDate() - 1)
      applyRange(new Date(yesterday), new Date(yesterday))
      return
    }

    if (type === 'last-month') {
      const start = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const end = new Date(today.getFullYear(), today.getMonth(), 0)
      applyRange(start, end)
      return
    }

    if (type === 'last-year') {
      const start = new Date(today.getFullYear() - 1, 0, 1)
      const end = new Date(today.getFullYear() - 1, 11, 31)
      applyRange(start, end)
    }
  }

  const handleAddRange = () => {
    const { startDate, endDate } = selection[0]
    if (!startDate || !endDate) return

    setRanges((prev) => [
      {
        startDate,
        endDate,
        key: `${Date.now()}`,
      },
      ...prev,
    ])
    setOpen(false)
  }

  const handleClearSelection = (event) => {
    event.stopPropagation()
    setRanges([])
    setSelection([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ])
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="date-frame" ref={containerRef}>
      <button
        className="date-btn fs-14-12"
        onClick={() =>
          setOpen((prev) => {
            const next = !prev
            if (next) setView('presets')
            return next
          })
        }
      >
        <span className="date-label">
          <IoIosCalendar />
          <span>{buttonLabel}</span>
        </span>
        {ranges.length > 0 ? (
          <span
            className="clear-range-icon"
            onClick={handleClearSelection}
            aria-label="Clear selected range"
          >
            <IoIosClose />
          </span>
        ) : (
          <IoIosArrowDown />
        )}
      </button>

      {open && (
        <div className="date-picker-panel">
          {view === 'presets' ? (
            <div className="preset-list">
              <button type="button" className="preset-btn" onClick={() => handlePreset('today')}>Today</button>
              <button type="button" className="preset-btn" onClick={() => handlePreset('yesterday')}>Yesterday</button>
              <button type="button" className="preset-btn" onClick={() => handlePreset('last-month')}>Last Month</button>
              <button type="button" className="preset-btn" onClick={() => handlePreset('last-year')}>Last Year</button>
              <button type="button" className="preset-btn custom-btn" onClick={() => setView('custom')}>
                Custom Date Range
              </button>
            </div>
          ) : (
            <>
              <DateRange
                ranges={selection}
                onChange={handleSelect}
                moveRangeOnFirstSelection={false}
                maxDate={new Date()}
              />
              <div className="date-picker-actions">
                <button type="button" className="back-btn" onClick={() => setView('presets')}>
                  Back
                </button>
                <button type="button" className="add-range-btn" onClick={handleAddRange}>
                  Add Date Range
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
