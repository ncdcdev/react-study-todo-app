import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '@@/storyBook/src/atoms/Icon';

const Wrapper = styled.div`
  position: absolute;
  top: 15px;
  z-index: 1;
  left: 15px;
  top: 15px;
`;

const InputWrap = styled.div`
  position: relative;
`;

const IconSearch = styled(Icon)`
  && {
    position: absolute;
    z-index: 2;
    top: 10px;
    left: 14px;
  }
`;

const InputStyled = styled.input`
  padding: 10px;
  box-sizing: border-box;
  font-size: 18px;
  border-radius: 4px;
  border: 1px solid #e5ddcb;
  background-color: #fff;
  border: 1px solid #e5ddcb;
  width: 290px;
  height: 44px;
  line-height: 44px;
  transition: 0.3s;
  position: absolute;
  z-index: 1;
  padding-left: 43px;
`;

class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.clearSearchBox = this.clearSearchBox.bind(this);
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
  }

  componentDidMount({ map, mapApi } = this.props) {
    if (!mapApi) {
      return;
    }
    // https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
    this.searchBox = new mapApi.places.SearchBox(this.searchInput);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
    this.searchBox.bindTo('bounds', map);
  }

  componentWillUnmount({ mapApi } = this.props) {
    if (!mapApi) {
      return;
    }
    mapApi.event.clearInstanceListeners(this.searchInput);
  }

  onPlacesChanged({ map, changePlace } = this.props) {
    if (!this.searchBox) {
      return;
    }

    const selected = this.searchBox.getPlaces();
    console.log(selected);
    const { 0: place } = selected;
    if (!place.geometry) return;

    // TODO: viewportとlocationの違いの調査を行う
    // locationは単なる位置情報、viewportはzoomなどにも対応している情報

    // viewportの例
    // ga: xd {j: 139.70127301970854, l: 139.7039709802915}
    // na: Bd {j: 35.6878832197085, l: 35.6905811802915}

    if (place.geometry.viewport) {
      console.log('viewport');
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // ChIJk0dXldqMGGARlx-lk0SmRus
    console.log(map);

    changePlace(place);
    this.searchInput.blur();
  }

  clearSearchBox() {
    this.searchInput.value = '';
  }

  render() {
    return (
      <Wrapper>
        <InputWrap>
          <IconSearch variant="search" deviceType="PC" />
          <InputStyled
            ref={ref => {
              this.searchInput = ref;
            }}
            onFocus={this.clearSearchBox}
            placeholder="住所、建物名など"
            type="text"
          />
        </InputWrap>
      </Wrapper>
    );
  }
}

export default SearchBox;
