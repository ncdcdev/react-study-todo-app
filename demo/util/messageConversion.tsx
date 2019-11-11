import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import uuidv4 from 'uuid/v4';
import cheerio from 'cheerio';
import axios from 'axios';
import Typography from '@@/storyBook/src/atoms/Typography';
import { googleMapData, poolData } from '@@/sales/services/setting';
import FileMessage from '@@/sales/src/components/FileMessage';
import Modal from '@@/sales/src/components/Modal';
import { ScheduleConsent } from '@@/storyBook/src/molecules/Schedule';
import NoteMessage from '@@/customer/src/components/message/NoteMessage';
/*NoteMessageをsalesとstorybookに遷移*/
import { withRouter } from 'react-router';
import Storage from '@@/api/common/storage';
import mf_theme from '@@/storyBook/src/mf_theme';
import * as ShameUtil from '@@/storyBook/src/Util/Shame';

const storage = new Storage(
  poolData.awsIdentityPoolId,
  poolData.awsProjectRegion,
  poolData.awsS3Bucket,
);

const QuoteBlock = styled.div`
  padding-left: 20px;
  border-left: 1px solid #979797;
`;

export const generateFileName = ({ target, accept = [] }) => {
  // もとのファイル名抽出
  const nameArr = target.value.split(/\\|\\/);
  const name = nameArr[nameArr.length - 1];

  // ファイルオブジェクト
  const body = target.files[0];

  // MIME type
  const contentType = target.files[0].type;

  // 拡張子
  const extension = name.split('.')[name.split('.').length - 1];
  // 指定した送信可能ファイル以外は選択できない（Error）
  if (!accept.includes(extension)) {
    return {
      error: {
        message: 'このファイル形式は選択できません。',
      },
    };
  }

  // ファイル名が重複することを避けるためにS3に上げるファイル名は新規UUIDを使用
  const uuid = uuidv4();
  const key = `${uuid}.${extension}`;

  return {
    name,
    key,
    body,
    contentType,
  };
};

// responseのHTMLをパースし、必要な情報を抽出
export const extractMetaProps = (html, url) => {
  console.log('html', html);
  const $ = cheerio.load(html);

  const title = $('head title').text();
  const description = $("head meta[name='description']").attr('content') || '';
  const image =
    $("head meta[property='og:image']").attr('content') ||
    $("head link[rel='apple-touch-icon']").attr('href') ||
    $("head link[rel='apple-touch-icon-precomposed']").attr('href') ||
    '';

  return {
    title,
    description,
    image,
    url,
  };
};

// サイトメタ情報取得Func
export const getSites = async urls => {
  let sitedata = [];

  for (let url of urls) {
    const result = await axios
      .get(`/ogp?url=${url}`)
      .then(res => extractMetaProps(res.data, url))
      .catch(error => {
        console.log(error);
        return { error };
      });

    sitedata.push(result);
  }

  return sitedata;
};

const getPlaceData = async placeId => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.places.PlacesService(document.getElementById('map'));
    service.getDetails({ placeId: placeId }, (place, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        resolve(place);
      } else {
        reject(status);
      }
    });
  });
};

export const getMapData = async url => {
  return axios
    .get(url)
    .then(res => {
      console.log(4444444);
      console.log(res);
      return res;
    })
    .catch(error => {
      console.log(url);
      console.log(error);
      return { error };
    });
};

const URLBox = styled.div`
  && {
    margin-top: 10px;

    a {
      display: block;
      text-decoration: none;
    }
  }
`;

const SiteInfo = styled.div`
  && {
    margin-top: 10px;
    border-left: 1px solid #555;
    padding-left: 10px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: 'flex-start';
    align-items: stretch;
    max-width: 250px;

    .text {
      flex: 1;
      padding-right: 10px;

      .title {
        overflow: hidden;
        width: 100%;
        font-size: 15px;
        color: #000;
        line-height: 1.4;

        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }
      .description {
        margin-top: 5px;
        font-size: 13px;
        color: #555;
        line-height: 1.2;
        overflow: hidden;
        width: 100%;

        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
    }
    .image {
      flex: 0 0 70px;

      img {
        width: 100%;
      }
    }
  }
`;

const TypographyBaloon = styled(Typography)`
  && {
    a.linkText {
      color: ${mf_theme.color.primary_2};
      text-decoration: underline;
      word-break: break-word;
      &:visited {
        color: ${mf_theme.color.primary_2};
      }
    }
  }
`;

