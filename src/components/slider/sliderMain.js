import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './sliderComponents' 

const sliderStyle = {
  position: 'relative',
  width: '100%'  
}

class SliderComponent extends Component {
  constructor(props){
    super(props)
    this.state={
      values: props.defaultValues.slice(),
      update: props.defaultValues.slice(),
      domain: props.domain,
      defaultValues: props.defaultValues
    }
  }

  onUpdate = update => {
    this.setState({ update })
  }

  onChange = values => {
    this.setState({ values })
    this.props.updateAmount(this.state.values)
  }

  render() {
    const {
      state: { values, update },
    } = this

    return (
      <div style={{ height: 50, width: '100%', paddingTop:20}}>
        <Slider
          mode={1}
          step={1}
          domain={this.state.domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={this.state.domain}
                    isActive={handle.id === activeHandleID}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default SliderComponent
