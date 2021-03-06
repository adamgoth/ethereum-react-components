import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import 'loaders.css'

export default class Pulse extends Component {
  static displayName = 'Pulse'

  static propTypes = {
    pstyle: PropTypes.any,
    multiple: PropTypes.bool,
    fill: PropTypes.bool,
    color: PropTypes.string
  }

  static defaultProps = {
    multiple: false,
    fill: false,
    color: '#CCC'
  }

  render() {
    const { pstyle, multiple, fill, color } = this.props

    let type = multiple === true ? 'multiple' : 'one'
    type += fill === true ? '-filled' : ''

    const config = {
      one: {
        class: 'ball-scale-ripple',
        divs: 1,
        style: {
          borderColor: color
        }
      },
      'one-filled': {
        class: 'ball-scale',
        divs: 1,
        style: {
          backgroundColor: color
        }
      },
      multiple: {
        class: 'ball-scale-ripple-multiple',
        divs: 3,
        style: {
          borderColor: color
        }
      },
      'multiple-filled': {
        class: 'ball-scale-multiple',
        divs: 3,
        style: {
          backgroundColor: color
        }
      }
    }

    type = config[type]

    return (
      <StyledWrapper
        style={{
          ...pstyle,
          width: '65px',
          height: '65px'
        }}>
        <div className={type.class}>
          {[...Array(type.divs)].map((_, idx) => (
            <div key={idx} style={type.style} />
          ))}
        </div>
      </StyledWrapper>
    )
  }
}

const StyledWrapper = styled.div`
  box-sizing: border-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 1 auto;
  flex: 0 1 auto;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  -ms-flex-preferred-size: 25%;
  flex-basis: 25%;
  max-width: 25%;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
`
