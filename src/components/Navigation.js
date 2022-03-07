import React, { useState } from 'react'
import './Navigation.css'

// export default class Navigation extends Component {
const Navigation = ({ locations }) => {
  const isFirst = index => index === 0
  // Used for rendering
  const isLast = index => {
    return index === locations.length - 1
  }
  // Used for rendering
  const getClasses = (ctx, index) => {
    let classes = `material-icons ${ctx}`
    if (ctx === 'dots') {
      if (isLast(index)) {
        classes += ' hidden'
      }
    } else {
      classes += isLast(index) ? ' small' : ' x-small'
      if (index === 0) {
        classes += ' first'
      }
    }
    return classes
  }

  const [locationState, setLocationState] = useState([...locations])
  // For screen readers, would like focus to follow the item pressed
  const [selectedIndex, setSelectedIndex] = useState(0)

  const moveUp = index => {
    if (isFirst(index)) {
      setSelectedIndex(index)
      return locationState
    }
    const locToSwap = locationState[index - 1]
    const locClicked = locationState[index]
    setSelectedIndex(index - 1)
    return setLocationState([
      ...locationState.slice(0, index - 1),
      locClicked,
      locToSwap,
      ...locationState.slice(index + 1)
    ])
  }

  const moveDown = index => {
    if (isLast(index)) {
      setSelectedIndex(index)
      return locationState
    }
    const locToSwap = locationState[index + 1]
    const locClicked = locationState[index]
    setSelectedIndex(index + 1)
    return setLocationState([
      ...locationState.slice(0, index),
      locToSwap,
      locClicked,
      ...locationState.slice(index + 2)
    ])
  }

  return (
    <section className='layout-row align-items-center justify-content-center navigation-screen'>
      <div className='card layout-row flat map-card'>
        <section className='card pb-16 pr-16 flex-auto layout-column justify-content-center'>
          <ul className='pl-0' data-testid='location-list'>
            {locationState.map((location, index) => (
              <li
                key={'row' + index}
                data-testid={'location-' + index}
                className={`layout-row justify-content-between align-items-center mr-8 pl-40 relative`}>
                <div className='layout-column justify-content-start align-items-center handle'>
                  <i className={getClasses('marker', index)}>
                    {isLast(index) ? 'room' : 'radio_button_checked'}
                  </i>
                  <i className={getClasses('dots', index)}>more_vert</i>
                </div>
                <div
                  className={`location-name${
                    index === selectedIndex ? ' clicked' : ''
                  }`}>
                  <p
                    className='caption text-start mb-4'
                    data-testid='location'
                    aria-label={`Navigation item number ${index}, ${location}`}>
                    {location}
                  </p>
                </div>
                <div>
                  {!isFirst(index) && (
                    <button
                      className='icon-only small mx-0'
                      hidden={isFirst(index)}
                      data-testid='up-button'
                      aria-label={`Move navigation item ${location} up`}
                      aria-current={index === selectedIndex}
                      onClick={() => moveUp(index)}>
                      <i className='material-icons'>arrow_upward</i>
                    </button>
                  )}
                  {!isLast(index) && (
                    <button
                      className='icon-only small mx-0'
                      hidden={isLast(index)}
                      data-testid='down-button'
                      aria-label={`Move navigation item ${location} down`}
                      aria-current={index === selectedIndex}
                      onClick={() => moveDown(index)}>
                      <i className='material-icons'>arrow_downward</i>
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
        <section className='flex-auto'>
          <img src='images/map.svg' className='fill' alt='map' />
        </section>
      </div>
    </section>
  )
}

export default Navigation