export const messageConversion = val => {
  const [modalData, setModalData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { body, map, file, schedules, note } = val;
  if (body) {
    const [sites, setSites] = useState([]);
    const [html, setHtml] = useState('');

    useEffect(() => {
      const urlReg = new RegExp("(https?://[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+)", 'g');
      const urls = body.match(urlReg) || [];

      // HTMLをセット
      const __html = body.replace(
        urlReg,
        urlStr => `<a class="linkText" href="${urlStr}" target="_blank">${urlStr}</a>`,
      );
      setHtml(__html);

      if (!urls.length) {
        // URLが1つもない場合は何もしない
        return;
      }

      // URLリストがあればサイト情報を取得
      getSites(urls).then(res => {
        setSites(res);
      });
    }, []);

    return (
      <div>
        <TypographyBaloon textType="TextSmall" dangerouslySetInnerHTML={{ __html: html }} />

        {sites.length > 0 &&
          sites.map((site, index) => {
            return (
              <URLBox key={`${site.url}_${index}`}>
                <a href={site.url} target="_blank">
                  <SiteInfo>
                    {site.error ? (
                      <div className="text">
                        <div className="description">
                          <p>サイト情報を取得できません。</p>
                        </div>
                      </div>
                    ) : (
                      <Fragment>
                        <div className="text">
                          <div className="title">
                            <p>{site.title}</p>
                          </div>
                          <div className="description">
                            <p>{site.description}</p>
                          </div>
                        </div>
                        <div className="image">
                          <img src={site.image} alt="" />
                        </div>
                      </Fragment>
                    )}
                  </SiteInfo>
                </a>
              </URLBox>
            );
          })}
      </div>
    );
  } else if (schedules) {
    console.log('schedules', schedules);
    return (
      <div>
        <TypographyBaloon textType="TextSmall" text={<ScheduleConsent list={schedules} />} />
      </div>
    );
  } else if (map) {
    const [placeData, setPlaceData] = useState(false);
    const [geoData, setGeoData] = useState(false);
    const googleMapURL = 'https://www.google.com/maps/search/?api=1&query=';
    const googleMapStaticURL = 'http://maps.google.co.jp/maps/api/staticmap';
    const addressUrl = `https://maps.google.com/maps/api/geocode/json?latlng=${map.latitude},${
      map.longitude
    }&key=${googleMapData.key}`;
    const urlData = `${googleMapURL}${map.latitude},${map.longitude}`;

    useEffect(() => {
      getMapData(addressUrl).then(res => {
        setGeoData(res);
      });
    }, []);

    console.log('map', map);
    console.log('geoData', geoData);
    return (
      <div>
        <a href={urlData} target="_blank">
          {geoData.place_name && (
            <Typography
              textType="TextSmall"
              text={ShameUtil.getformattedAddress(geoData.data.results[0].formatted_address)}
              style={{
                marginBottom: '20px',
              }}
            />
          )}

          <QuoteBlock>
            <img
              src={`${googleMapStaticURL}?markers=${map.latitude},${
                map.longitude
              }&maptype=roadmapsize=100x70&zoom=14&size=100x70&sensor=false&key=${
                googleMapData.key
              }`}
              alt=""
            />
          </QuoteBlock>
        </a>
      </div>
    );
  } else if (note) {
    alert('note');
    return (
      <NoteMessage
        {...commonProps}
        note={note}
        onBaloonClick={() => {
          setModalData({
            note: ShameUtil.setBreak(note),
          });
          setShowModal(true);
        }}
      />
    );
  } else if (file) {
    return (
      <div>
        <FileMessage
          fileName={file.name}
          onBaloonClick={async () => {
            const { url, error } = await storage.get(file.url);
            if (error) return;
            setModalData({
              title: file.name,
              src: url,
              alt: '',
            });
            setShowModal(true);
          }}
        />
        {modalData && (
          <Modal
            open={showModal}
            handleClose={() => setShowModal(false)}
            maxWidth="xl"
            fullWidth={true}
          >
            <p>{modalData.title}</p>
            <img src={modalData.src} alt="" />
          </Modal>
        )}
      </div>
    );
  } else {
    return null;
  }
  /*?
  val.map
  return 'url'
//http://maps.google.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&sensor=false&key=AIzaSyAALfT2RJA4h7pefGi5-r7WwZqQnZjnEzQ

  //http://maps.google.co.jp/maps/api/staticmap?markers=%E6%9D%B1%E4%BA%AC%E9%A7%85&maptype=roadmapsize=400x300&zoom=14&size=400x300&sensor=false&key=AIzaSyAALfT2RJA4h7pefGi5-r7WwZqQnZjnEzQ
  ?
  val.url
  return 'url'*/
};
export default withRouter(messageConversion);
