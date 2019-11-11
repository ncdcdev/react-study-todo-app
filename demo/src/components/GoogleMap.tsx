import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './googleMap/Marker';
import SearchBox from './googleMap/SearchBox';
import { Button } from '@@/storyBook/src/atoms/Button';
import Typography from '@@/storyBook/src/atoms/Typography';
import { googleMapData } from '@@/sales/services/setting';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import moment from 'moment';
import { relative } from 'upath';
import {
  actions as messagesActions,
  selectors as messagesSelectors,
} from '@@/sales/redux/modules/messagesModule';
import { connect } from 'react-redux';
import Icon from '@@/storyBook/src/atoms/Icon';

/*FIXME
  Modalに移動
*/
const HeaderWrap = styled.div`
  margin: 30px 0;
  width: 100%;
`;
//-------------------

const TypographyLabel = styled(Typography)`
  && {
    position: absolute;
    z-index: 1;
    border-radius: 16px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.24);
    padding: 3px 13px;
    top: 15px;
    right: 15px;
  }
`;

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.changePlace = this.changePlace.bind(this);

    this.state = {
      mapApiLoaded: false,
      mapInstance: null,
      mapApi: null,
      marker: null,
      location: null,
      place: null,
      locationInfo: null,
    };
  }

  changePlace(place) {
    if (!(place && place.geometry && place.geometry.location)) {
      return;
    }

    console.log(place);

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    this.setState({
      location: {
        lat: lat,
        lng: lng,
      },
      locationInfo: place,
    });
  }

  postMap() {
    console.log(this.state);
    const { lng, lat } = this.state.location;
    const place_id = this.state.locationInfo ? this.state.locationInfo.place_id : null;
    if (!this.state.location || !(lng && lat)) {
      return;
    }
    console.log(this.props.channelId, {
      lat: lat,
      lng: lng,
      placeId: place_id,
    });
    this.props.doPostMessages(this.props.channelId, {
      map: {
        latitude: lat,
        longitude: lng,
        placeId: place_id,
      },
    });
    this.props.handlePlace(false);
  }

  locationSearch({ lat, lng }) {
    if (!this.state.mapApi) {
      return;
    }

    // https://developers.google.com/maps/documentation/javascript/geocoding

    const api = new this.state.mapApi.Geocoder();
    const location = { location: { lat: lat, lng: lng } };
    api.geocode(location, (results, status) => {
      if (status === 'OK') {
        if (results && results.length > 0) {
          //          console.log(results);
          console.log(results[0]);
          this.setState({
            locationInfo: results[0],
          });
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  render() {
    const { mapApiLoaded, mapInstance, mapApi, locationInfo } = this.state;
    return (
      <div style={{ margin: 10 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          {/*FIXME
            Modalに移動*/}
          <HeaderWrap className="l_flex">
            <Typography textType="h1" text="位置情報の送信" style={{ marginLeft: 'auto' }} />
            <Icon
              variant="close"
              deviceType="PC"
              style={{ marginLeft: 'auto' }}
              onClick={() => {
                this.props.handlePlace(false);
              }}
            />
          </HeaderWrap>
          {/*FIXME---------------
            Modalに移動*/}

          <div
            style={{
              height: '55vh',
              width: '100%',
              position: 'relative',
            }}
          >
            {mapApiLoaded && (
              <SearchBox map={mapInstance} mapApi={mapApi} changePlace={this.changePlace} />
            )}
            <TypographyLabel textType="h2" text="地図の上で場所を指定してください。" />
            <GoogleMapReact
              bootstrapURLKeys={{
                key: googleMapData.key,
                libraries: ['places', 'geometry'],
              }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => {
                this.setState({
                  mapApiLoaded: true,
                  mapInstance: map,
                  mapApi: maps,
                });
              }}
              onClick={async ({ lat, lng }) => {
                console.log('onclick');
                this.setState({
                  location: {
                    lat: lat,
                    lng: lng,
                  },
                });
              }}
            >
              {this.state.location && (
                <Marker
                  lat={this.state.location.lat}
                  lng={this.state.location.lng}
                  text="My Marker"
                  onClick={() => {
                    const { lat, lng } = this.state.location;
                    this.locationSearch({ lat, lng });
                  }}
                />
              )}
            </GoogleMapReact>
          </div>
        </div>

        <div>
          <div style={{ textAlign: 'center', margin: '16px 0 6px' }}>
            <Button
              text="送信する"
              onClick={() => this.postMap()}
              variant="contained"
              size="medium"
              color="primary"
              disabled={this.state.location ? false : true}
            />
          </div>
        </div>
      </div>
    );
  }
}

GoogleMap.defaultProps = {
  center: {
    lat: 35.6897,
    lng: 139.7004,
  },
  zoom: 17,
};

export default withRouter(
  connect(
    state => ({}),
    {
      doPostMessages: (id, params) => messagesActions.messagesPost(id, params),
    },
  )(GoogleMap),
);
