import React, { Component } from 'react';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
 
class LocationSelector extends Component {
  state = {
    country: '', 
    region: '',
    
  }
  handleRegionChange = (val, event) => {
      console.log('value: ',val, 'event: ', event)
  }
  selectCountry (val) {
    this.setState({ country: val });
  }
 
  selectRegion (val) {
    this.setState({ region: val });
  }
  render() {
    const { country, region } = this.props

    return(
      <div>
        <CountryDropdown
          value={country}
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown
          country={country}
          value={region}
          onChange={(val) => this.selectRegion(val)} />
      </div>
    )
  }
}

export default LocationSelector